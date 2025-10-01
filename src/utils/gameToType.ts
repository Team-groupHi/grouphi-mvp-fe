import { GAME_TYPES } from '@/constants/game';
import { GAME } from '@/constants/game';

export const gameToType = (game: string) => {
  switch (game) {
    case GAME.GAMES.COMPREHENSIVE_BALANCE_GAME:
    case GAME.GAMES.CLASSIC_BALANCE_GAME:
    case GAME.GAMES.FOOD_BALANCE_GAME:
    case GAME.GAMES.DATING_BALANCE_GAME:
      return GAME_TYPES.BALANCE;
    case GAME.GAMES.QNA_GAME:
      return GAME_TYPES.QNA;
    // @TODO: 추후에 Frontend Error Code로 관리
    default:
      throw new Error(`Unknown game type: ${game}`);
  }
};
