/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { ComponentType } from 'react';

import {
  AdBanner,
  Chatting,
  ErrorFallback,
  ErrorHandlingWrapper,
  GameActionButtons,
  Spinner,
  UserList,
} from '@/components';
import { GameControlEntry } from '@/constants/gameControlMap';
import { ChatMessage } from '@/types';
import { RoomResponse } from '@/types/api';
import { GameType } from '@/types/game';
import { GameControllerProps } from '@/types/props';
import { SendMessage } from '@/types/websocket';
import { isDevelopment } from '@/utils/env';

interface GameRoomViewProps {
  roomDetail: RoomResponse;
  roomId: string;
  myName: string;
  isRoomManager: boolean;
  sendMessage: SendMessage;
  chatMessages: ChatMessage[];
  GamePanel: ComponentType<GameControllerProps>;
  gameControl: GameControlEntry;
  gameType: GameType;
}

const GameRoomView = ({
  roomDetail,
  roomId,
  myName,
  isRoomManager,
  sendMessage,
  chatMessages,
  GamePanel,
  gameControl,
  gameType,
}: GameRoomViewProps) => {
  return (
    <section className="w-screen min-h-screen flex items-start justify-start 2xl:justify-center gap-4 shrink-0 py-20 overflow-y-hidden">
      <UserList players={roomDetail.players} />

      <section className="flex flex-col gap-300 h-[calc(100vh-12rem)] min-h-[30rem] max-w-[60%] min-w-max w-full rounded-lg shrink-0">
        <section className="bg-container/60 h-full rounded-lg">
          <ErrorHandlingWrapper
            fallbackComponent={ErrorFallback}
            suspenseFallback={<Spinner />}
          >
            <GamePanel
              roomId={roomId}
              roomDetail={roomDetail}
              isRoomManager={isRoomManager}
              sendMessage={sendMessage}
              gameType={gameType}
            />
          </ErrorHandlingWrapper>
        </section>
        {isDevelopment && (
          <AdBanner
            type="leaderboard"
            className="w-full"
          >
            리더보드 광고 영역
          </AdBanner>
        )}
      </section>

      <section className="flex flex-col h-[calc(100vh-12rem)] min-h-[30rem] w-[25vw] min-w-[16rem] max-w-[18rem] pr-9 gap-2">
        <Chatting
          myName={myName}
          chatMessages={chatMessages}
          sendMessage={sendMessage}
        />
        {isRoomManager && (
          <GameActionButtons
            gameControl={gameControl}
            sendMessage={sendMessage}
          />
        )}
      </section>
    </section>
  );
};

export default GameRoomView;
