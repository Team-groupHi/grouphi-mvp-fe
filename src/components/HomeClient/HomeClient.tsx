'use client';

import { useEffect } from 'react';

import { Footer, MainHeader } from '@/components';
import useRoomStore from '@/store/useRoomStore';
import { GameResponse } from '@/types/api';

import GameListCarousel from './GameListCarousel';

interface HomeClientProps {
  games: GameResponse[];
}

const HomeClient = ({ games }: HomeClientProps) => {
  const { reset: roomReset } = useRoomStore();

  useEffect(() => {
    roomReset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <main className="flex flex-col h-screen p-800">
        <MainHeader />
        {games.length > 0 ? (
          <>
            <section
              id="gamelist"
              className="flex flex-col grow items-center"
            >
              <span className="text-lg pt-950">Game List</span>
              <span className="text-md pb-300">▽</span>
              <GameListCarousel games={games} />
            </section>
          </>
        ) : (
          <section className="flex h-full justify-center items-center">
            <span>게임 준비중입니다</span>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
};
export default HomeClient;
