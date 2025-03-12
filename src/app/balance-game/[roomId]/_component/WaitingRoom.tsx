/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import * as StompJS from '@stomp/stompjs';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { Chatting, Spinner } from '@/components';
import { PATH } from '@/constants/router';
import { SOCKET } from '@/constants/websocket';
import useFetchRoomDetail from '@/hooks/useFetchRoomDetail';
import { useToast } from '@/hooks/useToast';
import { EnterRoomProps } from '@/hooks/useWebSocket';
import useRoomStore from '@/store/useRoomStore';
import { ChatMessage } from '@/types';
import { Player } from '@/types/api';

import GamePanel from './GamePanel';
import RoomControl from './RoomControl';
import UserList from './UserList';
interface WaitingRoomProps {
  connect: (params: EnterRoomProps) => void;
  chatMessages: ChatMessage[];
  sendMessage: <T>(
    params: Omit<StompJS.IPublishParams, 'body'> & { body?: T }
  ) => void;
}

const WaitingRoom = ({
  connect,
  chatMessages,
  sendMessage,
}: WaitingRoomProps) => {
  const path = usePathname();
  const router = useRouter();
  const roomId = path.split('/')[2];

  const { toast } = useToast();

  const { data: roomDetail, error, isError } = useFetchRoomDetail(roomId);

  const { myName } = useRoomStore();

  const players: Player[] = roomDetail?.players || [];
  const isRoomManager = roomDetail?.hostName === myName;
  const isSelfInPlayers =
    roomDetail?.players.findIndex((user) => user.name === myName) !== -1;

  useEffect(() => {
    if (
      isRoomManager &&
      roomDetail.players.length == 1 &&
      roomDetail.status === 'PLAYING'
    ) {
      sendMessage({
        destination: `${SOCKET.ENDPOINT.BALANCE_GAME.END}`,
      });
      toast({
        title: '최소 인원 수가 부족해 게임을 종료하고 대기실로 이동합니다.',
      });
    }
  }, [isRoomManager, roomDetail]);

  useEffect(() => {
    if (roomDetail && !isSelfInPlayers) {
      if (roomDetail.status === 'PLAYING') {
        toast({
          title: '게임이 이미 시작되었어요! 게임이 끝나면 다시 들어와주세요.',
        });
        router.push(PATH.HOME);
      } else {
        if (!isError && myName !== '') {
          // @TODO: 조금 더 근본적인 해결책 찾기
          setTimeout(() => {
            connect({ roomId, name: myName });
          });
        }
      }
    }
  }, [myName, roomDetail]);

  useEffect(() => {
    //@TODO: 방장이 준비 상태에서 변경 시 receive 값이 없는 현상 확인 필요
    sendMessage({
      destination: `${SOCKET.ENDPOINT.ROOM.CHANGE_PLAYER_NAME}`,
      body: {
        name: myName,
      },
    });
  }, [myName]);

  // @TODO: 더 선언적으로 error를 처리할 수 있는 방법 찾기
  useEffect(() => {
    if (isError) {
      console.log(error);
      throw error;
    }
  }, [isError]);

  // @TODO: 현재 방장이 닉네임 변경 시 제대로 반영이 되지 않아 여기서 무한로딩 발생
  if (!isSelfInPlayers) {
    return <Spinner />;
  }

  return (
    <section className="w-screen h-screen flex items-center gap-10 shrink-0">
      <UserList
        players={players}
        hostName={roomDetail.hostName}
      />

      <GamePanel
        roomId={roomId}
        roomDetail={roomDetail}
        players={players}
        isRoomManager={isRoomManager}
        sendMessage={sendMessage}
      />

      <section className="flex flex-col h-4/5 w-1/4 min-w-[18rem] max-w-[23rem] pr-10 gap-2">
        <Chatting
          myName={myName}
          chatMessages={chatMessages}
          sendMessage={sendMessage}
        />
        <RoomControl
          isRoomManager={isRoomManager}
          sendMessage={sendMessage}
        />
      </section>
    </section>
  );
};

export default WaitingRoom;
