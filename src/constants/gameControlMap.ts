import { GAME_TYPES } from '@/constants/game';
import { SOCKET } from '@/constants/websocket';
import useBalanceGameStore from '@/store/useBalanceGameStore';
import useQnaGameStore from '@/store/useQnaGameStore';

export const GAME_CONTROL_MAP = {
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
