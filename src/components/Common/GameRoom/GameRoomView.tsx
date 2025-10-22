/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import * as StompJS from '@stomp/stompjs';

import {
  AdBanner,
  Chatting,
  ErrorFallback,
  ErrorHandlingWrapper,
  GameActionButtons,
  GamePanel,
  Spinner,
  UserList,
} from '@/components';
import { ChatMessage } from '@/types';
import { RoomResponse } from '@/types/api';
import { isDevelopment } from '@/utils/env';

interface GameRoomViewProps {
  roomDetail: RoomResponse;
  roomId: string;
  myName: string;
  isRoomManager: boolean;
  sendMessage: <T>(
    params: Omit<StompJS.IPublishParams, 'body'> & { body?: T }
  ) => void;
  chatMessages: ChatMessage[];
}

const GameRoomView = ({
  roomDetail,
  roomId,
  myName,
  isRoomManager,
  sendMessage,
  chatMessages,
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
              game={roomDetail.game.nameEn}
              roomId={roomId}
              roomDetail={roomDetail}
              isRoomManager={isRoomManager}
              sendMessage={sendMessage}
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
        <GameActionButtons
          game={roomDetail.game.nameEn}
          isRoomManager={isRoomManager}
          sendMessage={sendMessage}
        />
      </section>
    </section>
  );
};

export default GameRoomView;
