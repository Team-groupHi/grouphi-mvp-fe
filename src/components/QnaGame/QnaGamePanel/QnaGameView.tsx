import React from 'react';

import { PreGame, QnaGameProgress, QnaGameResultsFetcher } from '@/components';
import { ROOM_STATUS } from '@/constants/room';
import { GameControllerProps } from '@/types/props';
import { roomStatusType } from '@/types/room';

interface QnaGameViewProps extends GameControllerProps {
  roomStatus: roomStatusType;
}

const QnaGameView = ({
  roomId,
  roomDetail,
  isRoomManager,
  sendMessage,
  roomStatus,
}: QnaGameViewProps) => {
  return (
    <>
      {roomStatus === ROOM_STATUS.IDLE && (
        <PreGame
          roomDetail={roomDetail}
          isRoomManager={isRoomManager}
          sendMessage={sendMessage}
        />
      )}
      {roomStatus === ROOM_STATUS.PROGRESS && (
        <QnaGameProgress
          sendMessage={sendMessage}
          players={roomDetail.players}
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

export default QnaGameView;
