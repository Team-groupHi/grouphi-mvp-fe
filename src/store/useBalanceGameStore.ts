import { create } from 'zustand';

import { BalanceGameRoundResponse } from '@/types/websocket';

interface BalanceGameStoreProps {
  round: BalanceGameRoundResponse;
  selectedPlayers: string[];
  setRound: (round: BalanceGameRoundResponse) => void;
  addSelectedPlayers: (player: string) => void;
  resetSelectedPlayers: () => void;
}

const useBalanceGameStore = create<BalanceGameStoreProps>((set) => ({
  round: {
    totalRounds: 0,
    q: '',
    a: '',
    b: '',
    currentRound: 0,
    playSeconds: 0,
  },
  selectedPlayers: [],
  setRound: (round: BalanceGameRoundResponse) =>
    set({
      round,
    }),
  addSelectedPlayers: (player) =>
    set((state) => ({
      selectedPlayers: [...state.selectedPlayers, player],
    })),
  resetSelectedPlayers: () => {
    set({
      selectedPlayers: [],
    });
  },
}));

export default useBalanceGameStore;
