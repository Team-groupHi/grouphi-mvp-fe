'use client';

import * as StompJS from '@stomp/stompjs';

import { QnaGameControl } from '@/components';
import BalanceGameControl from '@/components/BalanceGame/BalanceGameControl';
import { GAME } from '@/constants/game';

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
  switch (game) {
    case GAME.GAMES.COMPREHENSIVE_BALANCE_GAME:
    case GAME.GAMES.CLASSIC_BALANCE_GAME:
    case GAME.GAMES.FOOD_BALANCE_GAME:
    case GAME.GAMES.DATING_BALANCE_GAME:
      return (
        <BalanceGameControl
          isRoomManager={isRoomManager}
          sendMessage={sendMessage}
        />
      );
    case GAME.GAMES.QNA_GAME:
      return (
        <QnaGameControl
          isRoomManager={isRoomManager}
          sendMessage={sendMessage}
        />
      );
  }
};

export default RoomControl;
