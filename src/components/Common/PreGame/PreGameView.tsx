import {
  CheckCheck,
  Loader,
  MousePointer2,
  SlidersHorizontal,
} from 'lucide-react';
import { MutableRefObject } from 'react';

import { Button, GameListCard, TotalRoundsForm } from '@/components';
import { cn } from '@/lib/utils';
import { RoomResponse } from '@/types/api';
import { GameType } from '@/types/game';
import { isDevelopment } from '@/utils/env';

interface PreGameViewProps {
  roomDetail: RoomResponse;
  isRoomManager: boolean;
  gameType: GameType;
  totalRoundsRef: MutableRefObject<number>;
  myName: string;
  isReady: boolean;
  readyCount: number;
  isAllReady: boolean;
  handleGameStart: () => void;
  handleGameChange: () => void;
  handleReady: () => void;
  handleUnready: () => void;
}

const PreGameView = ({
  roomDetail,
  isRoomManager,
  gameType,
  totalRoundsRef,
  readyCount,
  isAllReady,
  isReady,
  handleGameStart,
  handleGameChange,
  handleReady,
  handleUnready,
}: PreGameViewProps) => {
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
                      게임 시작({readyCount}/{roomDetail.players.length})
                    </span>
                  </>
                ) : (
                  <>
                    <Loader />
                    <span>
                      준비 대기중({readyCount}/{roomDetail.players.length})
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

export default PreGameView;
