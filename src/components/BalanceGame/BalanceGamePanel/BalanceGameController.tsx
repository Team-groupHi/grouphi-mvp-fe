/* eslint-disable react-hooks/exhaustive-deps */

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
  players,
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
  const {
    data: gameResults,
    refetch,
    isError,
    error,
  } = useFetchBalanceGameResults({
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
  }, [isTimeout]);

  // @TODO: 더 선언적으로 error를 처리할 수 있는 방법 찾기
  useEffect(() => {
    if (isError) {
      throw error;
    }
  }, [isError]);

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
