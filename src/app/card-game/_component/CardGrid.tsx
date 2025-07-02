'use client';
import React from 'react';

import { cn } from '@/lib/utils';

import Card from './Card';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  row: number;
  column: number;
  cardSize?: { width: number | string; height: number | string };
}

const CardGrid = ({ row = 3, column = 3, cardSize, ...props }: CardProps) => {
  const initialCards = Array.from({ length: row * column }, () => 0);

  const gridClass = `grid grid-rows-${row} grid-cols-${column}`;

  return (
    <div
      className={cn(gridClass, 'gap-100', props.className)}
      {...props}
    >
      {initialCards.map((_, index) => (
        <Card
          key={index}
          width={cardSize?.width}
          height={cardSize?.height}
          // todo: myTeam 값 연결하기
          myTeam={1}
        />
      ))}
    </div>
  );
};

export default CardGrid;
