'use client';

import * as StompJS from '@stomp/stompjs';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

import { QUERYKEY } from '@/constants/querykey';
import { ROOM_STATUS } from '@/constants/room';
import { useFetchQnaGameResults } from '@/hooks/queries';
import useQnaGameStore from '@/store/useQnaGameStore';
import useRoomStore from '@/store/useRoomStore';

import { QnaGameFinalResult } from '../QnaGameFinalResult';
import { QnaGamePartialResult } from '../QnaGamePartialResult';

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

  const { data: gameResults } = useFetchQnaGameResults({
    roomId,
    round:
      roomStatus === ROOM_STATUS.FINAL_RESULT ? undefined : round.currentRound,
  });
  const queryClient = useQueryClient();

  useEffect(() => {
    if (roomStatus === ROOM_STATUS.FINAL_RESULT) {
      queryClient.invalidateQueries({
        queryKey: [QUERYKEY.QNA_GAME_RESULTS],
      });
    }
  }, [roomStatus, queryClient]);

  return (
    <>
      {roomStatus === ROOM_STATUS.RESULT &&
        gameResults &&
        gameResults.length !== 0 && (
          <QnaGamePartialResult
            data={gameResults}
            sendMessage={sendMessage}
          />
        )}
      {roomStatus === ROOM_STATUS.FINAL_RESULT &&
        gameResults &&
        gameResults.length !== 0 && (
          <QnaGameFinalResult results={gameResults} />
        )}
    </>
  );
};

export default QnaGameResultsFetcher;
