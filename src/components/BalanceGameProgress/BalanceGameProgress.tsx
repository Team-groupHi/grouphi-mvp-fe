'use client';

import React, { useEffect, useState } from 'react';
import Timer from '@/components/Timer';
import BalanceGameQuestionCard from '@/components/BalanceGameQuestionCard';
import useBalanceGameStore from '@/store/useBalanceGameStore';
import * as StompJS from '@stomp/stompjs';
import { SOCKET } from '@/constants/websocket';
import { getBalanceGameResults } from '@/services/balanceGames';
import { BalanceGameResultGetResponse } from '@/types/api';
import { BarProps } from '@/components/FinalResultChart/Bar';

interface BalanceGameProgressProps {
  sendMessage: <T>(
    params: Omit<StompJS.IPublishParams, 'body'> & { body?: T }
  ) => void;
  setResult: (result: BalanceGameResultGetResponse[]) => void;
  setFinalResult: (result: BarProps[]) => void;
  roomId: string;
}

const BalanceGameProgress = ({
  sendMessage,
  setResult,
  setFinalResult,
  roomId,
}: BalanceGameProgressProps) => {
  const { round, setRoomStatus } = useBalanceGameStore();

  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isTimeout, setIsTimeout] = useState<boolean>(false);

  useEffect(() => {
    if (isTimeout === true) {
      setRoomStatus('result');
      getBalanceGameResults({
        roomId: roomId,
        round:
          round.currentRound + 1 === round.totalRounds
            ? undefined
            : round.currentRound,
      })
        .then((data) => {
          //@todo: 데이터 밀리는 현상 백엔드에 확인 후 콘솔 삭제
          console.log(data); // 이전 데이터
          console.log(roomId, round); // 최신데이터
          if (data) {
            if (data.length === 1) {
              setResult(data);
            } else {
              console.log('finalresult 실행');
              const finalResult: BarProps[] = data.map((data) => ({
                candidate1: data.a,
                candidate2: data.b,
                votes1: data.result.a.length,
                votes2: data.result.b.length,
              }));
              setFinalResult(finalResult);
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [isTimeout]);

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
          //@todo: 테스트 끝나면 원상 복구
          startTime={Date.now()}
          endTime={Date.now() + 3000}
          //startTime={round.startTime}
          //endTime={round.endTime}
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
