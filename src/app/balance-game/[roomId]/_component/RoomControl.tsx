'use client';

import * as StompJS from '@stomp/stompjs';

import { Button } from '@/components';
import { SOCKET } from '@/constants/websocket';
import useBalanceGameStore from '@/store/useBalanceGameStore';

interface ManagerControlProps {
  isRoomManager: boolean;
  sendMessage: <T>(
    params: Omit<StompJS.IPublishParams, 'body'> & { body?: T }
  ) => void;
}

const RoomControl = ({ isRoomManager, sendMessage }: ManagerControlProps) => {
  const { roomStatus, round } = useBalanceGameStore();

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
      {roomStatus === 'result' && isRoomManager && (
        <Button
          className="w-full"
          onClick={handleEnterNextRound}
        >
          {round.currentRound === round.totalRounds
            ? '최종 결과 보기'
            : '다음 라운드로 이동'}
        </Button>
      )}
      {roomStatus === 'finalResult' && isRoomManager && (
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

export default RoomControl;
