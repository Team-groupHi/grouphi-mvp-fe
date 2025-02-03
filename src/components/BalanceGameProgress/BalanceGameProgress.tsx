/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import React, { useEffect, useState } from 'react';
import Timer from '@/components/Timer';
import BalanceGameQuestionCard from '@/components/BalanceGameQuestionCard';
import useBalanceGameStore from '@/store/useBalanceGameStore';
import * as StompJS from '@stomp/stompjs';
import { SOCKET } from '@/constants/websocket';
import { getBalanceGameResults } from '@/services/balanceGames';
import { BalanceGameResultGetResponse } from '@/types/api';

interface BalanceGameProgressProps {
  sendMessage: <T>(
    params: Omit<StompJS.IPublishParams, 'body'> & { body?: T }
  ) => void;
  roomId: string;
  setPartialResult: (result: BalanceGameResultGetResponse[]) => void;
  isAllSelected: boolean;
}

const BalanceGameProgress = ({
  sendMessage,
  roomId,
  setPartialResult,
  isAllSelected,
}: BalanceGameProgressProps) => {
  const { round, setRoomStatus, resetSelectedPlayers } = useBalanceGameStore();

  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isTimeout, setIsTimeout] = useState<boolean>(false);

  useEffect(() => {
    if (isTimeout || isAllSelected) {
      setRoomStatus('result');
      resetSelectedPlayers();

      getBalanceGameResults({
        roomId: roomId,
        round: round.currentRound,
      })
        .then((data) => {
          if (data) {
            setPartialResult(data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [isTimeout, isAllSelected]);

  const handleSelect = (option: string) => {
    setSelectedOption(option);

    sendMessage({
      destination:
        option === round.a
          ? SOCKET.ENDPOINT.BALANCE_GAME.SELECT_A
          : SOCKET.ENDPOINT.BALANCE_GAME.SELECT_B,
      body: {
        currentRound: round.currentRound,
      },
    });
  };

  return (
    <main className="flex flex-col items-center justify-center p-8 h-full">
      <section className="w-full mb-4 flex flex-col items-center gap-4">
        <Timer
          startTime={round.startTime}
          endTime={round.endTime}
          setIsTimeout={setIsTimeout}
        />
      </section>

      <section className="h-full flex flex-col items-center justify-center">
        <h2 className="text-xl text-light font-bold mb-6">{round.q}</h2>

        <section className="flex items-center justify-center gap-6">
          <BalanceGameQuestionCard
            label={round.a}
            selectedAnimal={selectedOption}
            onSelect={() => handleSelect(round.a)}
          />
          <span className="text-title1 font-bold text-light">VS</span>
          <BalanceGameQuestionCard
            label={round.b}
            selectedAnimal={selectedOption}
            onSelect={() => handleSelect(round.b)}
          />
        </section>
      </section>

      <section className="mt-6 text-sm text-light font-semibold">
        {round.currentRound}/{round.totalRounds}
      </section>
    </main>
  );
};

export default BalanceGameProgress;
