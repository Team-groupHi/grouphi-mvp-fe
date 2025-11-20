'use client';

import { GameControlEntry } from '@/constants/gameControlMap';
import useRoomStore from '@/store/useRoomStore';
import { SendMessage } from '@/types/websocket';

import GameActionButtonsView from './GameActionButtonsView';

interface GameActionButtonsControllerProps {
  gameControl: GameControlEntry;
  sendMessage: SendMessage;
}

const GameActionButtonsController = ({
  gameControl,
  sendMessage,
}: GameActionButtonsControllerProps) => {
  const { roomStatus } = useRoomStore();
  const { round } = gameControl.useStore();

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
