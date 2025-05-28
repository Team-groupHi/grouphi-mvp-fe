'use client';

import * as StompJS from '@stomp/stompjs';

import { Button } from '@/components';
import { ROOM_STATUS } from '@/constants/room';
import { SOCKET } from '@/constants/websocket';
import useBalanceGameStore from '@/store/useBalanceGameStore';
import useRoomStore from '@/store/useRoomStore';

interface ManagerControlProps {
  isRoomManager: boolean;
  sendMessage: <T>(
    params: Omit<StompJS.IPublishParams, 'body'> & { body?: T }
  ) => void;
}

const BalanceGameControl = ({
  isRoomManager,
  sendMessage,
}: ManagerControlProps) => {
  const { round } = useBalanceGameStore();
  const { roomStatus } = useRoomStore();

  const handleEnterNextRound = () => {
    sendMessage({
      destination: `${SOCKET.BALANCE_GAME.NEXT}`,
    });
  };

  const handleMoveToWaitingRoom = () => {
    sendMessage({
      destination: `${SOCKET.BALANCE_GAME.END}`,
    });
  };

  return (
    <>
      {roomStatus === ROOM_STATUS.RESULT && isRoomManager && (
        <Button
          className="w-full"
          onClick={handleEnterNextRound}
        >
          {round.currentRound === round.totalRounds
            ? '최종 결과 보기'
            : '다음 라운드로 이동'}
        </Button>
      )}
      {roomStatus === ROOM_STATUS.FINAL_RESULT && isRoomManager && (
        <Button
          className="w-full"
          onClick={handleMoveToWaitingRoom}
        >
          대기실로 이동
        </Button>
      )}
    </>
  );
};

export default BalanceGameControl;
