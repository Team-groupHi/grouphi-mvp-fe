'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { GAME_COMPONENT_MAP } from '@/constants/gameComponentMap';
import { PATH } from '@/constants/router';
import { useToast } from '@/hooks/useToast';
import { GamePanelProps } from '@/types/props';
import { gameToType } from '@/utils/gameToType';

const GamePanel = (props: GamePanelProps) => {
  const router = useRouter();
  const { toast } = useToast();

  const gameType = gameToType(props.game);
  const Component = gameType ? GAME_COMPONENT_MAP[gameType] : null;

  useEffect(() => {
    if (!gameType) {
      toast({
        variant: 'destructive',
        title: `${props.game}은 지원하지 않는 게임 타입이에요.`,
      });
      router.push(PATH.HOME);
    }
  }, [gameType, props.game, router, toast]);

  if (!Component) {
    return null;
  }

  return <Component {...props} />;
};

export default GamePanel;
