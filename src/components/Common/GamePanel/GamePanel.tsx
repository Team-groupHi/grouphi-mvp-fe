'use client';

import { GamePanelProps } from '@/types/props';

const GamePanel = (props: GamePanelProps) => {
  // const router = useRouter();
  // const { toast } = useToast();

  // const gameType = gameToType(props.game);
  // const Component = gameType ? GAME_COMPONENT_MAP[gameType] : null;

  // useEffect(() => {
  //   if (!gameType) {
  //     toast({
  //       variant: 'destructive',
  //       title: `${props.game}은 지원하지 않는 게임 타입이에요.`,
  //     });
  //     router.push(PATH.HOME);
  //   }
  // }, [gameType, props.game, router, toast]);

  if (!props.GamePanel) {
    return null;
  }

  return <props.GamePanel {...props} />;
};

export default GamePanel;
