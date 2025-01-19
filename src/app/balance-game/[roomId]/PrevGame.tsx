import { GameListCard, Button } from '@/components';
import { SOCKET } from '@/constants/websocket';
import useRoomStore from '@/store/useRoomStore';
import { Player, RoomGetResponse } from '@/types/api';
import {
  CheckCheck,
  Loader,
  SlidersHorizontal,
  MousePointer2,
} from 'lucide-react';
import * as StompJS from '@stomp/stompjs';

interface PrevGameProps {
  roomDetail: RoomGetResponse;
  players: Player[];
  sendMessage: <T>(
    params: Omit<StompJS.IPublishParams, 'body'> & { body?: T }
  ) => void;
}

const PrevGame = ({ roomDetail, players, sendMessage }: PrevGameProps) => {
  const { myName } = useRoomStore();

  const isRoomManager = roomDetail?.hostName === myName;
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
    sendMessage({
      destination: `${SOCKET.ENDPOINT.BALANCE_GAME.START}`,
      body: {
        theme: 'GENERAL',
        totalRounds: 10,
      },
    });
    //@TODO: 중앙 컴포넌트 게임 화면으로 바꿔주기
  };

  const handleGameChange = () => {
    //@TODO: 게임 변경 모달 띄워주기
  };

  return (
    <section className="w-full h-full flex flex-col justify-center items-center gap-7">
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
              <CheckCheck />{' '}
              <span>
                게임 시작({readyCount}/{players.length})
              </span>{' '}
            </div>
          </Button>
        )}
        {isRoomManager && !isAllReady && (
          <Button
            className="text-base font-semibold w-[12rem]"
            size="xl"
            variant={'waiting'}
          >
            <div className="flex items-center justify-center gap-2">
              <Loader />{' '}
              <span>
                준비 대기({readyCount}/{players.length})
              </span>{' '}
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
              <SlidersHorizontal /> <span>게임 변경</span>
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
            <CheckCheck /> <span>준비 완료</span>
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
