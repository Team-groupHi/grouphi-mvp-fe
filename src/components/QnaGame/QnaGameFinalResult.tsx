'use client';

import { Heart } from 'lucide-react';

import { cn } from '@/lib/utils';
import { QnaGameResultGetResponse } from '@/types/api';
interface QnaGameFinalResultProps {
  results: QnaGameResultGetResponse[];
  className?: string;
}

const QnaGameFinalResult = ({
  results,
  className,
}: QnaGameFinalResultProps) => {
  if (!results || results.length === 0) {
    return (
      <div className="w-full text-center p-8">
        <p className="text-lg">엇, 무언가 잘못됐어요. 결과가 없어요..T_T</p>
      </div>
    );
  }

  return (
    <main
      className={cn(
        'bg-container-500 rounded-lg w-full h-full max-w-4xl overflow-hidden',
        className
      )}
    >
      <section className="h-full overflow-y-auto p-8 pr-6 rounded-lg space-y-6">
        <h4 className="text-center text-h4 mb-6">최종 결과</h4>

        {results.map((roundResult, index) => (
          <section key={`round-${roundResult.round}-${index}`}>
            <span className="text-title1">Q. {roundResult.question}</span>

            <div className="space-y-2 mt-2">
              {roundResult.result.length > 0 ? (
                roundResult.result
                  .sort((current, next) => next.likes - current.likes)
                  .map((item, itemIndex) => (
                    <div
                      key={`answer-${item.name}-${itemIndex}`}
                      className="flex items-center p-3 bg-primary/10 rounded-xl min-h-3"
                    >
                      <div className="flex flex-col items-center justify-center min-w-14">
                        <Heart className="w-6 h-6 fill-current text-secondary-500" />
                        <span className="text-title3">{item.likes}</span>
                      </div>

                      <div className="p-2 w-36">
                        <span className="text-body2 font-medium opacity-80 block">
                          {item.name}
                        </span>
                      </div>

                      <div className="text-secondary-500/70 mr-3 flex items-center self-stretch">
                        <div className="h-full w-px bg-gray-400/50" />
                      </div>

                      <div className="flex-1 min-w-44">
                        <span className="text-body1 text-base break-words whitespace-pre-wrap">
                          {item.answer}
                        </span>
                      </div>
                    </div>
                  ))
              ) : (
                <div className="p-3 bg-container-700/50 rounded-xl text-center">
                  <span className="text-base">
                    엇, 무언가 잘못됐어요. 결과가 없어요..T_T
                  </span>
                </div>
              )}
            </div>
          </section>
        ))}
      </section>
    </main>
  );
};

export default QnaGameFinalResult;
