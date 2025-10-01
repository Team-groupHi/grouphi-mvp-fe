import { GAME_TYPES } from '@/constants/game';

export type GameType = (typeof GAME_TYPES)[keyof typeof GAME_TYPES];
