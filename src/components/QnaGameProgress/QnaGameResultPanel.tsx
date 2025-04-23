'use client';

import { Heart } from 'lucide-react';

import { cn } from '@/lib/utils';

export interface QnaGameResultItem {
  name: string;
  answer: string;
  likes: number;
}

export interface QnaGameRoundResult {
  round: number;
  question: string;
  result: QnaGameResultItem[];
}

interface QnaGameResultPanelProps {
  results: QnaGameRoundResult[];
  className?: string;
}

const QnaGameResultPanel = ({
  results,
  className,
}: QnaGameResultPanelProps) => {
  if (!results || results.length === 0) {
    return (
      <div className="w-full text-center p-8">
        <p className="text-lg">결과가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className={cn('w-full max-w-4xl mx-auto space-y-6', className)}>
      <h2 className="text-center text-2xl font-bold mb-6">최종 결과</h2>

      {results.map((roundResult, index) => (
        <div
          key={`round-${roundResult.round}-${index}`}
          className="rounded-xl overflow-hidden"
        >
          <div className="bg-container-700/80 p-4 rounded-t-xl">
            <p className="text-lg font-medium">Q. {roundResult.question}</p>
          </div>

          <div className="space-y-2 mt-2">
            {roundResult.result
              .sort((current, next) => next.likes - current.likes)
              .map((item, itemIndex) => (
                <div
                  key={`answer-${item.name}-${itemIndex}`}
                  className="flex items-center p-3 bg-container-700/50 rounded-xl"
                >
                  <div className="flex flex-col items-center justify-center min-w-14 mr-3">
                    <div className="text-secondary-500">
                      <Heart className="w-6 h-6 fill-current" />
                    </div>
                    <span className="text-sm font-semibold">{item.likes}</span>
                  </div>

                  <div className="mr-3 min-w-20">
                    <span className="text-sm font-medium opacity-80">
                      {item.name}
                    </span>
                  </div>

                  <div className="flex-1">
                    <p className="text-base break-words whitespace-pre-wrap">
                      {item.answer}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default QnaGameResultPanel;
