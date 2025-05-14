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

  const colors = submittedPlayers.map((submittedPlayerName) => {
    const matchedPlayer = players.find(
      (player) => player.name === submittedPlayerName
    );
    return matchedPlayer ? matchedPlayer.avatar : 'red';
  });

  return (
    <main className="flex flex-col items-center justify-center p-8 h-full">
      {colors.map((color, idx) => (
        <QnaGameAvatarStatus
          color={color}
          key={`${idx}color`}
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
