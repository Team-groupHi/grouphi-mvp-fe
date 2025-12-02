'use client';

import { useAutoEndGame } from '@/hooks/useAutoEndGame';
import { useToast } from '@/hooks/useToast';
import useRoomStore from '@/store/useRoomStore';
import { GameControllerProps } from '@/types/props';

import QnaGameView from './QnaGameView';

const QnaGameController = (props: GameControllerProps) => {
  const { roomDetail, sendMessage, gameType } = props;

  const { roomStatus } = useRoomStore();
  const { toast } = useToast();

  useAutoEndGame({
    roomDetail,
    sendMessage,
    toast,
    gameType,
  });

  return (
    <QnaGameView
      {...props}
      roomStatus={roomStatus}
    />
  );
};

export default QnaGameController;
