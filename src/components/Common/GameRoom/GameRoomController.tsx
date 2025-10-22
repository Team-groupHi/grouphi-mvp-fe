/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { Spinner } from '@/components';
import { GAME_COMPONENT_MAP } from '@/constants/gameComponentMap';
import { GAME_CONTROL_MAP } from '@/constants/gameControlMap';
import { PATH } from '@/constants/router';
import { useFetchRoomDetail } from '@/hooks/queries';
import { useToast } from '@/hooks/useToast';
import { EnterRoomProps } from '@/hooks/useWebSocket';
import useRoomStore from '@/store/useRoomStore';
import useSocketStore from '@/store/useSocketStore';
import { ChatMessage } from '@/types';
import { SendMessage } from '@/types/websocket';
import { gameToType } from '@/utils/gameToType';

import GameRoomView from './GameRoomView';

interface GameRoomControllerProps {
  connect: (params: EnterRoomProps) => void;
  sendMessage: SendMessage;
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

  const { data: roomDetail, isError } = useFetchRoomDetail(roomId);

  const { myName, setHostName } = useRoomStore();
  const { setSendMessage } = useSocketStore();

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
    if (sendMessage) {
      setSendMessage(sendMessage);
    }
  }, [sendMessage]);

  useEffect(() => {
    if (roomDetail.players.length > 0) {
      const host = roomDetail.players.find((player) => player.isHost);
      if (host) {
        setHostName(host.name);
      }
    }
  }, [roomDetail.players]);

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

  if (!isSelfInPlayers || !gameType) {
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
