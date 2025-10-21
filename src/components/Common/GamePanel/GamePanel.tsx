'use client';
import * as StompJS from '@stomp/stompjs';

import { BalanceGameContainer, QnaGameContainer } from '@/components';
import { GAME_TYPES } from '@/constants/form';
import { Player, RoomResponse } from '@/types/api';
import { gameToType } from '@/utils/form';

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
  const gameType = gameToType(game);
  switch (gameType) {
    case GAME_TYPES.BALANCE:
      return (
        <BalanceGameContainer
          roomId={roomId}
          roomDetail={roomDetail}
          players={players}
          isRoomManager={isRoomManager}
          sendMessage={sendMessage}
        />
      );
    case GAME_TYPES.QNA:
      return (
        <QnaGameContainer
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
