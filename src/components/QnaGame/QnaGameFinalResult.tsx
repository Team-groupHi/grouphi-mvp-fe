'use client';

import { useState } from 'react';

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components';
import { cn } from '@/lib/utils';
import { QnaGameResultGetResponse } from '@/types/api';

import QnaGameUserFinalResult from './QnaGameUserFinalResult';
interface QnaGameFinalResultProps {
  results: QnaGameResultGetResponse[];
  className?: string;
}

const QnaGameFinalResult = ({
  results,
  className,
}: QnaGameFinalResultProps) => {
  const [round, setRound] = useState(1);
  const roundResult = results[round - 1];

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
        'bg-container-500 rounded-lg w-full h-full overflow-hidden',
        className
      )}
    >
      <section className="flex flex-col h-full p-6 rounded-lg gap-3">
        <h4 className="text-center text-h4">최종 결과 - {round} 라운드</h4>

        <span className="text-title1">Q. {roundResult.question}</span>

        <section className="h-full space-y-2 overflow-y-auto">
          {roundResult.result.length > 0 ? (
            roundResult.result
              .sort((current, next) => next.likes - current.likes)
              .map((item, itemIndex) => (
                <QnaGameUserFinalResult
                  key={`answer-${item.name}-${itemIndex}`}
                  user={item}
                />
              ))
          ) : (
            <div className="p-3 bg-container-700/50 rounded-xl text-center">
              <span className="text-base">
                엇, 무언가 잘못됐어요. 결과가 없어요..T_T
              </span>
            </div>
          )}
        </section>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() => setRound(Math.max(1, round - 1))}
              />
            </PaginationItem>

            {results.map((result, index) => (
              <PaginationItem key={result.round}>
                <PaginationLink
                  href="#"
                  onClick={() => setRound(result.round)}
                  isActive={round == result.round}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={() => setRound(Math.min(results.length, round + 1))}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </section>
    </main>
  );
};

export default QnaGameFinalResult;
