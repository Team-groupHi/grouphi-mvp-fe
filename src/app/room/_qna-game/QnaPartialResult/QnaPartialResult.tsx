'use client';

import { QnaGameResultGetResponse } from '@/types/api';

import QnaUserResult from './QnaUserResult';

interface QnaPartialResultProps {
  data: QnaGameResultGetResponse[];
}

const QnaPartialResult = ({ data }: QnaPartialResultProps) => {
  const { round, question, result } = data[0];

  return (
    <section className="h-4/5 min-w-max max-w-[70rem] w-full bg-container/50 rounded-lg">
      <section className="bg-container-600 h-full w-full min-h-fit border-white/50 flex flex-col rounded-lg p-8">
        <h1 className="pt-800 pb-600 text-h4 font-semibold text-center">
          {round} Round 결과
        </h1>
        <section className="qna-result px-700">
          <h3 className="text-title1 mb-500">Q. {question}</h3>
          <section className="flex flex-col gap-400">
            {result.map((result, index) => (
              <QnaUserResult
                key={result.name + index}
                result={result}
              />
            ))}
          </section>
        </section>
      </section>
    </section>
  );
};

export default QnaPartialResult;
