'use client';

import { AxiosError, isAxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

import { Button, Label } from '@/components';
import { DEFAULT_ERROR_MESSAGE, ERROR_MESSAGE } from '@/constants/error';
import { PATH } from '@/constants/router';
import { ErrorCode } from '@/types/error';

interface ErrorProps {
  error: Error | AxiosError | null;
  resetErrorBoundary: () => void;
}

const ErrorFallback = ({ error, resetErrorBoundary }: ErrorProps) => {
  const router = useRouter();
  const [count, setCount] = useState(3);

  const isAxiosApiError = isAxiosError(error);

  const errorCode =
    isAxiosApiError && error.response?.data?.code
      ? (error.response.data.code as ErrorCode)
      : null;

  const isRoomDeleteError = errorCode === 'R002';

  const message =
    (errorCode && ERROR_MESSAGE[errorCode]) || DEFAULT_ERROR_MESSAGE;

  const gotoHome = useCallback(() => {
    router.push(PATH.HOME);
    resetErrorBoundary();
  }, [resetErrorBoundary, router]);

  const hardReload = useCallback(() => {
    window.location.reload();
  }, []);

  useEffect(() => {
    if (!isRoomDeleteError) {
      setCount(3);
      return;
    }

    // eslint-disable-next-line prefer-const
    let currentCount = 3;
    setCount(currentCount);

    const intervalId = setInterval(() => {
      currentCount -= 1;
      setCount(currentCount);
      if (currentCount <= 0) {
        clearInterval(intervalId);
        gotoHome();
      }
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [isRoomDeleteError, gotoHome]);

  return (
    <section className="w-full h-full flex flex-col justify-center items-center gap-3">
      <Label>{message}</Label>
      {isRoomDeleteError ? (
        <p>{`${count}초 후 메인으로 이동해요.`}</p>
      ) : (
        <>
          {isAxiosApiError ? (
            <Button onClick={() => resetErrorBoundary()}>다시 불러오기</Button>
          ) : (
            <Button onClick={hardReload}>페이지 새로고침</Button>
          )}
          <Button onClick={gotoHome}>메인으로 이동</Button>
        </>
      )}
    </section>
  );
};

export default ErrorFallback;
