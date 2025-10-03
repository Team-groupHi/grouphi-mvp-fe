import React from 'react';

import { BalanceGamePanel, QnaGamePanel } from '@/components';
import { GAME_TYPES } from '@/constants/game';
import { GamePanelProps } from '@/types/props';

export const gameComponentMap: {
  [K in keyof typeof GAME_TYPES]: React.ComponentType<GamePanelProps>;
} = {
  [GAME_TYPES.BALANCE]: BalanceGamePanel,
  [GAME_TYPES.QNA]: QnaGamePanel,
};
