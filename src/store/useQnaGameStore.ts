import { create } from 'zustand';

import { QnaGameRoundResponse } from '@/types/websocket';

interface BalanceGameStoreProps {
  round: QnaGameRoundResponse;
  submittedPlayers: string[];
  setRound: (round: QnaGameRoundResponse) => void;
  setTotalRounds: (count: number) => void;
  addSubmittedPlayer: (playerId: string) => void;
  clearSubmittedPlayers: () => void;
  reset: () => void;
}

const useQnaGameStore = create<BalanceGameStoreProps>((set) => ({
  round: {
    totalRounds: 0,
    currentRound: 0,
    question: '',
  },
  submittedPlayers: [],
  setRound: (round: QnaGameRoundResponse) =>
    set({
      round,
    }),
  setTotalRounds: (count) =>
    set((state) => ({
      round: {
        ...state.round,
        totalRounds: count,
      },
    })),
  addSubmittedPlayer: (playerId) =>
    set((state) => ({
      submittedPlayers: [...state.submittedPlayers, playerId],
    })),
  clearSubmittedPlayers: () => set({ submittedPlayers: [] }),
  reset: () =>
    set({
      submittedPlayers: [],
    }),
}));

export default useQnaGameStore;
