import React from 'react';

import { BalanceGamePanel } from '@/components/BalanceGame/BalanceGamePanel';
import { QnaGamePanel } from '@/components/QnaGame/QnaGamePanel';
import { GAME_TYPES } from '@/constants/game';
import { GamePanelProps } from '@/types/props';

export const GAME_COMPONENT_MAP: {
  [K in keyof typeof GAME_TYPES]: React.ComponentType<GamePanelProps>;
} = {
  [GAME_TYPES.BALANCE]: BalanceGamePanel,
  [GAME_TYPES.QNA]: QnaGamePanel,
};
