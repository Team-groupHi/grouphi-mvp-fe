'use client';
import React, { useState } from 'react';

import { cn } from '@/lib/utils';

import Card from './Card';

interface CardGridProps extends React.HTMLAttributes<HTMLDivElement> {
  row: number;
  column: number;
  // @TODO: myTeam 값 연결하기
  myTeam: 1 | 2;
  cardSize?: { width: number | string; height: number | string };
}

const CardGrid = ({
  row,
  column,
  myTeam,
  cardSize,
  ...props
}: CardGridProps) => {
  const [cardStates, setCardStates] = useState<number[]>(
    Array(row * column).fill(0)
  );
  const gridClass = `grid grid-rows-${row} grid-cols-${column} gap-100`;

  const handleCardClick = (index: number) => {
    setCardStates((prev) => {
      const newStates = [...prev];
      newStates[index] = myTeam;
      return newStates;
    });
  };

  return (
    <div
      className={cn(gridClass, props.className)}
      {...props}
    >
      {cardStates.map((cardState, index) => (
        <Card
          key={index}
          width={cardSize?.width}
          height={cardSize?.height}
          cardState={cardState}
          onClick={() => handleCardClick(index)}
        />
      ))}
    </div>
  );
};

export default CardGrid;
