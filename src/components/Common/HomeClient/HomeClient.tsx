'use client';

import { useEffect } from 'react';

import { AdBanner, Footer, GameListCarousel, MainHeader } from '@/components';
import useGameStore from '@/store/useGameStore';
import useRoomStore from '@/store/useRoomStore';
import { GameResponse } from '@/types/api';
import { isDevelopment } from '@/utils/env';

interface HomeClientProps {
  games: GameResponse[];
}

const HomeClient = ({ games }: HomeClientProps) => {
  const { setGames } = useGameStore();

  const { reset: roomReset } = useRoomStore();

  useEffect(() => {
    roomReset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (games) {
      setGames(games);
    }
  }, [setGames, games]);

  return (
    <div className="flex flex-col min-h-screen justify-between overflow-y-hidden">
      <MainHeader />
      <main className="flex flex-col items-center px-800 min-h-[calc(100%-10rem)]">
        {games.length > 0 ? (
          <section
            id="gamelist"
            className="my-600 flex flex-col grow items-center"
          >
            <span className="text-md 2xl:text-lg">Game List</span>
            <span className="text-md pb-300">▽</span>
            <GameListCarousel games={games} />
          </section>
        ) : (
          <section className="flex h-full justify-center items-center">
            <span>게임을 준비 중이에요.</span>
          </section>
        )}
        {isDevelopment && (
          <AdBanner type="wideLeaderboard">와이드 리더보드 광고 영역</AdBanner>
        )}
      </main>
      <Footer />
    </div>
  );
};
export default HomeClient;
