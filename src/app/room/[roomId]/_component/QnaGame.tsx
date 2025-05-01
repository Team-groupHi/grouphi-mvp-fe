'use client';

import * as StompJS from '@stomp/stompjs';
import { useEffect } from 'react';

import { QnaGameResultPanel, QnaPartialResult } from '@/components';
import QnaGameProgress from '@/components/QnaGameProgress/QnaGameProgress';
import { useFetchQnaGameResults } from '@/hooks/fetch';
import useQnaGameStore from '@/store/useQnaGameStore';
import useRoomStore from '@/store/useRoomStore';
import { Player, RoomResponse } from '@/types/api';

import PrevGame from './PrevGame';

interface QnaGameProps {
  roomId: string;
  roomDetail: RoomResponse;
  players: Player[];
  isRoomManager: boolean;
  sendMessage: <T>(
    params: Omit<StompJS.IPublishParams, 'body'> & { body?: T }
  ) => void;
}

const QnaGame = ({
  roomId,
  roomDetail,
  players,
  isRoomManager,
  sendMessage,
}: QnaGameProps) => {
  const { roomStatus, setRoomStatus } = useRoomStore();
  const { round, submittedPlayers } = useQnaGameStore();

  const {
    data: gameResults,
    refetch,
    isError,
    error,
  } = useFetchQnaGameResults({
    roomId,
    round: roomStatus === 'finalResult' ? undefined : round.currentRound,
  });

  useEffect(() => {
    if (submittedPlayers.length === players.length) {
      setRoomStatus('result');
      refetch();
    }
  }, [submittedPlayers, players, setRoomStatus, refetch]);

  // @TODO: 더 선언적으로 error를 처리할 수 있는 방법 찾기
  useEffect(() => {
    if (isError) {
      throw error;
    }
  }, [error, isError]);

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
        <QnaGameProgress
          sendMessage={sendMessage}
          players={players}
        />
      )}
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

export default QnaGame;
