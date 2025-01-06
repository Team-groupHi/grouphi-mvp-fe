'use client';

import { GameListCard, UserInfoCard, Chatting, Button } from '@/components';
import {
  Loader,
  Link,
  CheckCheck,
  MousePointer2,
  SlidersHorizontal,
} from 'lucide-react';
import { redirect, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import useModalStore from '@/store/useModalStore';
import { useWebSocket } from '@/hooks/useWebSocket';
import useRoomStore from '@/store/useRoomStore';
import { Player } from '@/types/api';
import { useQueryClient } from '@tanstack/react-query';
import useFetchRoomDetail from '@/hooks/useFetchRoomDetail';
import { QUERYKEY } from '@/constants/querykey';
import { PATH } from '@/constants/router';
import { SOCKET } from '@/constants/websocket';

const WaitingRoom = () => {
  const path = usePathname();
  const roomId = path.split('/')[2];

  const { openModal, closeModal } = useModalStore();
  const { myName } = useRoomStore();
  const { connect, sendMessage, chatMessages } = useWebSocket();

  const { data: roomDetail, isError } = useFetchRoomDetail(roomId);
  const queryClient = useQueryClient();
  const players: Player[] = roomDetail?.players || [];

  if (isError) {
    //@TODO: 추후에 에러 시 홈으로 유도해주는 페이지 개발 후 해당 주소로 리다이렉트
    closeModal();
    redirect(PATH.HOME);
  }

  useEffect(() => {
    if (!myName) {
      openModal('CreateUserNameModal');
    } else {
      connect({ roomId, name: myName });
      queryClient.invalidateQueries({
        queryKey: [QUERYKEY.ROOM_DETAIL],
      });
    }
  }, [myName]);

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

  //@TODO: roomDetail이 없는 경우에는 스피너 컴포넌트 적용
  if (!myName || !roomDetail) {
    return;
  }

  return (
    <section className="w-screen h-screen flex items-center justify-center px-10 gap-10 shrink-0">
      <section className="flex flex-col gap-3 h-4/5 min-w-[15rem] max-w-[20rem] relative">
        <Button
          className="absolute -top-12 left-0"
          size={'sm'}
          variant={'secondary'}
        >
          <Link />
          초대 링크 복사
        </Button>
        {players.map((data, index) => (
          <UserInfoCard
            key={index}
            {...data}
            //@TODO: players에 프로필 사진 정보 오도록 변경되면 여기도 수정하기
            fileName="blue"
          ></UserInfoCard>
        ))}
      </section>

      <section className="h-4/5 min-w-[45rem] max-w-[70rem] w-full flex flex-col justify-center items-center bg-container/50 rounded-lg gap-7">
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
              className="text-base font-semibold w-[12rem]"
              size="xl"
              onClick={handleGameStart}
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

      <section className="h-4/5 min-w-[15rem] max-w-[20rem]">
        <Chatting
          myName={myName}
          chatMessages={chatMessages}
          sendMessage={sendMessage}
        ></Chatting>
      </section>
    </section>
  );
};

export default WaitingRoom;
