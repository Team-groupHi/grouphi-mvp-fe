/* eslint-disable no-case-declarations */
'use client';

import * as StompJS from '@stomp/stompjs';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useCallback, useRef, useState } from 'react';

import { DEFAULT_ERROR_MESSAGE, ERROR_MESSAGE } from '@/constants/error';
import { QUERYKEY } from '@/constants/querykey';
import { ROOM_STATUS } from '@/constants/room';
import { PATH } from '@/constants/router';
import { SOCKET } from '@/constants/websocket';
import useBalanceGameStore from '@/store/useBalanceGameStore';
import useQnaGameStore from '@/store/useQnaGameStore';
import useRoomStore from '@/store/useRoomStore';
import { ChatMessage } from '@/types';
import { ErrorCode } from '@/types/error';

import { useToast } from './useToast';

export interface EnterRoomProps {
  roomId: string;
  name: string;
}

export function useWebSocket() {
  const BASE_WEBSOCKET_URL = process.env.NEXT_PUBLIC_BASE_WEBSOCKET_URL;
  const client = useRef<StompJS.Client | null>(null);
  const [subscriptions, setSubscription] = useState<
    StompJS.StompSubscription[] | null
  >(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const { setRound: setBalanceRound, addSelectedPlayers } =
    useBalanceGameStore();
  const {
    setRound: setQnaRound,
    addSubmittedPlayer,
    clearSubmittedPlayers,
  } = useQnaGameStore();
  const { setRoomStatus, getHostName } = useRoomStore();

  const router = useRouter();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const connect = ({ roomId, name }: EnterRoomProps) => {
    if (client.current) return;

    if (!BASE_WEBSOCKET_URL) {
      throw new Error('NEXT_PUBLIC_BASE_WEBSOCKET_URL is not defined.');
    }
    client.current = new StompJS.Client({
      brokerURL: BASE_WEBSOCKET_URL,
      reconnectDelay: 5000,
    });

    client.current.onConnect = (_frame) => {
      const subscribeRoomId = client.current?.subscribe(
        `${SOCKET.SUBSCRIBE}${SOCKET.ROOM.ROOMS}/${roomId}`,
        (message) => {
          receiveMessage(message.body);
        },
        { id: `sub-room-${roomId}` }
      );

      const subscribeErrorId = client.current?.subscribe(
        `${SOCKET.USER.QUEUE_ERRORS}`,
        (message) => {
          receiveMessage(message.body);
        },
        { id: `sub-error-${roomId}` }
      );

      if (subscribeRoomId && subscribeErrorId) {
        setSubscription([subscribeRoomId, subscribeErrorId]);

        sendMessage({
          destination: `${SOCKET.ROOM.ENTER}`,
          body: {
            roomId,
            name,
          },
        });
      }
    };

    client.current.onWebSocketClose = (e: CloseEvent) => {
      if (!e.wasClean) {
        toast({
          title: '웹소켓 연결 실패',
          description: '서버에 연결할 수 없어요. 새로고침 해주세요.',
          variant: 'destructive',
        });
      }
    };

    client.current.activate();
  };

  const disconnect = () => {
    if (!client.current) return;

    subscriptions?.forEach((subscription) => subscription.unsubscribe());
    client.current.deactivate();

    setSubscription(null);
    setChatMessages([]);
    client.current = null;
  };

  const sendMessage = useCallback(
    <T>(params: Omit<StompJS.IPublishParams, 'body'> & { body?: T }) => {
      if (!client.current || !client.current.connected) {
        return;
      }

      const { destination, body } = params;
      const text = JSON.stringify(body);

      client.current?.publish({
        ...params,
        destination: `${SOCKET.PUBLICATION}${destination}`,
        body: text,
      });
    },
    []
  );

  const receiveMessage = (message: string) => {
    const { type, sender, content } = JSON.parse(message);

    switch (type) {
      case SOCKET.TYPE.ROOM.CHAT:
        addChatMessage({
          sender,
          content,
        });
        break;
      case SOCKET.TYPE.ROOM.ENTER:
        addChatMessage({
          sender: SOCKET.SYSTEM,
          content: `${sender}님이 입장했어요.`,
        });
        queryClient.invalidateQueries({
          queryKey: [QUERYKEY.ROOM_DETAIL],
        });
        break;
      case SOCKET.TYPE.ROOM.EXIT:
        if (sender === getHostName()) {
          toast({
            title: '방 삭제',
            description:
              '방장이 퇴장하여 방이 삭제되었어요. 새로운 방을 이용해주세요.',
            variant: 'destructive',
          });
          router.replace(PATH.HOME);
          break;
        }
        addChatMessage({
          sender: SOCKET.SYSTEM,
          content: `${sender}님이 퇴장했어요.`,
        });
        queryClient.invalidateQueries({
          queryKey: [QUERYKEY.ROOM_DETAIL],
        });
        break;
      case SOCKET.TYPE.ROOM.READY:
        queryClient.invalidateQueries({
          queryKey: [QUERYKEY.ROOM_DETAIL],
        });
        break;
      case SOCKET.TYPE.ROOM.UNREADY:
        queryClient.invalidateQueries({
          queryKey: [QUERYKEY.ROOM_DETAIL],
        });
        break;
      case SOCKET.TYPE.ROOM.CHANGE_PLAYER_NAME:
        addChatMessage({
          sender: SOCKET.SYSTEM,
          content: `${sender}님이 ${content}님으로 닉네임을 변경했어요.`,
        });
        queryClient.invalidateQueries({
          queryKey: [QUERYKEY.ROOM_DETAIL],
        });
        break;
      case SOCKET.TYPE.ROOM.CHANGE_GAME:
        addChatMessage({
          sender: SOCKET.SYSTEM,
          content: `[${content.nameKr}] 으로 게임이 변경되었어요.`,
        });
        queryClient.invalidateQueries({
          queryKey: [QUERYKEY.ROOM_DETAIL],
        });
        break;
      case SOCKET.TYPE.BALANCE_GAME.SELECT:
        addSelectedPlayers(sender);
        break;
      case SOCKET.TYPE.BALANCE_GAME.START:
        setRoomStatus(ROOM_STATUS.PROGRESS);
        setBalanceRound(content);
        break;
      case SOCKET.TYPE.BALANCE_GAME.NEXT:
        setRoomStatus(ROOM_STATUS.PROGRESS);
        setBalanceRound(content);
        queryClient.removeQueries({
          queryKey: [QUERYKEY.BALANCE_GAME_RESULTS],
        });
        break;
      case SOCKET.TYPE.BALANCE_GAME.ALL_RESULTS:
        setRoomStatus(ROOM_STATUS.FINAL_RESULT);
        queryClient.removeQueries({
          queryKey: [QUERYKEY.BALANCE_GAME_RESULTS],
        });
        break;
      case SOCKET.TYPE.BALANCE_GAME.END:
        setChatMessages(() => [
          {
            sender: SOCKET.SYSTEM,
            content: 'Balance Game이 종료되었어요.',
          },
        ]);
        setRoomStatus(ROOM_STATUS.IDLE);
        queryClient.invalidateQueries({
          queryKey: [QUERYKEY.ROOM_DETAIL],
        });
        break;
      case SOCKET.TYPE.QNA_GAME.START:
        setRoomStatus(ROOM_STATUS.PROGRESS);
        setQnaRound(content);
        clearSubmittedPlayers();
        break;
      case SOCKET.TYPE.QNA_GAME.SUBMIT:
        addSubmittedPlayer(sender);
        break;
      case SOCKET.TYPE.QNA_GAME.NEXT:
        setRoomStatus(ROOM_STATUS.PROGRESS);
        setQnaRound(content);
        clearSubmittedPlayers();
        queryClient.removeQueries({
          queryKey: [QUERYKEY.QNA_GAME_RESULTS],
        });
        break;
      case SOCKET.TYPE.QNA_GAME.ALL_RESULTS:
        setRoomStatus(ROOM_STATUS.FINAL_RESULT);
        queryClient.removeQueries({
          queryKey: [QUERYKEY.QNA_GAME_RESULTS],
        });
        break;
      case SOCKET.TYPE.QNA_GAME.END:
        setChatMessages(() => [
          {
            sender: SOCKET.SYSTEM,
            content: 'QnA Game이 종료되었어요.',
          },
        ]);
        setRoomStatus(ROOM_STATUS.IDLE);
        queryClient.invalidateQueries({
          queryKey: [QUERYKEY.ROOM_DETAIL],
        });
        break;
      case SOCKET.TYPE.ROOM.ERROR:
        const { code }: { code: ErrorCode } = content;
        const message = ERROR_MESSAGE[code] || DEFAULT_ERROR_MESSAGE;

        toast({
          variant: 'destructive',
          title: message,
        });
        break;
      default:
        break;
    }
  };

  const addChatMessage = (newMessage: ChatMessage) => {
    setChatMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  return { chatMessages, connect, disconnect, sendMessage };
}
