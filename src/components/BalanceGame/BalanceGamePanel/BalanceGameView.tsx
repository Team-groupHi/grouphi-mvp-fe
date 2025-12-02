import {
  BalanceGameFinalResult,
  BalanceGamePartialResult,
  BalanceGameProgress,
  PreGame,
} from '@/components';
import { ROOM_STATUS } from '@/constants/room';
import { BalanceGameResultResponse } from '@/types/api';
import {
  BalanceGameProgressProps,
  PreGameControllerProps,
} from '@/types/props';
import { roomStatusType } from '@/types/room';

interface BalanceGameViewProps {
  roomStatus: roomStatusType;
  preGameProps: PreGameControllerProps;
  progressProps: BalanceGameProgressProps;
  gameResults: BalanceGameResultResponse[];
}

const BalanceGameView = ({
  roomStatus,
  preGameProps,
  progressProps,
  gameResults,
}: BalanceGameViewProps) => {
  return (
    <>
      {roomStatus === ROOM_STATUS.IDLE && <PreGame {...preGameProps} />}
      {roomStatus === ROOM_STATUS.PROGRESS && (
        <BalanceGameProgress {...progressProps} />
      )}
      {roomStatus === ROOM_STATUS.RESULT &&
        gameResults &&
        gameResults.length !== 0 && (
          <BalanceGamePartialResult data={gameResults} />
        )}
      {roomStatus === ROOM_STATUS.FINAL_RESULT && gameResults.length !== 0 && (
        <BalanceGameFinalResult data={gameResults} />
      )}
    </>
  );
};

export default BalanceGameView;
