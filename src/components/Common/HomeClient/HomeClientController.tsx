'use client';

import { useEffect } from 'react';

import useGameStore from '@/store/useGameStore';
import useRoomStore from '@/store/useRoomStore';
import useSocketStore from '@/store/useSocketStore';
import { GameResponse } from '@/types/api';

import HomeClientView from './HomeClientView';

interface HomeClientControllerProps {
  games: GameResponse[];
}

const HomeClientController = ({ games }: HomeClientControllerProps) => {
  const { setGames } = useGameStore();

  const { reset: roomReset } = useRoomStore();
  const { reset: socketReset } = useSocketStore();

  useEffect(() => {
    roomReset();
    socketReset();
  }, [roomReset, socketReset]);

  useEffect(() => {
    if (games) {
      setGames(games);
    }
  }, [setGames, games]);

  return <HomeClientView games={games} />;
};
export default HomeClientController;
