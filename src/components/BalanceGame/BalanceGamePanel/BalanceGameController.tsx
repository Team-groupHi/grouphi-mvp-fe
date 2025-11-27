'use client';

import { useEffect, useState } from 'react';

import { ROOM_STATUS } from '@/constants/room';
import { useFetchBalanceGameResults } from '@/hooks/queries';
import { useAutoEndGame } from '@/hooks/useAutoEndGame';
import { useToast } from '@/hooks/useToast';
import useBalanceGameStore from '@/store/useBalanceGameStore';
import useRoomStore from '@/store/useRoomStore';
import { GameControllerProps } from '@/types/props';

import BalanceGameView from './BalanceGameView';

const BalanceGameController = ({
  roomId,
  roomDetail,
  isRoomManager,
  sendMessage,
}: GameControllerProps) => {
  const { round } = useBalanceGameStore();
  const { roomStatus, setRoomStatus } = useRoomStore();
  const { toast } = useToast();

  useAutoEndGame({
    roomDetail,
    sendMessage,
    toast,
  });

  const [isTimeout, setIsTimeout] = useState<boolean>(false);
  const { data: gameResults, refetch } = useFetchBalanceGameResults({
    roomId,
    round:
      roomStatus === ROOM_STATUS.FINAL_RESULT ? undefined : round.currentRound,
  });

  useEffect(() => {
    if (isTimeout) {
      setRoomStatus(ROOM_STATUS.RESULT);
      refetch();
      setIsTimeout(false);
    }
  }, [isTimeout, refetch, setRoomStatus]);

  const preGameProps = { roomDetail, isRoomManager, sendMessage };
  const progressProps = { sendMessage, setIsTimeout };

  return (
    <BalanceGameView
      roomStatus={roomStatus}
      gameResults={gameResults}
      preGameProps={preGameProps}
      progressProps={progressProps}
    />
  );
};

export default BalanceGameController;
