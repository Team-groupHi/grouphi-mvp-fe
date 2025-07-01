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

  const message =
    (isAxiosError(error) &&
      error.response &&
      ERROR_MESSAGE[error.response.data.code as ErrorCode]) ||
    DEFAULT_ERROR_MESSAGE;

  const gotoHome = useCallback(() => {
    router.push(PATH.HOME);
    resetErrorBoundary();
  }, [resetErrorBoundary, router]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount((prev) => prev - 1);
    }, 1000);

    return () => {
      clearTimeout(intervalId);
    };
  }, []);

  useEffect(() => {
    if (count === 0) {
      gotoHome();
    }
  }, [count, gotoHome]);

  return (
    <section className="w-screen h-screen flex flex-col justify-center items-center gap-3">
      <Label>{message}</Label>
      {message === ERROR_MESSAGE.R002 ? (
        <p>{`${count}초 후 메인으로 이동합니다`}</p>
      ) : (
        <>
          <Button onClick={gotoHome}>메인으로 이동</Button>
          <Button onClick={() => resetErrorBoundary()}>다시 불러오기</Button>
        </>
      )}
    </section>
  );
};

export default ErrorFallback;
