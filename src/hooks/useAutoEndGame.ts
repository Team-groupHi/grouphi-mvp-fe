import * as StompJS from '@stomp/stompjs';
import { useEffect } from 'react';

import { ToastProps } from '@/components';
import { GAME_CONTROL_MAP } from '@/constants/gameControlMap';
import { RoomResponse } from '@/types/api';
import { gameToType } from '@/utils/gameToType';

import { ToasterToast } from './useToast';

type ToastFunction = (props: ToastProps) => {
  id: string;
  dismiss: () => void;
  update: (props: ToasterToast) => void;
};

interface AutoEndGameProps {
  roomDetail: RoomResponse;
  sendMessage: <T>(
    params: Omit<StompJS.IPublishParams, 'body'> & { body?: T }
  ) => void;
  toast: ToastFunction;
}

export const useAutoEndGame = ({
  roomDetail,
  sendMessage,
  toast,
}: AutoEndGameProps) => {
  useEffect(() => {
    const isMinPlayersViolated = roomDetail.players.length === 1;
    const isGamePlaying = roomDetail.status === 'PLAYING';
    const gameType = gameToType(roomDetail.game.nameEn);

    const endDestination = gameType
      ? GAME_CONTROL_MAP[gameType].endDestination
      : null;

    if (isMinPlayersViolated && isGamePlaying && endDestination) {
      sendMessage({
        destination: endDestination,
      });

      toast({
        title: '최소 인원 수가 부족해 게임을 종료하고 대기실로 이동해요.',
      });
    }
  }, [roomDetail, sendMessage, toast]);
};
