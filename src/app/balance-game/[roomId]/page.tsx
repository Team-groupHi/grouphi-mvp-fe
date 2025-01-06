'use client';

import { UserInfoCard, Chatting, Button } from '@/components';
import { Link } from 'lucide-react';
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
import PrevGame from './PrevGame';

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
          />
        ))}
      </section>

      <section className="h-4/5 min-w-[45rem] max-w-[70rem] w-full bg-container/50 rounded-lg">
        <PrevGame
          roomDetail={roomDetail}
          players={players}
          sendMessage={sendMessage}
        />
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
