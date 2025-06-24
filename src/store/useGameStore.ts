import { create } from 'zustand';

import { GameResponse } from '@/types/api';

interface GameStoreProps {
  games: GameResponse[];
  setGames: (games: GameResponse[]) => void;
}

const useGameStore = create<GameStoreProps>((set) => ({
  games: [],
  setGames: (games: GameResponse[]) =>
    set({
      games,
    }),
}));

export default useGameStore;
