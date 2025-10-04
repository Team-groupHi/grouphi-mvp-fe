/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import * as StompJS from '@stomp/stompjs';
import { useRef } from 'react';

import { GAME_QUESTIONS_COUNT } from '@/constants/form';
import { MODAL_TYPE } from '@/constants/modal';
import useThrottleReadyHandlers from '@/hooks/useThrottleHandlers';
import { useToast } from '@/hooks/useToast';
import useModalStore from '@/store/useModalStore';
import useRoomStore from '@/store/useRoomStore';
import { RoomResponse } from '@/types/api';
import { gameStartHandlers } from '@/utils/gameStartHandlers';
import { gameToType } from '@/utils/gameToType';

import PreGameView from './PreGameView';

interface PreGameControllerProps {
  roomDetail: RoomResponse;
  isRoomManager: boolean;
  sendMessage: <T>(
    params: Omit<StompJS.IPublishParams, 'body'> & { body?: T }
  ) => void;
}

const PreGameController = ({
  roomDetail,
  sendMessage,
  isRoomManager,
}: PreGameControllerProps) => {
  const gameType = gameToType(roomDetail.game.nameEn);
  const totalRoundsRef = useRef<number>(
    gameType ? GAME_QUESTIONS_COUNT[gameType].MIN : 10
  );

  const { myName } = useRoomStore();
  const { openModal } = useModalStore();

  const { toast } = useToast();
  const { handleReady, handleUnready } = useThrottleReadyHandlers(sendMessage);

  const isReady =
    roomDetail.players.find((player) => player.name === myName)?.isReady ||
    false;
  const readyCount = roomDetail.players.reduce(
    (count, { isReady }) => count + (isReady ? 1 : 0),
    0
  );
  const isAllReady = readyCount === roomDetail.players.length;

  const handleGameStart = () => {
    if (roomDetail.players.length === 1) {
      toast({
        title: '2명 이상 모여야 게임을 시작할 수 있어요!',
        description:
          '왼쪽 위 친구 초대 버튼을 눌러 같이 할 친구를 초대해보세요.',
      });
      return;
    }

    const startGameHandler = gameType ? gameStartHandlers[gameType] : null;

    if (startGameHandler) {
      startGameHandler({
        sendMessage,
        roomDetail,
        totalRounds: totalRoundsRef.current,
      });
    }
  };

  const handleGameChange = () => {
    openModal(MODAL_TYPE.CHANGE_GAME, roomDetail.game.id);
  };

  if (!gameType) {
    return null;
  }

  return (
    <PreGameView
      roomDetail={roomDetail}
      isRoomManager={isRoomManager}
      gameType={gameType}
      totalRoundsRef={totalRoundsRef}
      myName={myName}
      isReady={isReady}
      readyCount={readyCount}
      isAllReady={isAllReady}
      handleGameStart={handleGameStart}
      handleGameChange={handleGameChange}
      handleReady={handleReady}
      handleUnready={handleUnready}
    />
  );
};

export default PreGameController;
