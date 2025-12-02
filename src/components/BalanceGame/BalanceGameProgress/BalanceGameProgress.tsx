/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useState } from 'react';

import { BalanceGameQuestionCard, Timer } from '@/components';
import { SOCKET } from '@/constants/websocket';
import useBalanceGameStore from '@/store/useBalanceGameStore';
import { BalanceGameProgressProps } from '@/types/props';

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
          ? SOCKET.BALANCE_GAME.SELECT_A
          : SOCKET.BALANCE_GAME.SELECT_B,
      body: {
        currentRound: round.currentRound,
      },
    });
  };

  return (
    <main className="bg-container/60 flex flex-col items-center justify-center p-8 h-full rounded-lg">
      <section className="w-full mb-4 flex flex-col items-center gap-4">
        <Timer
          playSeconds={round.playSeconds}
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
