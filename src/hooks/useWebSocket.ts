/* eslint-disable no-case-declarations */
'use client';

import { QUERYKEY } from '@/constants/querykey';
import { SOCKET } from '@/constants/websocket';
import useBalanceGameStore from '@/store/useBalanceGameStore';
import { ChatMessage } from '@/types';
import * as StompJS from '@stomp/stompjs';
import { useQueryClient } from '@tanstack/react-query';
import { useRef, useState } from 'react';
import { useToast } from './useToast';
import { useRouter } from 'next/navigation';
import { PATH } from '@/constants/router';

interface EnterRoomProps {
  roomId: string;
  name: string;
}

export function useWebSocket() {
  const BASE_WEBSOCKET_URL = process.env.NEXT_PUBLIC_BASE_WEBSOCKET_URL;
  const client = useRef<StompJS.Client | null>(null);
  const [, setSubscription] = useState<StompJS.StompSubscription | null>(null);
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

      const subscribeId = client.current?.subscribe(
        `${SOCKET.ENDPOINT.SUBSCRIBE}${SOCKET.ENDPOINT.ROOM.ROOMS}/${roomId}`,
        (message) => {
          console.log(
            '[WebSocket] 2. Subscribe - Receive Message',
            message.body
          );
          receiveMessage(message.body);
        }
      );

      if (subscribeId) {
        setSubscription(subscribeId);

        sendMessage({
          destination: `${SOCKET.ENDPOINT.ROOM.ENTER}`,
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
      destination: `${SOCKET.ENDPOINT.ROOM.EXIT}`,
    });

    setSubscription(null);
    setChatMessages([]);

    client.current.deactivate();
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
      destination: `${SOCKET.ENDPOINT.PUBLICATION}${destination}`,
      body: text,
    });
  };

  const receiveMessage = (message: string) => {
    console.log('[WebSocket] 2-1. receiveMessage', message);
    const { type, sender, content } = JSON.parse(message);

    switch (type) {
      case SOCKET.TYPE.CHAT:
        addChatMessage({
          sender,
          content,
        });
        break;
      case SOCKET.TYPE.ENTER:
        addChatMessage({
          sender: SOCKET.SYSTEM,
          content: `${sender}님이 입장했어요.`,
        });
        queryClient.invalidateQueries({
          queryKey: [QUERYKEY.ROOM_DETAIL],
        });
        break;
      case SOCKET.TYPE.EXIT:
        addChatMessage({
          sender: SOCKET.SYSTEM,
          content: `${sender}님이 퇴장했어요.`,
        });
        queryClient.invalidateQueries({
          queryKey: [QUERYKEY.ROOM_DETAIL],
        });
        break;
      //@TODO: players 데이터 내부 store로 관리하도록 변경하면서 refetch 로직 제거하기
      case SOCKET.TYPE.READY:
        queryClient.invalidateQueries({
          queryKey: [QUERYKEY.ROOM_DETAIL],
        });
        break;
      case SOCKET.TYPE.UNREADY:
        queryClient.invalidateQueries({
          queryKey: [QUERYKEY.ROOM_DETAIL],
        });
        break;
      case SOCKET.TYPE.CHANGE_PLAYER_NAME:
        queryClient.invalidateQueries({
          queryKey: [QUERYKEY.ROOM_DETAIL],
        });
        break;
      case SOCKET.TYPE.BG_SELECT:
        addSelectedPlayers(sender);
        break;
      case SOCKET.TYPE.BG_START:
        setRoomStatus('progress');
        setRound(content);
        break;
      case SOCKET.TYPE.BG_NEXT:
        setRoomStatus('progress');
        setRound(content);
        break;
      case SOCKET.TYPE.BG_ALL_RESULTS:
        setRoomStatus('finalResult');
        break;
      case SOCKET.TYPE.BG_END:
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
      case SOCKET.TYPE.ERROR:
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
