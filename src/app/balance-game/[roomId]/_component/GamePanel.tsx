/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import * as StompJS from '@stomp/stompjs';
import { useEffect, useState } from 'react';

import { FinalResultChart, PartialResultChart } from '@/components';
import BalanceGameProgress from '@/components/BalanceGameProgress';
import { BarProps } from '@/components/FinalResultChart/Bar';
import { useFetchBalanceGameResults } from '@/hooks/useFetchRoomDetail';
import useBalanceGameStore from '@/store/useBalanceGameStore';
import { Player, RoomResponse } from '@/types/api';

import PrevGame from './PrevGame';

interface GamePanelProps {
  roomId: string;
  roomDetail: RoomResponse;
  players: Player[];
  isRoomManager: boolean;
  sendMessage: <T>(
    params: Omit<StompJS.IPublishParams, 'body'> & { body?: T }
  ) => void;
}

const GamePanel = ({
  roomId,
  roomDetail,
  players,
  isRoomManager,
  sendMessage,
}: GamePanelProps) => {
  const { round, roomStatus, setRoomStatus } = useBalanceGameStore();

  const [isTimeout, setIsTimeout] = useState<boolean>(false);

  const {
    data: gameResults,
    refetch,
    isError,
    error,
  } = useFetchBalanceGameResults({
    roomId,
    round: roomStatus === 'finalResult' ? undefined : round.currentRound,
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
      setRoomStatus('result');
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
      {roomStatus === 'idle' && (
        <PrevGame
          roomDetail={roomDetail}
          players={players}
          isRoomManager={isRoomManager}
          sendMessage={sendMessage}
        />
      )}
      {roomStatus === 'progress' && (
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
      {roomStatus === 'result' && gameResults && gameResults.length !== 0 && (
        <PartialResultChart data={gameResults} />
      )}
      {roomStatus === 'finalResult' && finalResult.length !== 0 && (
        <FinalResultChart data={finalResult} />
      )}
    </>
  );
};

export default GamePanel;
