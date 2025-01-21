'use client';

import React, { useEffect, useState } from 'react';
import Timer from '@/components/Timer';
import BalanceGameQuestionCard from '@/components/BalanceGameQuestionCard';
import useBalanceGameStore from '@/store/useBalanceGameStore';
import * as StompJS from '@stomp/stompjs';
import { SOCKET } from '@/constants/websocket';

interface BalanceGameProgressProps {
  sendMessage: <T>(
    params: Omit<StompJS.IPublishParams, 'body'> & { body?: T }
  ) => void;
}

const BalanceGameProgress = ({ sendMessage }: BalanceGameProgressProps) => {
  const { totalRounds, round, setRoomStatus } = useBalanceGameStore();
  const startTime = new Date(
    new Date(round.startTime).getTime() + 9 * 60 * 60 * 1000
  ).getTime();
  const endTime = new Date(
    new Date(round.endTime).getTime() + 9 * 60 * 60 * 1000
  ).getTime();

  const [isTimeout, setIsTimeout] = useState(false);

  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  useEffect(() => {
    if (isTimeout) {
      setRoomStatus('result');
    }
  }, [isTimeout, setRoomStatus]);

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
    <main className="flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md mb-4">
        <Timer
          startTime={startTime}
          endTime={endTime}
          setIsTimeout={setIsTimeout}
        />
      </div>

      <h2 className="text-xl text-light font-bold mb-6">{round.q}</h2>

      <div className="flex items-center justify-center gap-6">
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
      </div>

      <div className="mt-6 text-sm text-light font-semibold">
        {round.currentRound}/{totalRounds}
      </div>
    </main>
  );
};

export default BalanceGameProgress;
