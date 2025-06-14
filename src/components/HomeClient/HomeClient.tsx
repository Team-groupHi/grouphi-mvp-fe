'use client';

import { useEffect } from 'react';

import GameListCarousel, { Footer, MainHeader } from '@/components';
import useGameStore from '@/store/useGameStore';
import useRoomStore from '@/store/useRoomStore';
import { GameResponse } from '@/types/api';

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
