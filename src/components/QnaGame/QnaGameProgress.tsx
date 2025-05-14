/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import * as StompJS from '@stomp/stompjs';
import React from 'react';

import { SOCKET } from '@/constants/websocket';
import useQnaGameStore from '@/store/useQnaGameStore';
import { Player } from '@/types/api';

import QnaGameAvatarStatus from './QnaGameAvatarStatus';
import QnaQuestionPanel from './QnaQuestionPanel';

interface QnaGameProgressProps {
  sendMessage: <T>(
    params: Omit<StompJS.IPublishParams, 'body'> & { body?: T }
  ) => void;
  players: Player[];
}

const QnaGameProgress = ({ sendMessage, players }: QnaGameProgressProps) => {
  const { round, submittedPlayers } = useQnaGameStore();

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
    <main className="flex flex-col items-center justify-center p-8 h-full">
      {players.map((player, idx) => (
        <QnaGameAvatarStatus
          key={`${idx}color`}
          avatar={player.avatar}
          isSelected={isSubmitted(player.name)}
        />
      ))}

      <QnaQuestionPanel
        question={round.question}
        onSubmit={handleSubmit}
      />
    </main>
  );
};

export default QnaGameProgress;
