import React from 'react';

import { BalanceGameContainer, QnaGameContainer } from '@/components';
import { GAME_TYPES } from '@/constants/game';
import { GamePanelProps } from '@/types/props';

export const gameComponentMap: {
  [K in keyof typeof GAME_TYPES]: React.ComponentType<GamePanelProps>;
} = {
  [GAME_TYPES.BALANCE]: BalanceGameContainer,
  [GAME_TYPES.QNA]: QnaGameContainer,
};
