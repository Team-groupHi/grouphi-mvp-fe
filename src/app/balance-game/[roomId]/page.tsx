'use client';

import {
  GameListCard,
  ToastAction,
  UserInfoCard,
  Chatting,
  Button,
} from '@/components';
import { Loader, Link, CheckCheck, MousePointer2 } from 'lucide-react';
import { redirect, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import useModalStore from '@/store/useModalStore';
import { useWebSocket } from '@/hooks/useWebSocket';
import useRoomStore from '@/store/useRoomStore';
import { Player } from '@/types/api';
import { useQueryClient } from '@tanstack/react-query';
import useFetchRoomDetail from '@/hooks/useFetchRoomDetail';
import { QUERYKEY } from '@/constants/querykey';
import { useToast } from '@/hooks/useToast';
import { PATH } from '@/constants/router';
import { SOCKET } from '@/constants/websocket';

const WaitingRoom = () => {
  const path = usePathname();
  const roomId = path.split('/')[2];

  const { openModal, closeModal } = useModalStore();
  const { myName } = useRoomStore();
  const { connect, sendMessage } = useWebSocket();
  const { toast } = useToast();

  const { data: roomDetail, isError, error } = useFetchRoomDetail(roomId);
  const queryClient = useQueryClient();
  const players: Player[] = roomDetail?.players || [];

  if (isError) {
    console.log(error);
    //@TODO: 리다이렉트 되느라 토스트 메세지가 보이지 않는 문제 해결방법 찾기
    setTimeout(() => {
      toast({
        title: '방이 폭파되었습니다!',
        description:
          '방장이 존재하지 않아 방이 폭파되었어요! 새로운 방을 만들어 입장해주세요.',
        variant: 'destructive',
        action: <ToastAction altText="close">닫기</ToastAction>,
      });
    }, 5000);

    closeModal();
    redirect(PATH.HOME);
  }

  useEffect(() => {
    if (!myName) {
      openModal(`CreateUserNameModal`);
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
          className="h-16"
        ></GameListCard>

        {isRoomManager && isAllReady && (
          <Button
            className="text-base font-semibold"
            size="xl"
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
            className="text-base font-semibold"
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
        {!isRoomManager && isReady && (
          <Button
            className="text-base font-semibold"
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
            className="text-base font-semibold"
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
        <Chatting myName={myName}></Chatting>
      </section>
    </section>
  );
};

export default WaitingRoom;
