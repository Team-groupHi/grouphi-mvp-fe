'use client';

import { useRouter } from 'next/navigation';

import { PATH } from '@/constants/router';

import { Button } from '../Button';
import Label from '../Label';

interface ErrorProps {
  error: Error | null;
  resetErrorBoundary: () => void;
}

const ErrorFallback = ({ error, resetErrorBoundary }: ErrorProps) => {
  const router = useRouter();
  const gotoHome = () => {
    router.push(PATH.HOME);
  };
  return (
    <section className="w-screen h-screen flex flex-col justify-center items-center gap-3">
      <Label>문제가 발생 했습니다.</Label>
      <Button onClick={gotoHome}>메인으로 이동</Button>
      <Button onClick={resetErrorBoundary}>다시 불러오기</Button>
    </section>
  );
};

export default ErrorFallback;
