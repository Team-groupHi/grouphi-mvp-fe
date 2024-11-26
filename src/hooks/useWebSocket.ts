'use client';
import * as StompJS from '@stomp/stompjs';
import { useRef } from 'react';

interface WebSocketProps {
  roomId: string;
}

export function useWebSocket() {
  const BASE_WEBSOCKET_URL = process.env.NEXT_PUBLIC_BASE_WEBSOCKET_URL;
  const client = useRef<StompJS.Client>();

  const connect = () => {
    client.current = new StompJS.Client({
      brokerURL: BASE_WEBSOCKET_URL,
      // reconnectDelay: 3000, // 자동 재연결
      onConnect: () => {
        console.log(' [WebSocket] 1. Connected');
      },
      onWebSocketError: (error) => {
        // 웹소켓 네트워크 에러 처리
        console.log('[WebSocket] WebSocket Error', error);
      },
      onStompError: (frame) => {
        // STOMP 프로토콜 에러 처리
        console.error('[WebSocket] STOMP.js Error: ', frame.headers['message']);
        console.error('[WebSocket] Details: ', frame);
      },
    });

    client.current.activate();
  };

  const disconnect = () => {
    client.current?.deactivate();
    console.log('[WebSocket] Disconnected');
  };

  return { connect, disconnect };
}
