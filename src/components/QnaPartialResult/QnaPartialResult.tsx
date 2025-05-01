'use client';

import * as StompJS from '@stomp/stompjs';

import { SOCKET } from '@/constants/websocket';
import { QnaGameResultGetResponse } from '@/types/api';

import QnaUserResult from './QnaUserResult';

interface QnaPartialResultProps {
  data: QnaGameResultGetResponse[];
  sendMessage: <T>(
    params: Omit<StompJS.IPublishParams, 'body'> & { body?: T }
  ) => void;
}

const QnaPartialResult = ({ data, sendMessage }: QnaPartialResultProps) => {
  const { round, question, result } = data[0];

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
    <section className="flex items-center bg-container-600 h-full w-full min-h-fit border-white/50 flex flex-col rounded-lg p-8">
      <h1 className="pt-600 pb-500 text-h4 font-semibold text-center">
        {round} Round 결과
      </h1>
      <section className="qna-result px-700">
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
    </section>
  );
};

export default QnaPartialResult;
