'use client';

import * as StompJS from '@stomp/stompjs';
import { useEffect } from 'react';

import { useFetchQnaGameResults } from '@/hooks/fetch';
import useQnaGameStore from '@/store/useQnaGameStore';
import useRoomStore from '@/store/useRoomStore';

import QnaGameFinalResult from './QnaGameFinalResult';
import QnaGamePartialResult from './QnaGamePartialResult';

interface QnaGameResultsFetcherProps {
  roomId: string;

  sendMessage: <T>(
    params: Omit<StompJS.IPublishParams, 'body'> & { body?: T }
  ) => void;
}

const QnaGameResultsFetcher = ({
  roomId,

  sendMessage,
}: QnaGameResultsFetcherProps) => {
  const { roomStatus } = useRoomStore();
  const { round } = useQnaGameStore();

  const {
    data: gameResults,
    isError,
    error,
  } = useFetchQnaGameResults({
    roomId,
    round: roomStatus === 'finalResult' ? undefined : round.currentRound,
  });

  // @TODO: 더 선언적으로 error를 처리할 수 있는 방법 찾기
  useEffect(() => {
    if (isError) {
      throw error;
    }
  }, [error, isError]);

  return (
    <>
      {roomStatus === 'result' && gameResults && gameResults.length !== 0 && (
        <QnaGamePartialResult
          data={gameResults}
          sendMessage={sendMessage}
        />
      )}
      {roomStatus === 'finalResult' &&
        gameResults &&
        gameResults.length !== 0 && (
          <QnaGameFinalResult results={gameResults} />
        )}
    </>
  );
};

export default QnaGameResultsFetcher;
