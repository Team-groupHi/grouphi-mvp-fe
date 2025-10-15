/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import * as StompJS from '@stomp/stompjs';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { Spinner } from '@/components';
import { PATH } from '@/constants/router';
import { SOCKET } from '@/constants/websocket';
import { useFetchRoomDetail } from '@/hooks/queries';
import { useToast } from '@/hooks/useToast';
import { EnterRoomProps } from '@/hooks/useWebSocket';
import useRoomStore from '@/store/useRoomStore';
import { ChatMessage } from '@/types';

import GameRoomView from './GameRoomView';

interface GameRoomControllerProps {
  connect: (params: EnterRoomProps) => void;
  sendMessage: <T>(
    params: Omit<StompJS.IPublishParams, 'body'> & { body?: T }
  ) => void;
  chatMessages: ChatMessage[];
}

const GameRoomController = ({
  connect,
  sendMessage,
  chatMessages,
}: GameRoomControllerProps) => {
  const path = usePathname();
  const router = useRouter();
  const roomId = path.split('/')[2];

  const { toast } = useToast();

  const { data: roomDetail, error, isError } = useFetchRoomDetail(roomId);

  const { myName, setHostName, gameId } = useRoomStore();

  const isRoomManager = roomDetail.players.some(
    (player) => player.name === myName && player.isHost
  );
  const isSelfInPlayers =
    roomDetail.players.findIndex((user) => user.name === myName) !== -1;

  const gameType = gameToType(roomDetail.game.nameEn || '');

  useEffect(() => {
    if (!gameType) {
      toast({
        variant: 'destructive',
        title: `${roomDetail.game.nameKr}은 지원하지 않는 게임 타입이에요.`,
      });
      router.push(PATH.HOME);
    }
  }, [gameType, roomDetail.game.nameKr, router, toast]);

  useEffect(() => {
    if (roomDetail.players.length > 0) {
      const host = roomDetail.players.find((player) => player.isHost);
      if (host) {
        setHostName(host.name);
      }
    }
  }, [roomDetail.players, setHostName]);

  useEffect(() => {
    if (!isSelfInPlayers) {
      if (roomDetail.status === 'PLAYING') {
        toast({
          title: '게임이 이미 시작되었어요! 게임이 끝나면 다시 들어와주세요.',
        });
        router.push(PATH.HOME);
      } else {
        if (!isError && myName !== '') {
          connect({ roomId, name: myName });
        }
      }
    }
  }, [myName, roomDetail]);

  useEffect(() => {
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

  if (!isSelfInPlayers) {
    return <Spinner />;
  }

  const GamePanel = GAME_COMPONENT_MAP[gameType];
  const gameControl = GAME_CONTROL_MAP[gameType];

  return (
    <GameRoomView
      roomDetail={roomDetail}
      roomId={roomId}
      myName={myName}
      isRoomManager={isRoomManager}
      sendMessage={sendMessage}
      chatMessages={chatMessages}
      GamePanel={GamePanel}
      gameControl={gameControl}
      gameType={gameType}
    />
  );
};

export default GameRoomController;
