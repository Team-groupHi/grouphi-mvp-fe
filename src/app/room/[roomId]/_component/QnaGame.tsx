'use client';

import * as StompJS from '@stomp/stompjs';

import { QnaGameProgress, QnaGameResultsFetcher } from '@/components';
import { ROOM_STATUS } from '@/constants/room';
import useRoomStore from '@/store/useRoomStore';
import { Player, RoomResponse } from '@/types/api';

import PrevGame from './PrevGame';

interface QnaGameProps {
  roomId: string;
  roomDetail: RoomResponse;
  players: Player[];
  isRoomManager: boolean;
  sendMessage: <T>(
    params: Omit<StompJS.IPublishParams, 'body'> & { body?: T }
  ) => void;
}

const QnaGame = ({
  roomId,
  roomDetail,
  players,
  isRoomManager,
  sendMessage,
}: QnaGameProps) => {
  const { roomStatus } = useRoomStore();

  return (
    <>
      {roomStatus === ROOM_STATUS.IDLE && (
        <PrevGame
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

export default QnaGame;
