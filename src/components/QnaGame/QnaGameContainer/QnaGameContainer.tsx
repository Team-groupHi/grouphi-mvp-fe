'use client';

import { PreGame, QnaGameProgress, QnaGameResultsFetcher } from '@/components';
import { ROOM_STATUS } from '@/constants/room';
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
