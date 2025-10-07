import * as StompJS from '@stomp/stompjs';

import { RoomResponse } from '@/types/api';

export interface GamePanelProps {
  game: string;
  roomId: string;
  roomDetail: RoomResponse;
  isRoomManager: boolean;
  sendMessage: <T>(
    params: Omit<StompJS.IPublishParams, 'body'> & { body?: T }
  ) => void;
}

export type GameControllerProps = Omit<GamePanelProps, 'game'>;
