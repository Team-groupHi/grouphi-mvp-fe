'use client';

import {
  Button,
  Chatting,
  PartialResultChart,
  Spinner,
  UserInfoCard,
} from '@/components';
import { QUERYKEY } from '@/constants/querykey';
import { PATH } from '@/constants/router';
import useFetchRoomDetail from '@/hooks/useFetchRoomDetail';
import { useToast } from '@/hooks/useToast';
import { useWebSocket } from '@/hooks/useWebSocket';
import useModalStore from '@/store/useModalStore';
import useRoomStore from '@/store/useRoomStore';
import { Player } from '@/types/api';
import { useQueryClient } from '@tanstack/react-query';
import { Link } from 'lucide-react';
import { redirect, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import PrevGame from './PrevGame';
import BalanceGameProgress from '@/components/BalanceGameProgress';
import useBalanceGameStore from '@/store/useBalanceGameStore';

// 현재 상태를 가지고 있어야 함.

const DUMMY_PARTIAL_DATA = [
  {
    round: 1,
    q: '내가 더 좋아하는 동물은?',
    a: '고양이',
    b: '강아지',
    result: {
      a: ['스코티시', '길다길다길길다길다길길다길다길', '페르시안', '집사'],
      b: ['치와와', '길다길다길길다길다길길다길다길', '포메라니안', '백구'],
      c: ['선택못함', '길다길다길길다길다길길다길다길', '자유로운 영혼'],
    },
  },
];
const WaitingRoom = () => {
  const path = usePathname();
  const { roomStatus } = useBalanceGameStore();
  const roomId = path.split('/')[2];

  const { openModal, closeModal } = useModalStore();
  const { myName } = useRoomStore();
  const { connect, sendMessage, chatMessages } = useWebSocket();
  const { toast } = useToast();

  const { data: roomDetail, isError } = useFetchRoomDetail(roomId);
  const queryClient = useQueryClient();
  const players: Player[] = roomDetail?.players || [];

  useEffect(() => {
    if (!myName) {
      openModal('CreateUserNameModal');
    } else {
      connect({ roomId, name: myName });
      queryClient.invalidateQueries({
        queryKey: [QUERYKEY.ROOM_DETAIL],
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myName]);

  if (isError) {
    //@TODO: 추후에 에러 시 홈으로 유도해주는 페이지 개발 후 해당 주소로 리다이렉트
    closeModal();
    redirect(PATH.HOME);
  }

  const handleLinkCopy = () => {
    const currentUrl = window.document.location.href;
    navigator.clipboard.writeText(currentUrl);
    toast({
      title: '클립보드에 복사되었어요!',
      duration: 1500,
    });
  };

  if (!myName || !roomDetail) {
    return <Spinner />;
  }

  return (
    <section className="w-screen h-screen flex items-center justify-center px-10 gap-10 shrink-0">
      <section className="flex flex-col gap-3 h-4/5 min-w-[15rem] max-w-[20rem] relative">
        <Button
          className="absolute -top-12 left-0"
          size={'sm'}
          variant={'secondary'}
          onClick={handleLinkCopy}
        >
          <Link />
          초대 링크 복사
        </Button>
        {players.map((data, index) => (
          <UserInfoCard
            key={index}
            {...data}
            fileName={data.avatar}
          />
        ))}
      </section>

      <section className="h-4/5 min-w-[45rem] max-w-[70rem] w-full bg-container/50 rounded-lg">
        {roomStatus === 'idle' && (
          <PrevGame
            roomDetail={roomDetail}
            players={players}
            sendMessage={sendMessage}
          />
        )}
        {roomStatus === 'progress' && (
          <BalanceGameProgress sendMessage={sendMessage} />
        )}
        {roomStatus === 'result' && (
          <PartialResultChart data={DUMMY_PARTIAL_DATA} />
        )}
        {roomStatus === 'finalResult' && <div>finalResult</div>}
      </section>

      <section className="h-4/5 min-w-[15rem] max-w-[20rem]">
        <Chatting
          myName={myName}
          chatMessages={chatMessages}
          sendMessage={sendMessage}
        />
      </section>
    </section>
  );
};

export default WaitingRoom;
