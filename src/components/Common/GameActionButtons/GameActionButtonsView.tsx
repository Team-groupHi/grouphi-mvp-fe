import { Button } from '@/components';
import { ROOM_STATUS } from '@/constants/room';

interface GameActionButtonsViewProps {
  roomStatus: string;
  buttonText: string;
  handleEnterNextRound: () => void;
  handleMoveToWaitingRoom: () => void;
}

const GameActionButtonsView = ({
  roomStatus,
  buttonText,
  handleEnterNextRound,
  handleMoveToWaitingRoom,
}: GameActionButtonsViewProps) => {
  return (
    <>
      {roomStatus === ROOM_STATUS.RESULT && (
        <Button
          size="md"
          className="w-full"
          onClick={handleEnterNextRound}
        >
          {buttonText}
        </Button>
      )}
      {roomStatus === ROOM_STATUS.FINAL_RESULT && (
        <Button
          size="md"
          className="w-full"
          onClick={handleMoveToWaitingRoom}
        >
          대기실로 이동
        </Button>
      )}
    </>
  );
};

export default GameActionButtonsView;
