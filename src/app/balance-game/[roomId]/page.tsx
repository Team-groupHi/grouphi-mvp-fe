/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { Spinner } from '@/components';
import ErrorFallback from '@/components/ErrorBoundary/ErrorFallback';
import ErrorHandlingWrapper from '@/components/ErrorBoundary/ErrorHandlingWrapper';

const WaitingRoom = () => {
  return (
    <ErrorHandlingWrapper
      fallbackComponent={ErrorFallback}
      suspenseFallback={<Spinner />}
    >
      <WaitingRoom />
    </ErrorHandlingWrapper>
  );
};

export default WaitingRoom;
