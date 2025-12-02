import { GAME_TYPES } from '@/constants/game';
import { SOCKET } from '@/constants/websocket';
import useBalanceGameStore from '@/store/useBalanceGameStore';
import useQnaGameStore from '@/store/useQnaGameStore';
import { RoundInfo } from '@/types/game';

export type GameControlEntry = {
  useStore: () => RoundInfo;
  nextDestination: string;
  endDestination: string;
};

type GameControlMapType = {
  [K in keyof typeof GAME_TYPES]: GameControlEntry;
};

export const GAME_CONTROL_MAP: GameControlMapType = {
  [GAME_TYPES.BALANCE]: {
    useStore: useBalanceGameStore,
    nextDestination: SOCKET.BALANCE_GAME.NEXT,
    endDestination: SOCKET.BALANCE_GAME.END,
  },
  [GAME_TYPES.QNA]: {
    useStore: useQnaGameStore,
    nextDestination: SOCKET.QNA_GAME.NEXT,
    endDestination: SOCKET.QNA_GAME.END,
  },
} as const;
