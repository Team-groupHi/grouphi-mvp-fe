'use client';

import { gameComponentMap } from '@/constants/gameComponentMap';
import { GamePanelProps } from '@/types/props';
import { gameToType } from '@/utils/gameToType';

const GamePanel = (props: GamePanelProps) => {
  const gameType = gameToType(props.game);
  const Component = gameComponentMap[gameType];

  // @TODO: 추후에 Frontend Error Code로 관리
  if (!Component) {
    throw new Error(
      `Invalid game type: No component found for game type "${gameType}" derived from game: "${props.game}"`
    );
  }

  return <Component {...props} />;
};

export default GamePanel;
