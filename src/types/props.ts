import * as StompJS from '@stomp/stompjs';

import { Player, RoomResponse } from '@/types/api';

export interface GamePanelProps {
  game: string;
  roomId: string;
  roomDetail: RoomResponse;
  players: Player[];
  isRoomManager: boolean;
  sendMessage: <T>(
    params: Omit<StompJS.IPublishParams, 'body'> & { body?: T }
  ) => void;
}

export type GameControllerProps = Omit<GamePanelProps, 'game'>;
