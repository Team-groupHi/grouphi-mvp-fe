import { GAME_TYPE_MAP } from '@/constants/gameTypeMap';

export const gameToType = (game: string) => {
  const gameType = GAME_TYPE_MAP[game];

  if (!gameType) {
    return null;
  }

  return gameType;
};
