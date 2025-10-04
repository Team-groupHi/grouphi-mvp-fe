'use client';

import * as StompJS from '@stomp/stompjs';

import { GAME_CONTROL_MAP } from '@/constants/gameControlMap';
import useRoomStore from '@/store/useRoomStore';
import { gameToType } from '@/utils/gameToType';

import GameActionButtonsView from './GameActionButtonsView';

interface GameActionButtonsControllerProps {
  game: string;
  isRoomManager: boolean;
  sendMessage: <T>(
    params: Omit<StompJS.IPublishParams, 'body'> & { body?: T }
  ) => void;
}

const GameActionButtonsController = ({
  game,
  isRoomManager,
  sendMessage,
}: GameActionButtonsControllerProps) => {
  const gameType = gameToType(game);
  const { roomStatus } = useRoomStore();

  const gameControl = gameType ? GAME_CONTROL_MAP[gameType] : null;

  const { round } = gameControl?.useStore() || { round: null };

  if (!gameControl || !round || !isRoomManager) return null;

  const roundEndActionText =
    round.currentRound === round.totalRounds
      ? '최종 결과 보기'
      : '다음 라운드로 이동';
  const nextDestination = gameControl.nextDestination;
  const endDestination = gameControl.endDestination;

  const handleEnterNextRound = () => {
    sendMessage({ destination: nextDestination });
  };

  const handleMoveToWaitingRoom = () => {
    sendMessage({ destination: endDestination });
  };

  return (
    <GameActionButtonsView
      roomStatus={roomStatus}
      buttonText={roundEndActionText}
      handleEnterNextRound={handleEnterNextRound}
      handleMoveToWaitingRoom={handleMoveToWaitingRoom}
    />
  );
};

export default GameActionButtonsController;
