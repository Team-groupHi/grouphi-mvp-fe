/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import * as StompJS from '@stomp/stompjs';
import {
  CheckCheck,
  Loader,
  MousePointer2,
  SlidersHorizontal,
} from 'lucide-react';
import { useRef } from 'react';

import { Button, GameListCard } from '@/components';
import { GAME_QUESTIONS_COUNT, GAME_TYPES } from '@/constants/form';
import { MODAL_TYPE } from '@/constants/modal';
import { SOCKET } from '@/constants/websocket';
import useThrottleReadyHandlers from '@/hooks/useThrottleHandlers';
import { useToast } from '@/hooks/useToast';
import { cn } from '@/lib/utils';
import useModalStore from '@/store/useModalStore';
import useRoomStore from '@/store/useRoomStore';
import { Player, RoomResponse } from '@/types/api';
import { isDevelopment } from '@/utils/env';
import { gameToType } from '@/utils/form';

import TotalRoundsForm from './TotalRoundsForm';

interface PrevGameProps {
  roomDetail: RoomResponse;
  players: Player[];
  isRoomManager: boolean;
  sendMessage: <T>(
    params: Omit<StompJS.IPublishParams, 'body'> & { body?: T }
  ) => void;
}

const PrevGame = ({
  roomDetail,
  players,
  sendMessage,
  isRoomManager,
}: PrevGameProps) => {
  const gameType = gameToType(roomDetail.game.nameEn);
  const totalRoundsRef = useRef<number>(GAME_QUESTIONS_COUNT[gameType].MIN);

  const { myName } = useRoomStore();
  const { openModal } = useModalStore();

  const { toast } = useToast();
  const { handleReady, handleUnready } = useThrottleReadyHandlers(sendMessage);

  const isReady = players.find((player) => player.name === myName)?.isReady;
  const readyCount = players.reduce(
    (count, { isReady }) => count + (isReady ? 1 : 0),
    0
  );
  const isAllReady = readyCount === players.length;

  const handleGameStart = () => {
    if (roomDetail.players.length === 1) {
      toast({
        title: '2명 이상 모여야 게임을 시작할 수 있어요!',
        description:
          '왼쪽 위 친구 초대 버튼을 눌러 같이 할 친구를 초대해보세요.',
      });
      return;
    }

    switch (gameType) {
      case GAME_TYPES.BALANCE:
        sendMessage({
          destination: `${SOCKET.BALANCE_GAME.START}`,
          body: {
            theme: roomDetail.game.nameEn
              .split(' ')[0]
              .toUpperCase()
              .replace('COMPREHENSIVE', 'ALL'),
            totalRounds: totalRoundsRef.current,
          },
        });
        break;
      case GAME_TYPES.QNA:
        sendMessage({
          destination: `${SOCKET.QNA_GAME.START}`,
          body: {
            totalRounds: totalRoundsRef.current,
          },
        });
        break;
    }
  };

  const handleGameChange = () => {
    openModal(MODAL_TYPE.CHANGE_GAME, roomDetail.game.id);
  };

  return (
    <section className="bg-container/60 h-full flex flex-col justify-center items-center gap-7 p-800 rounded-lg">
      <span className="font-semibold">잠시 후 게임이 시작됩니다.</span>
      <GameListCard
        title={roomDetail.game.nameKr}
        description={roomDetail.game.descriptionKr}
        src={roomDetail.game.thumbnailUrl}
        className="min-w-80 max-w-80 2xl:max-w-96 pointer-events-none"
      />
      <section className="flex flex-col gap-2 w-full items-center">
        {isRoomManager && (
          <>
            <TotalRoundsForm
              totalRoundsRef={totalRoundsRef}
              gameType={gameType}
            />
            <Button
              className={cn(
                'text-base font-semibold w-[12rem]',
                !isAllReady && 'pointer-events-none'
              )}
              size="xl"
              variant={
                isAllReady && roomDetail.players.length !== 1
                  ? 'default'
                  : 'waiting'
              }
              onClick={handleGameStart}
            >
              <div className="flex items-center justify-center gap-2">
                {isAllReady ? (
                  <>
                    <CheckCheck />
                    <span>
                      게임 시작({readyCount}/{players.length})
                    </span>
                  </>
                ) : (
                  <>
                    <Loader />
                    <span>
                      준비 대기중({readyCount}/{players.length})
                    </span>
                  </>
                )}
              </div>
            </Button>

            {isDevelopment && (
              <Button
                variant={'secondary'}
                className="text-base font-semibold w-[12rem] flex items-center justify-center gap-2"
                size="xl"
                onClick={handleGameChange}
              >
                <SlidersHorizontal />
                <span>게임 변경</span>
              </Button>
            )}
          </>
        )}
      </section>

      {!isRoomManager && (
        <Button
          className="text-base font-semibold w-[12rem]"
          size="xl"
          variant={isReady ? 'waiting' : 'default'}
          onClick={isReady ? handleUnready : handleReady}
        >
          <div className="flex items-center justify-center gap-2">
            {isReady ? (
              <>
                <CheckCheck />
                <span>준비 완료</span>
              </>
            ) : (
              <>
                <MousePointer2 />
                <span>준비 하기</span>
              </>
            )}
          </div>
        </Button>
      )}
    </section>
  );
};

export default PrevGame;
