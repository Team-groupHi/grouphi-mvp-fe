import * as StompJS from '@stomp/stompjs';

import { RoomResponse } from '@/types/api';

import { GameType } from './game';

export interface GameControllerProps {
  roomId: string;
  roomDetail: RoomResponse;
  isRoomManager: boolean;
  sendMessage: <T>(
    params: Omit<StompJS.IPublishParams, 'body'> & { body?: T }
  ) => void;
  gameType: GameType;
}

export type PreGameControllerProps = Omit<GameControllerProps, 'roomId'>;

export interface BalanceGameProgressProps {
  sendMessage: <T>(
    params: Omit<StompJS.IPublishParams, 'body'> & { body?: T }
  ) => void;
  setIsTimeout: (state: boolean) => void;
}
