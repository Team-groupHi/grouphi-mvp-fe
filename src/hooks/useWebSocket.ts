'use client';
import { SOCKET } from '@/constants/websocket';
import * as StompJS from '@stomp/stompjs';
import { useRef, useState } from 'react';

export function useWebSocket() {
  const BASE_WEBSOCKET_URL = process.env.NEXT_PUBLIC_BASE_WEBSOCKET_URL;
  const client = useRef<StompJS.Client>();
  const [, setSubscription] = useState<StompJS.StompSubscription>();

  const connect = (roomId: string) => {
    client.current = new StompJS.Client({
      brokerURL: BASE_WEBSOCKET_URL,
      // debug: (message) => {
      //   console.error('[WebSocket Debug]: ', message);
      // },
      reconnectDelay: 0, // todo: 테스트 후 자동재연결 시간 삭제
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
          console.log('[WebSocket] 2. Subscribe');
          console.log('[WebSocket] 2-1. Reveived Message: ', message.body);
        }
      );

      setSubscription(subscribeId);

      // 메세지 발행
      sendMessage({
        destination: `${SOCKET.ENDPOINT.ROOM.ENTER}`,
        body: JSON.stringify({
          roomId,
          name: 'TEST',
        }),
      });
    };

    client.current.activate();
  };

  const disconnect = () => {
    client.current?.deactivate();
    console.log('[WebSocket] Disconnected');
  };

  const sendMessage = (params: StompJS.IPublishParams) => {
    const { destination } = params;

    client.current?.publish({
      ...params,
      destination: `${SOCKET.ENDPOINT.PUBLICATION}${destination}`,
    });
  };

  return { connect, disconnect };
}
