/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

import { Spinner } from '@/components';
import ErrorFallback from '@/components/ErrorBoundary/ErrorFallback';
import ErrorHandlingWrapper from '@/components/ErrorBoundary/ErrorHandlingWrapper';
import { QUERYKEY } from '@/constants/querykey';
import { useWebSocket } from '@/hooks/useWebSocket';

import WaitingRoom from './_component/WaitingRoom';

const BalanceGame = () => {
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
      <WaitingRoom {...webSocket} />
    </ErrorHandlingWrapper>
  );
};

export default BalanceGame;
