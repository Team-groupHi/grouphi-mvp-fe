'use client';

import { Button } from '@/components';
import { SOCKET } from '@/constants/websocket';
import useBalanceGameStore from '@/store/useBalanceGameStore';
import * as StompJS from '@stomp/stompjs';

interface ManagerControlProps {
  isRoomManager: boolean;
  sendMessage: <T>(
    params: Omit<StompJS.IPublishParams, 'body'> & { body?: T }
  ) => void;
}

const RoomControl = ({ isRoomManager, sendMessage }: ManagerControlProps) => {
  const { roomStatus, round } = useBalanceGameStore();

  const handleEnterNextRound = async () => {
    sendMessage({
      destination: `${SOCKET.ENDPOINT.BALANCE_GAME.NEXT}`,
    });
  };

  const handleMoveToWaitingRoom = () => {
    sendMessage({
      destination: `${SOCKET.ENDPOINT.BALANCE_GAME.END}`,
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
