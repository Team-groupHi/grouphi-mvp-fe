'use client';
import * as StompJS from '@stomp/stompjs';

import { GAME } from '@/constants/game';
import { Player, RoomResponse } from '@/types/api';

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
  switch (game) {
    case GAME.GAMES.COMPREHENSIVE_BALANCE_GAME:
    case GAME.GAMES.CLASSIC_BALANCE_GAME:
    case GAME.GAMES.FOOD_BALANCE_GAME:
    case GAME.GAMES.DATING_BALANCE_GAME:
      return (
        <BalanceGame
          roomId={roomId}
          roomDetail={roomDetail}
          players={players}
          isRoomManager={isRoomManager}
          sendMessage={sendMessage}
        />
      );
    case GAME.GAMES.QNA_GAME:
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
