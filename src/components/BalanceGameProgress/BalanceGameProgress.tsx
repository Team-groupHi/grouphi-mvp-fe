/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import * as StompJS from '@stomp/stompjs';
import React, { useState } from 'react';

import BalanceGameQuestionCard from '@/components/BalanceGameQuestionCard';
import Timer from '@/components/Timer';
import { SOCKET } from '@/constants/websocket';
import useBalanceGameStore from '@/store/useBalanceGameStore';

interface BalanceGameProgressProps {
  sendMessage: <T>(
    params: Omit<StompJS.IPublishParams, 'body'> & { body?: T }
  ) => void;
  setIsTimeout: (state: boolean) => void;
}

const BalanceGameProgress = ({
  sendMessage,
  setIsTimeout,
}: BalanceGameProgressProps) => {
  const { round } = useBalanceGameStore();

  const [selectedOption, setSelectedOption] = useState<string | null>(null);

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
