'use client';
import Link from 'next/link';
import Lottie from 'react-lottie-player';

import { Button, ShootingStars, StarsBackground } from '@/components';

import groupHi_Spinner from '../../public/groupHi_404.json';

export default function NotFound() {
  return (
    <>
      <StarsBackground />
      <ShootingStars />
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <div className="w-full max-w-[45rem] max-h-[45rem] rounded-lg shadow-lg bg-white/5">
          <Lottie
            loop
            animationData={groupHi_Spinner}
            play
          />
        </div>
        <h4 className="text-lg mt-8 mb-6">존재하지 않는 페이지에요.</h4>
        <Button asChild={true}>
          <Link href="/">홈으로 돌아가기</Link>
        </Button>
      </div>
    </>
  );
}
