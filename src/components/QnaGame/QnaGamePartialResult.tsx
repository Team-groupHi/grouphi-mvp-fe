'use client';

import * as StompJS from '@stomp/stompjs';

import { SOCKET } from '@/constants/websocket';
import useQnaGameStore from '@/store/useQnaGameStore';
import { QnaGameResultGetResponse } from '@/types/api';

import QnaUserResult from './QnaGameUserResult';

interface QnaGamePartialResultProps {
  data: QnaGameResultGetResponse[];
  sendMessage: <T>(
    params: Omit<StompJS.IPublishParams, 'body'> & { body?: T }
  ) => void;
}

const QnaGamePartialResult = ({
  data,
  sendMessage,
}: QnaGamePartialResultProps) => {
  const { round, question, result } = data[0];
  const { round: storeRound } = useQnaGameStore();

  const handleClickLike = (receiver: string) => {
    sendMessage({
      destination: `${SOCKET.QNA_GAME.LIKE}`,
      body: {
        round,
        receiver,
      },
    });
  };

  const handleClickUnlike = (receiver: string) => {
    sendMessage({
      destination: `${SOCKET.QNA_GAME.UNLIKE}`,
      body: {
        round,
        receiver,
      },
    });
  };

  return (
    <section className="flex items-center bg-container-600 h-full w-full min-h-fit border-white/50 flex-col rounded-lg p-8">
      <h1 className="pt-600 pb-500 text-h4 font-semibold text-center">
        {round} Round 결과
      </h1>
      <section className="qna-result px-700 h-4/5">
        <h3 className="text-title1 mb-500">Q. {question}</h3>
        <section className="flex flex-col gap-400">
          {result.map((result, index) => (
            <QnaUserResult
              key={result.name + index}
              result={result}
              onLike={handleClickLike}
              onUnlike={handleClickUnlike}
            />
          ))}
        </section>
      </section>
      <section className="text-sm text-light font-semibold">
        {round} / {storeRound.totalRounds}
      </section>
    </section>
  );
};

export default QnaGamePartialResult;
