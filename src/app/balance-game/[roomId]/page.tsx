'use client';

import {
  Button,
  Chatting,
  FinalResultChart,
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
import { BalanceGameResultGetResponse, Player } from '@/types/api';
import { useQueryClient } from '@tanstack/react-query';
import { Link } from 'lucide-react';
import { redirect, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import PrevGame from './PrevGame';
import BalanceGameProgress from '@/components/BalanceGameProgress';
import useBalanceGameStore from '@/store/useBalanceGameStore';
import { SOCKET } from '@/constants/websocket';
import { BarProps } from '@/components/FinalResultChart/Bar';
import useRoomStore from '@/store/useRoomStore';

const WaitingRoom = () => {
  const path = usePathname();
  const { roomStatus } = useBalanceGameStore();
  const roomId = path.split('/')[2];

  const { myName } = useRoomStore();
  const { openModal, closeModal } = useModalStore();
  const { connect, sendMessage, chatMessages } = useWebSocket();
  const { toast } = useToast();

  const { data: roomDetail, isError } = useFetchRoomDetail(roomId);
  const queryClient = useQueryClient();
  const players: Player[] = roomDetail?.players || [];

  const [result, setResult] = useState<BalanceGameResultGetResponse[]>([]);
  const [finalResult, setFinalResult] = useState<BarProps[]>([]);

  const isRoomManager = roomDetail?.hostName === myName;

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
    <section className="w-screen h-screen flex items-center justify-center px-10 gap-10 shrink-0">
      <section className="flex flex-col gap-3 h-4/5 min-w-[15rem] max-w-[20rem] relative">
        {roomStatus === 'idle' && (
          <Button
            className="absolute -top-12 left-0"
            size={'sm'}
            variant={'secondary'}
            onClick={handleLinkCopy}
          >
            <Link />
            초대 링크 복사
          </Button>
        )}
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
            isRoomManager={isRoomManager}
            sendMessage={sendMessage}
          />
        )}
        {roomStatus === 'progress' && (
          <BalanceGameProgress
            sendMessage={sendMessage}
            setResult={setResult}
            setFinalResult={setFinalResult}
            roomId={roomId}
          />
        )}
        {roomStatus === 'result' && result.length !== 0 && (
          <PartialResultChart data={result} />
        )}
        {roomStatus === 'finalResult' && finalResult.length !== 0 && (
          <FinalResultChart data={finalResult} />
        )}
      </section>

      <section className="flex flex-col h-4/5 min-w-[15rem] max-w-[20rem]">
        <Chatting
          myName={myName}
          chatMessages={chatMessages}
          sendMessage={sendMessage}
        />
        {roomStatus === 'result' && isRoomManager && (
          <Button
            className="w-full"
            onClick={handleEnterNextRound}
          >
            다음 라운드로 이동
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
      </section>
    </section>
  );
};

export default WaitingRoom;
