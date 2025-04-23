/* eslint-disable no-case-declarations */
'use client';

import * as StompJS from '@stomp/stompjs';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';

import { QUERYKEY } from '@/constants/querykey';
import { PATH } from '@/constants/router';
import { SOCKET } from '@/constants/websocket';
import useBalanceGameStore from '@/store/useBalanceGameStore';
import { ChatMessage } from '@/types';

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
  const { setRoomStatus, setRound, addSelectedPlayers } = useBalanceGameStore();

  const queryClient = useQueryClient();
  const { toast } = useToast();
  const router = useRouter();

  const connect = ({ roomId, name }: EnterRoomProps) => {
    if (client.current) return;

    if (!BASE_WEBSOCKET_URL) {
      throw new Error('NEXT_PUBLIC_BASE_WEBSOCKET_URL is not defined.');
    }
    client.current = new StompJS.Client({
      brokerURL: BASE_WEBSOCKET_URL,
      reconnectDelay: 5000,
      onWebSocketError: (error) => {
        console.error('[WebSocket] Network Error', error);
      },
      onStompError: (frame) => {
        console.error('[WebSocket] STOMP.js Error: ', frame.headers['message']);
        console.error('[WebSocket] Details: ', frame.body);
      },
    });

    client.current.onConnect = (frame) => {
      console.log('[WebSocket] 1. Connected', frame);

      const subscribeRoomId = client.current?.subscribe(
        `${SOCKET.SUBSCRIBE}${SOCKET.ROOM.ROOMS}/${roomId}`,
        (message) => {
          console.log(
            '[WebSocket] 2. Subscribe1 - Receive Message',
            message.body
          );
          receiveMessage(message.body);
        },
        { id: `sub-room-${roomId}` }
      );

      const subscribeErrorId = client.current?.subscribe(
        `${SOCKET.USER.QUEUE_ERRORS}`,
        (message) => {
          console.log(
            '[WebSocket] 2. Subscribe2 - Receive Message',
            message.body
          );
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
      console.log(e);
    };

    client.current.activate();
  };

  const disconnect = () => {
    if (!client.current) return;
    sendMessage({
      destination: `${SOCKET.ROOM.EXIT}`,
    });

    subscriptions?.forEach((subscription) => subscription.unsubscribe());
    client.current.deactivate();

    setSubscription(null);
    setChatMessages([]);
    client.current = null;
    console.log('[WebSocket] Disconnected');
  };

  const sendMessage = <T>(
    params: Omit<StompJS.IPublishParams, 'body'> & { body?: T }
  ) => {
    const { destination, body } = params;
    const text = JSON.stringify(body);

    client.current?.publish({
      ...params,
      destination: `${SOCKET.PUBLICATION}${destination}`,
      body: text,
    });
  };

  const receiveMessage = (message: string) => {
    console.log('[WebSocket] 2-1. receiveMessage', message);
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
        addChatMessage({
          sender: SOCKET.SYSTEM,
          content: `${sender}님이 퇴장했어요.`,
        });
        queryClient.invalidateQueries({
          queryKey: [QUERYKEY.ROOM_DETAIL],
        });
        break;
      //@TODO: players 데이터 내부 store로 관리하도록 변경하면서 refetch 로직 제거하기
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
      case SOCKET.TYPE.BALANCE_GAME.SELECT:
        addSelectedPlayers(sender);
        break;
      case SOCKET.TYPE.BALANCE_GAME.START:
        setRoomStatus('progress');
        setRound(content);
        break;
      case SOCKET.TYPE.BALANCE_GAME.NEXT:
        setRoomStatus('progress');
        setRound(content);
        queryClient.removeQueries({
          queryKey: [QUERYKEY.BALANCE_GAME_RESULTS],
        });
        break;
      case SOCKET.TYPE.BALANCE_GAME.ALL_RESULTS:
        setRoomStatus('finalResult');
        queryClient.removeQueries({
          queryKey: [QUERYKEY.BALANCE_GAME_RESULTS],
        });
        break;
      case SOCKET.TYPE.BALANCE_GAME.END:
        setChatMessages(() => [
          {
            sender: SOCKET.SYSTEM,
            content: '게임이 종료되었습니다.',
          },
        ]);
        setRoomStatus('idle');
        queryClient.invalidateQueries({
          queryKey: [QUERYKEY.ROOM_DETAIL],
        });
        break;
      case SOCKET.TYPE.ROOM.ERROR:
        toast({
          variant: 'destructive',
          title: '문제가 생겼습니다. 다시 시도해주세요.',
        });
        router.push(PATH.HOME);
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
