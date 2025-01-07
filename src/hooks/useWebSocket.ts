'use client';
import { SOCKET } from '@/constants/websocket';
import { ChatMessage } from '@/types';
import * as StompJS from '@stomp/stompjs';
import { useRef, useState } from 'react';

export function useWebSocket() {
  const BASE_WEBSOCKET_URL = process.env.NEXT_PUBLIC_BASE_WEBSOCKET_URL;
  const client = useRef<StompJS.Client | null>(null);
  const [, setSubscription] = useState<StompJS.StompSubscription | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

  const connect = (roomId: string) => {
    if (!BASE_WEBSOCKET_URL) {
      throw new Error('NEXT_PUBLIC_BASE_WEBSOCKET_URL is not defined.');
    }
    client.current = new StompJS.Client({
      brokerURL: BASE_WEBSOCKET_URL,
      reconnectDelay: 5000,
      onWebSocketError: (error) => {
        console.log('[WebSocket] Network Error', error);
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
            name: 'TEST',
          },
        });
      }
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
    console.log(`[WebSocket] 2-1. receiveMessage`, message);
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
        break;
      case SOCKET.TYPE.EXIT:
        addChatMessage({
          sender: SOCKET.SYSTEM,
          content: `${sender}님이 퇴장했어요.`,
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
