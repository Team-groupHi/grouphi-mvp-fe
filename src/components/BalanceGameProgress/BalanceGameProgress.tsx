'use client';

import React, { useState } from 'react';
import Timer from '@/components/Timer';
import BalanceGameQuestionCard from '@/components/BalanceGameQuestionCard';
import useBalanceGameStore from '@/store/useBalanceGameStore';

const BalanceGameProgress = () => {
  const { totalRounds, round } = useBalanceGameStore();
  const startTime = new Date(
    new Date(round.startTime).getTime() + 9 * 60 * 60 * 1000
  ).getTime();
  const endTime = new Date(
    new Date(round.endTime).getTime() + 9 * 60 * 60 * 1000
  ).getTime();

  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleSelect = (option: string) => {
    setSelectedOption(option);

    //@Todo
    // 타이머 끝났을 때 선택된 선택지 전송 a, b, 미선택
    // 타이머 정보(끝났다는 상태)를 이 컴포넌트에서 판단해야 함.

    //@Todo
    // 전원 다 선택을 했을 경우 바로 중간 결과로 가는 로직 필요
  };

  return (
    <main className="flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md mb-4">
        <Timer
          startTime={startTime}
          endTime={endTime}
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
