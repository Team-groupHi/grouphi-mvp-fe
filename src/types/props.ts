import * as StompJS from '@stomp/stompjs';
import { ComponentType } from 'react';

import { RoomResponse } from '@/types/api';

export interface GamePanelProps {
  GamePanel: ComponentType<GamePanelProps>;
  roomId: string;
  roomDetail: RoomResponse;
  isRoomManager: boolean;
  sendMessage: <T>(
    params: Omit<StompJS.IPublishParams, 'body'> & { body?: T }
  ) => void;
}

export type GameControllerProps = Omit<GamePanelProps, 'GamePanel'>;
