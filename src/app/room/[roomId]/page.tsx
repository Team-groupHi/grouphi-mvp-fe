/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

import { ErrorFallback, ErrorHandlingWrapper, Spinner } from '@/components';
import { QUERYKEY } from '@/constants/querykey';
import { useWebSocket } from '@/hooks/useWebSocket';

import GameRoomFetcher from './_component/GameRoomFetcher';

const RoomPage = () => {
  const webSocket = useWebSocket();
  const queryClient = useQueryClient();

  useEffect(() => {
    return () => {
      queryClient.removeQueries({
        queryKey: [QUERYKEY.ROOM_DETAIL],
      });
      webSocket.disconnect();
    };
  }, []);

  return (
    <ErrorHandlingWrapper
      fallbackComponent={ErrorFallback}
      suspenseFallback={<Spinner />}
    >
      <GameRoomFetcher {...webSocket} />
    </ErrorHandlingWrapper>
  );
};

export default RoomPage;
