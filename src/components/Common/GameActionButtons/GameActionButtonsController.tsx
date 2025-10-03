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

  const gameControl = GAME_CONTROL_MAP[gameType];

  const { round } = gameControl.useStore();

  if (!round || !isRoomManager) return null;

  const roundEndActionText =
    round.currentRound === round.totalRounds
      ? '최종 결과 보기'
      : '다음 라운드로 이동';
  const nextDestination = gameControl.nextDestination;
  const endDestination = gameControl.endDestination;

  // 5. 이벤트 핸들러 (로직 그대로 유지)
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
