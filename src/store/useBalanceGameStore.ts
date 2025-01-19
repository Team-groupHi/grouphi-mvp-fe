import { BalanceGameRoundResponse } from '@/types/api';
import { create } from 'zustand';

type roomStatusType = 'idle' | 'progress' | 'result' | 'finalResult';

interface RoundType {
  q: string;
  a: string;
  b: string;
  currentRound: number;
  startTime: string;
  endTime: string;
}

interface BalanceGameStoreProps {
  totalRounds: number; // === totalRounds, 리셋 시 0?
  roomStatus: roomStatusType;
  round: RoundType;
  setRound: (question: BalanceGameRoundResponse) => void;
  setTotalRounds: (count: number) => void;
  setRoomStatus: (status: roomStatusType) => void;
  reset: () => void;
}

const useBalanceGameStore = create<BalanceGameStoreProps>((set) => ({
  totalRounds: 0,
  round: {
    q: '',
    a: '',
    b: '',
    currentRound: 0,
    startTime: '',
    endTime: '',
  },
  roomStatus: 'idle',
  setRound: (newProps: BalanceGameRoundResponse) =>
    set({
      round: {
        q: newProps.q,
        a: newProps.a,
        b: newProps.b,
        currentRound: newProps.currentRound,
        startTime: newProps.startTime,
        endTime: newProps.endTime,
      },
    }),
  setRoomStatus: (status) => set({ roomStatus: status }),
  setTotalRounds: (count) => set({ totalRounds: count }),
  reset: () =>
    set({
      totalRounds: 0,
      roomStatus: 'idle',
    }),
}));

export default useBalanceGameStore;
