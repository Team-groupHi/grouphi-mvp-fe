/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useQueryClient } from '@tanstack/react-query';
import { headers } from 'next/headers';
import { useEffect } from 'react';

import {
  ErrorFallback,
  ErrorHandlingWrapper,
  GameRoom,
  Spinner,
} from '@/components';
import { QUERYKEY } from '@/constants/querykey';
import { useWebSocket } from '@/hooks/useWebSocket';
import { isMobileDevice } from '@/utils/deviceDetector';

const RoomPage = () => {
  const headersList = headers();
  const userAgent = headersList.get('user-agent') || '';
  const isMobile = isMobileDevice(userAgent);

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
    <section className="w-screen h-screen">
      <ErrorHandlingWrapper
        fallbackComponent={ErrorFallback}
        suspenseFallback={<Spinner />}
      >
        <GameRoom
          {...webSocket}
          isMobile={isMobile}
        />
      </ErrorHandlingWrapper>
    </section>
  );
};

export default RoomPage;
