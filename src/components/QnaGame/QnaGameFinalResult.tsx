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
  const [page, setPage] = useState(1);
  const roundResult = results[page - 1];

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

        <section>
          <span className="text-title1">Q. {roundResult.question}</span>

          <section className="space-y-2 mt-2">
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
        </section>

        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() => setPage(Math.max(1, page - 1))}
              />
            </PaginationItem>

            {results.map((result, index) => (
              <PaginationItem key={result.round}>
                <PaginationLink
                  href="#"
                  onClick={() => setPage(result.round)}
                  isActive={page == result.round}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={() => setPage(Math.min(results.length, page + 1))}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </section>
    </main>
  );
};

export default QnaGameFinalResult;
