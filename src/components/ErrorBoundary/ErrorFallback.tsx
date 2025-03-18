'use client';

import { AxiosError, isAxiosError } from 'axios';
import { useRouter } from 'next/navigation';

import { PATH } from '@/constants/router';
import { ERROR_MESSAGE, ErrorCode } from '@/types';

import { Button } from '../Button';
import Label from '../Label';

interface ErrorProps {
  error: Error | AxiosError | null;
  resetErrorBoundary: () => void;
}

const ErrorFallback = ({ error, resetErrorBoundary }: ErrorProps) => {
  const router = useRouter();

  const message =
    (isAxiosError(error) &&
      error.response &&
      ERROR_MESSAGE[error.response.data.code as ErrorCode]) ||
    '문제가 발생했습니다.';

  const gotoHome = () => {
    router.push(PATH.HOME);
    resetErrorBoundary();
  };

  return (
    <section className="w-screen h-screen flex flex-col justify-center items-center gap-3">
      <Label>{message}</Label>
      <Button onClick={gotoHome}>메인으로 이동</Button>
      <Button onClick={() => resetErrorBoundary()}>다시 불러오기</Button>
    </section>
  );
};

export default ErrorFallback;
