import { useEffect } from 'react';

import { ToastProps } from '@/components';
import { GAME_CONTROL_MAP } from '@/constants/gameControlMap';
import { RoomResponse } from '@/types/api';
import { GameType } from '@/types/game';
import { SendMessage } from '@/types/websocket';

import { ToasterToast } from './useToast';

type ToastFunction = (props: ToastProps) => {
  id: string;
  dismiss: () => void;
  update: (props: ToasterToast) => void;
};

interface AutoEndGameProps {
  roomDetail: RoomResponse;
  sendMessage: SendMessage;
  toast: ToastFunction;
  gameType: GameType;
}

export const useAutoEndGame = ({
  roomDetail,
  sendMessage,
  toast,
  gameType,
}: AutoEndGameProps) => {
  useEffect(() => {
    const isMinPlayersViolated = roomDetail.players.length === 1;
    const isGamePlaying = roomDetail.status === 'PLAYING';

    const endDestination = GAME_CONTROL_MAP[gameType].endDestination;

    if (isMinPlayersViolated && isGamePlaying) {
      sendMessage({
        destination: endDestination,
      });

      toast({
        title: '최소 인원 수가 부족해 게임을 종료하고 대기실로 이동해요.',
      });
    }
  }, [roomDetail, sendMessage, toast, gameType]);
};
