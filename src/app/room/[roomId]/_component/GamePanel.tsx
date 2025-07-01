'use client';
import * as StompJS from '@stomp/stompjs';

import { GAME_TYPES } from '@/constants/form';
import { Player, RoomResponse } from '@/types/api';
import { gameToType } from '@/utils/form';

import BalanceGame from './BalanceGame';
import QnaGame from './QnaGame';

interface GamePanelProps {
  game: string;
  roomId: string;
  roomDetail: RoomResponse;
  players: Player[];
  isRoomManager: boolean;
  sendMessage: <T>(
    params: Omit<StompJS.IPublishParams, 'body'> & { body?: T }
  ) => void;
}

const GamePanel = ({
  game,
  roomId,
  roomDetail,
  players,
  isRoomManager,
  sendMessage,
}: GamePanelProps) => {
  const gameType = gameToType(roomDetail.game.nameEn);
  switch (gameType) {
    case GAME_TYPES.BALANCE:
      return (
        <BalanceGame
          roomId={roomId}
          roomDetail={roomDetail}
          players={players}
          isRoomManager={isRoomManager}
          sendMessage={sendMessage}
        />
      );
    case GAME_TYPES.QNA:
      return (
        <QnaGame
          roomId={roomId}
          roomDetail={roomDetail}
          players={players}
          isRoomManager={isRoomManager}
          sendMessage={sendMessage}
        />
      );
    default:
      return <div>게임을 선택해주세요</div>;
  }
};

export default GamePanel;
