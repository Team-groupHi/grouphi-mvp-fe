import { Button, GameListCard } from '@/components';
import { SOCKET } from '@/constants/websocket';
import { useToast } from '@/hooks/useToast';
import useBalanceGameStore from '@/store/useBalanceGameStore';
import useRoomStore from '@/store/useRoomStore';
import { Player, RoomGetResponse } from '@/types/api';
import * as StompJS from '@stomp/stompjs';
import {
  CheckCheck,
  Loader,
  MousePointer2,
  SlidersHorizontal,
} from 'lucide-react';

interface PrevGameProps {
  roomDetail: RoomGetResponse;
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
  const { setRoomStatus, round } = useBalanceGameStore();
  const { myName } = useRoomStore();

  const { toast } = useToast();

  const isReady = players.find((player) => player.name === myName)?.isReady;
  const readyCount = players.reduce(
    (count, { isReady }) => count + (isReady ? 1 : 0),
    0
  );
  const isAllReady = readyCount === players.length;

  const handleUnready = () => {
    sendMessage({
      destination: `${SOCKET.ENDPOINT.ROOM.UNREADY}`,
    });
  };

  const handleReady = () => {
    sendMessage({
      destination: `${SOCKET.ENDPOINT.ROOM.READY}`,
    });
  };

  const handleGameStart = () => {
    if (roomDetail.players.length === 1) {
      toast({
        title: '2명 이상 모여야 게임을 시작할 수 있어요!',
        description:
          '왼쪽 위 친구 초대 버튼을 눌러 같이 할 친구를 초대해보세요.',
      });
    } else {
      sendMessage({
        destination: `${SOCKET.ENDPOINT.BALANCE_GAME.START}`,
        body: {
          //@TODO: 추후에 테마 추가시 변경
          theme: 'GENERAL',
          totalRounds: round.totalRounds,
        },
      });
      setRoomStatus('progress');
    }
  };

  const handleGameChange = () => {
    //@TODO: 게임 변경 모달 띄워주기
  };

  return (
    <section className="w-full h-full flex flex-col justify-center items-center gap-7 px-900">
      <span className="font-semibold">잠시 후 게임이 시작됩니다.</span>
      <GameListCard
        title={roomDetail.game.nameKr}
        description={roomDetail.game.descriptionKr}
        src={roomDetail.game.thumbnailUrl}
        className="h-16 pointer-events-none"
      ></GameListCard>

      <section className="flex flex-col gap-2">
        {isRoomManager && isAllReady && (
          <Button
            className="text-base font-semibold w-[12rem]"
            size="xl"
            onClick={handleGameStart}
          >
            <div className="flex items-center justify-center gap-2">
              <CheckCheck />
              <span>
                게임 시작({readyCount}/{players.length})
              </span>
            </div>
          </Button>
        )}
        {isRoomManager && !isAllReady && (
          <Button
            className="text-base font-semibold w-[12rem] pointer-events-none"
            size="xl"
            variant={'waiting'}
          >
            <div className="flex items-center justify-center gap-2">
              <Loader />
              <span>
                준비 대기중({readyCount}/{players.length})
              </span>
            </div>
          </Button>
        )}
        {isRoomManager && (
          <Button
            variant={'secondary'}
            className="text-base font-semibold w-[12rem]"
            size="xl"
            onClick={handleGameChange}
          >
            <div className="flex items-center justify-center gap-2">
              <SlidersHorizontal />
              <span>게임 변경</span>
            </div>
          </Button>
        )}
      </section>

      {!isRoomManager && isReady && (
        <Button
          className="text-base font-semibold w-[12rem]"
          size="xl"
          variant={'waiting'}
          onClick={handleUnready}
        >
          <div className="flex items-center justify-center gap-2">
            <CheckCheck />
            <span>준비 완료</span>
          </div>
        </Button>
      )}
      {!isRoomManager && !isReady && (
        <Button
          className="text-base font-semibold w-[12rem]"
          size="xl"
          onClick={handleReady}
        >
          <div className="flex items-center justify-center gap-2">
            <MousePointer2 /> <span>준비 하기</span>
          </div>
        </Button>
      )}
    </section>
  );
};

export default PrevGame;
