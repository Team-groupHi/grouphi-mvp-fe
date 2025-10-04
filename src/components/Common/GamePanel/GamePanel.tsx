'use client';

import { useRouter } from 'next/navigation'; // 💡 useRouter 사용
import { useEffect } from 'react';

import { gameComponentMap } from '@/constants/gameComponentMap';
import { PATH } from '@/constants/router';
import { useToast } from '@/hooks/useToast';
import { GamePanelProps } from '@/types/props';
import { gameToType } from '@/utils/gameToType';

const GamePanel = (props: GamePanelProps) => {
  const router = useRouter();
  const { toast } = useToast();

  const gameType = gameToType(props.game);
  const Component = gameType ? gameComponentMap[gameType] : null;

  useEffect(() => {
    if (!Component) {
      toast({
        variant: 'destructive',
        title: `${props.game}은 지원하지 않는 게임 타입입니다.`,
      });
      router.push(PATH.HOME);
    }
  }, [Component, props.game, router, toast]);

  if (!Component) {
    return null;
  }

  return <Component {...props} />;
};

export default GamePanel;
