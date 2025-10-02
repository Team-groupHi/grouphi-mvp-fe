'use client';

import { useEffect } from 'react';

import { SOCKET } from '@/constants/websocket';
import { useToast } from '@/hooks/useToast';
import useRoomStore from '@/store/useRoomStore';
import { GameControllerProps } from '@/types/props';

import QnaGameView from './QnaGameView';

const QnaGameController = (props: GameControllerProps) => {
  const { roomDetail, isRoomManager, sendMessage } = props;

  const { roomStatus } = useRoomStore();
  const { toast } = useToast();

  useEffect(() => {
    if (
      isRoomManager &&
      roomDetail.players.length === 1 &&
      roomDetail.status === 'PLAYING'
    ) {
      sendMessage({
        destination: `${SOCKET.QNA_GAME.END}`,
      });

      toast({
        title: '최소 인원 수가 부족해 게임을 종료하고 대기실로 이동합니다.',
      });
    }
  }, [isRoomManager, roomDetail, sendMessage, toast]);

  return (
    <QnaGameView
      {...props}
      roomStatus={roomStatus}
    />
  );
};

export default QnaGameController;
