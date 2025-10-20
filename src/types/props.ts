import { RoomResponse } from '@/types/api';

import { GameType } from './game';
import { SendMessage } from './websocket';

export interface GameControllerProps {
  roomId: string;
  roomDetail: RoomResponse;
  isRoomManager: boolean;
  sendMessage: SendMessage;
  gameType: GameType;
}

export type PreGameControllerProps = Omit<GameControllerProps, 'roomId'>;

export interface BalanceGameProgressProps {
  sendMessage: SendMessage;
  setIsTimeout: (state: boolean) => void;
}
