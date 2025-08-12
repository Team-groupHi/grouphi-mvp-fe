/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import * as StompJS from '@stomp/stompjs';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { Chatting, Spinner } from '@/components';
import ErrorFallback from '@/components/ErrorBoundary/ErrorFallback';
import ErrorHandlingWrapper from '@/components/ErrorBoundary/ErrorHandlingWrapper';
import { GAME_TYPES } from '@/constants/form';
import { PATH } from '@/constants/router';
import { SOCKET } from '@/constants/websocket';
import { useFetchRoomDetail } from '@/hooks/queries';
import { useToast } from '@/hooks/useToast';
import { EnterRoomProps } from '@/hooks/useWebSocket';
import useRoomStore from '@/store/useRoomStore';
import { ChatMessage } from '@/types';
import { Player } from '@/types/api';
import { isDevelopment } from '@/utils/env';
import { gameToType } from '@/utils/form';

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

  const { myName, setHostName, gameId } = useRoomStore();

  const players: Player[] = roomDetail?.players || [];
  const isRoomManager = players.some(
    (player) => player.name === myName && player.isHost
  );
  const isSelfInPlayers =
    players.findIndex((user) => user.name === myName) !== -1;

  useEffect(() => {
    if (roomDetail.players.length > 0) {
      const host = roomDetail.players.filter((player) => player.isHost)[0];
      setHostName(host.name);
    }
  }, [roomDetail.players]);

  useEffect(() => {
    if (
      isRoomManager &&
      roomDetail.players.length === 1 &&
      roomDetail.status === 'PLAYING'
    ) {
      const gameType = gameToType(roomDetail.game.nameEn);
      switch (gameType) {
        case GAME_TYPES.BALANCE:
          sendMessage({
            destination: `${SOCKET.BALANCE_GAME.END}`,
          });
          break;
        case GAME_TYPES.QNA:
          sendMessage({
            destination: `${SOCKET.QNA_GAME.END}`,
          });
          break;
      }
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
      destination: `${SOCKET.ROOM.CHANGE_PLAYER_NAME}`,
      body: {
        name: myName,
      },
    });
  }, [myName]);

  useEffect(() => {
    sendMessage({
      destination: `${SOCKET.ROOM.CHANGE_GAME}`,
      body: {
        gameId,
      },
    });
  }, [gameId]);

  // @TODO: 더 선언적으로 error를 처리할 수 있는 방법 찾기
  useEffect(() => {
    if (isError) {
      throw error;
    }
  }, [isError]);

  // @TODO: 현재 방장이 닉네임 변경 시 제대로 반영이 되지 않아 여기서 무한로딩 발생
  if (!isSelfInPlayers) {
    return <Spinner />;
  }

  return (
    <section className="w-screen min-h-screen flex items-start gap-4 shrink-0 py-20">
      <UserList players={players} />
      <section className="flex flex-col gap-300 h-[calc(100vh-12rem)] min-h-[30rem] min-w-max max-w-[70rem] w-full rounded-lg">
        <ErrorHandlingWrapper
          fallbackComponent={ErrorFallback}
          suspenseFallback={<Spinner />}
        >
          <GamePanel
            game={roomDetail.game.nameEn}
            roomId={roomId}
            roomDetail={roomDetail}
            players={players}
            isRoomManager={isRoomManager}
            sendMessage={sendMessage}
          />
        </ErrorHandlingWrapper>
        {isDevelopment && (
          <aside
            className="ad-slot self-center text-center bg-black w-ads-leaderboard-wide h-ads-leaderboard rounded shrink-0"
            aria-label="광고 영역"
          >
            {/* TODO: 광고 붙이기 */}
            와이드 리더보드 광고 영역
          </aside>
        )}
      </section>

      <section className="flex flex-col h-[calc(100vh-12rem)] min-h-[30rem] w-[25vw] min-w-[18rem] max-w-[23rem] pr-10 gap-2">
        <Chatting
          myName={myName}
          chatMessages={chatMessages}
          sendMessage={sendMessage}
        />
        <RoomControl
          game={roomDetail.game.nameEn}
          isRoomManager={isRoomManager}
          sendMessage={sendMessage}
        />
      </section>
    </section>
  );
};

export default WaitingRoom;
