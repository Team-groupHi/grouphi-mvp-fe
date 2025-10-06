/* eslint-disable react-hooks/exhaustive-deps */

import * as StompJS from '@stomp/stompjs';
import { useEffect } from 'react';

import { ToastProps } from '@/components';
import { RoomResponse } from '@/types/api';

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
  endDestination: string;
}

export const useAutoEndGame = ({
  roomDetail,
  sendMessage,
  toast,
  endDestination,
}: AutoEndGameProps) => {
  useEffect(() => {
    const isMinPlayersViolated = roomDetail.players.length === 1;
    const isGamePlaying = roomDetail.status === 'PLAYING';

    if (isMinPlayersViolated && isGamePlaying) {
      sendMessage({
        destination: endDestination,
      });

      toast({
        title: '최소 인원 수가 부족해 게임을 종료하고 대기실로 이동합니다.',
      });
    }
  }, [roomDetail.players.length]);
};
