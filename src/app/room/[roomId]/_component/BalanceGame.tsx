/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import * as StompJS from '@stomp/stompjs';
import { useEffect, useState } from 'react';

import {
  BalanceGameProgress,
  FinalResultChart,
  PartialResultChart,
} from '@/components';
import { BarProps } from '@/components/FinalResultChart/Bar';
import { ROOM_STATUS } from '@/constants/room';
import { useFetchBalanceGameResults } from '@/hooks/queries';
import useBalanceGameStore from '@/store/useBalanceGameStore';
import useRoomStore from '@/store/useRoomStore';
import { Player, RoomResponse } from '@/types/api';

import PrevGame from './PrevGame';

interface BalanceGameProps {
  roomId: string;
  roomDetail: RoomResponse;
  players: Player[];
  isRoomManager: boolean;
  sendMessage: <T>(
    params: Omit<StompJS.IPublishParams, 'body'> & { body?: T }
  ) => void;
}

const BalanceGame = ({
  roomId,
  roomDetail,
  players,
  isRoomManager,
  sendMessage,
}: BalanceGameProps) => {
  const { round } = useBalanceGameStore();
  const { roomStatus, setRoomStatus } = useRoomStore();

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

  const finalResult: BarProps[] =
    gameResults?.map((data) => ({
      candidate1: data.a,
      candidate2: data.b,
      votes1: data.result.a.length,
      votes2: data.result.b.length,
    })) || [];

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

  return (
    <>
      {roomStatus === ROOM_STATUS.IDLE && (
        <PrevGame
          roomDetail={roomDetail}
          players={players}
          isRoomManager={isRoomManager}
          sendMessage={sendMessage}
        />
      )}
      {roomStatus === ROOM_STATUS.PROGRESS && (
        <BalanceGameProgress
          sendMessage={sendMessage}
          setIsTimeout={setIsTimeout}
          /* 
              // @brief: 전체 선택 시 넘어가는 기능 잠시 보류
              isAllSelected={
                players.length !== 0 &&
                new Set(selectedPlayers).size === players.length
              }
              */
        />
      )}
      {roomStatus === ROOM_STATUS.RESULT &&
        gameResults &&
        gameResults.length !== 0 && <PartialResultChart data={gameResults} />}
      {roomStatus === ROOM_STATUS.FINAL_RESULT && finalResult.length !== 0 && (
        <FinalResultChart data={finalResult} />
      )}
    </>
  );
};

export default BalanceGame;
