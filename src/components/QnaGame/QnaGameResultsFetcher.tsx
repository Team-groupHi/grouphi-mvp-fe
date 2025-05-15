'use client';

import * as StompJS from '@stomp/stompjs';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

import { QUERYKEY } from '@/constants/querykey';
import { useFetchQnaGameResults } from '@/hooks/fetch';
import useQnaGameStore from '@/store/useQnaGameStore';
import useRoomStore from '@/store/useRoomStore';
import { Player } from '@/types/api';

import QnaGameResultPanel from './QnaGameResultPanel';
import QnaPartialResult from './QnaPartialResult';

interface QnaGameResultsFetcherProps {
  roomId: string;
  players: Player[];
  sendMessage: <T>(
    params: Omit<StompJS.IPublishParams, 'body'> & { body?: T }
  ) => void;
}

const QnaGameResultsFetcher = ({
  roomId,
  players,
  sendMessage,
}: QnaGameResultsFetcherProps) => {
  const { roomStatus, setRoomStatus } = useRoomStore();
  const { submittedPlayers, round } = useQnaGameStore();

  const queryClient = useQueryClient();
  const {
    data: gameResults,
    isError,
    error,
  } = useFetchQnaGameResults({
    roomId,
    round: roomStatus === 'finalResult' ? undefined : round.currentRound,
  });

  useEffect(() => {
    if (submittedPlayers.length === players.length) {
      setRoomStatus('result');
      queryClient.invalidateQueries({ queryKey: [QUERYKEY.QNA_GAME_RESULTS] });
    }
  }, [submittedPlayers, players, setRoomStatus, queryClient]);

  // @TODO: 더 선언적으로 error를 처리할 수 있는 방법 찾기
  useEffect(() => {
    if (isError) {
      throw error;
    }
  }, [error, isError]);

  return (
    <>
      {roomStatus === 'result' && gameResults && gameResults.length !== 0 && (
        <QnaPartialResult
          data={gameResults}
          sendMessage={sendMessage}
        />
      )}
      {roomStatus === 'finalResult' &&
        gameResults &&
        gameResults.length !== 0 && (
          <QnaGameResultPanel results={gameResults} />
        )}
    </>
  );
};

export default QnaGameResultsFetcher;
