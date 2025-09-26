'use client';

import * as StompJS from '@stomp/stompjs';

import { BalanceGameControl, QnaGameControl } from '@/components';
import { GAME_TYPES } from '@/constants/form';
import { gameToType } from '@/utils/form';

interface ManagerControlProps {
  game: string;
  isRoomManager: boolean;
  sendMessage: <T>(
    params: Omit<StompJS.IPublishParams, 'body'> & { body?: T }
  ) => void;
}

const RoomControl = ({
  game,
  isRoomManager,
  sendMessage,
}: ManagerControlProps) => {
  const gameType = gameToType(game);
  switch (gameType) {
    case GAME_TYPES.BALANCE:
      return (
        <BalanceGameControl
          isRoomManager={isRoomManager}
          sendMessage={sendMessage}
        />
      );
    case GAME_TYPES.QNA:
      return (
        <QnaGameControl
          isRoomManager={isRoomManager}
          sendMessage={sendMessage}
        />
      );
  }
};

export default RoomControl;
