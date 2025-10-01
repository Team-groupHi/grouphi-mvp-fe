'use client';

import { useEffect } from 'react';

import { PreGame, QnaGameProgress, QnaGameResultsFetcher } from '@/components';
import { ROOM_STATUS } from '@/constants/room';
import { SOCKET } from '@/constants/websocket';
import { useToast } from '@/hooks/useToast';
import useRoomStore from '@/store/useRoomStore';
import { GameContainerProps } from '@/types/props';

const QnaGameContainer = ({
  roomId,
  roomDetail,
  players,
  isRoomManager,
  sendMessage,
}: GameContainerProps) => {
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
    <>
      {roomStatus === ROOM_STATUS.IDLE && (
        <PreGame
          roomDetail={roomDetail}
          players={players}
          isRoomManager={isRoomManager}
          sendMessage={sendMessage}
        />
      )}
      {roomStatus === ROOM_STATUS.PROGRESS && (
        <QnaGameProgress
          sendMessage={sendMessage}
          players={players}
        />
      )}
      {(roomStatus === ROOM_STATUS.RESULT ||
        roomStatus === ROOM_STATUS.FINAL_RESULT) && (
        <QnaGameResultsFetcher
          roomId={roomId}
          sendMessage={sendMessage}
        />
      )}
    </>
  );
};

export default QnaGameContainer;
