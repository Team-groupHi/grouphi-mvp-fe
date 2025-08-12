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
    <div className="flex flex-col min-h-screen justify-between">
      <MainHeader />
      <main className="px-800">
        {games.length > 0 ? (
          <section
            id="gamelist"
            className="my-600 flex flex-col grow items-center"
          >
            <span className="text-lg">Game List</span>
            <span className="text-md pb-300">▽</span>
            <GameListCarousel games={games} />
          </section>
        ) : (
          <section className="flex h-full justify-center items-center">
            <span>게임 준비중입니다</span>
          </section>
        )}
        <aside
          className="ad-slot text-center bg-gray-800 h-28 invisible"
          aria-label="광고 영역"
        >
          {/* TODO: 광고 붙이기 */}
        </aside>
      </main>
      <Footer />
    </div>
  );
};
export default HomeClient;
