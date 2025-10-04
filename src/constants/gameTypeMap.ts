import { GAME, GAME_TYPES } from '@/constants/game';

const BALANCE_GAMES = [
  GAME.GAMES.COMPREHENSIVE_BALANCE_GAME,
  GAME.GAMES.CLASSIC_BALANCE_GAME,
  GAME.GAMES.FOOD_BALANCE_GAME,
  GAME.GAMES.DATING_BALANCE_GAME,
];

const QNA_GAMES = [GAME.GAMES.QNA_GAME];

type GameMap = Record<string, keyof typeof GAME_TYPES>;

const createGameMap = (
  games: string[],
  type: keyof typeof GAME_TYPES
): GameMap => {
  return games.reduce((map, gameName) => {
    map[gameName] = type;
    return map;
  }, {} as GameMap);
};

export const GAME_TYPE_MAP: GameMap = {
  ...createGameMap(BALANCE_GAMES, GAME_TYPES.BALANCE),
  ...createGameMap(QNA_GAMES, GAME_TYPES.QNA),
};
