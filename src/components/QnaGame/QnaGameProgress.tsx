/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import * as StompJS from '@stomp/stompjs';
import { useQueryClient } from '@tanstack/react-query';
import React, { useEffect } from 'react';

import { QUERYKEY } from '@/constants/querykey';
import { SOCKET } from '@/constants/websocket';
import useQnaGameStore from '@/store/useQnaGameStore';
import useRoomStore from '@/store/useRoomStore';
import { Player } from '@/types/api';

import QnaGameAvatarStatus from './QnaGameAvatarStatus';
import QnaGameQuestionPanel from './QnaGameQuestionPanel';

interface QnaGameProgressProps {
  sendMessage: <T>(
    params: Omit<StompJS.IPublishParams, 'body'> & { body?: T }
  ) => void;
  players: Player[];
}

const QnaGameProgress = ({ sendMessage, players }: QnaGameProgressProps) => {
  const { round, submittedPlayers } = useQnaGameStore();
  const { setRoomStatus } = useRoomStore();

  const queryClient = useQueryClient();

  useEffect(() => {
    if (submittedPlayers.length === players.length) {
      setRoomStatus('result');
      queryClient.invalidateQueries({ queryKey: [QUERYKEY.QNA_GAME_RESULTS] });
    }
  }, [submittedPlayers, players, setRoomStatus, queryClient]);

  const handleSubmit = (answer: string) => {
    sendMessage({
      destination: SOCKET.QNA_GAME.SUBMIT,
      body: {
        round: round.currentRound,
        answer,
      },
    });
  };

  const isSubmitted = (player: string) => {
    return submittedPlayers.some(
      (submittedPlayer) => submittedPlayer === player
    );
  };

  return (
    <main className="flex flex-col items-center justify-center p-8 h-full gap-5">
      <section className="flex w-full items-center justify-center gap-2">
        {players.map((player, idx) => (
          <QnaGameAvatarStatus
            key={`${idx}color`}
            avatar={player.avatar}
            isSelected={isSubmitted(player.name)}
          />
        ))}
      </section>

      <QnaGameQuestionPanel
        question={round.question}
        onSubmit={handleSubmit}
      />

      <section className="mt-6 text-sm text-light font-semibold">
        {round.currentRound}/{round.totalRounds}
      </section>
    </main>
  );
};

export default QnaGameProgress;
