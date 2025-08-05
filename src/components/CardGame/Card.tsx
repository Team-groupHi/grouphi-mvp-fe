'use client';
import React, { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

export type CardState = 0 | 1 | 2;

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  cardState: CardState;
  myTeam: Exclude<CardState, 0>;
  opposingTeam: Exclude<CardState, 0>;
  width?: string | number;
  height?: string | number;
}

const Card = ({
  cardState,
  myTeam,
  opposingTeam,
  width = '3rem',
  height = '4rem',
  ...props
}: CardProps) => {
  const [isFlipped, setIsFlipped] = useState(cardState !== 0);

  const teamClass = {
    0: 'bg-container-600/70 hover:bg-container-700/90',
    1: 'bg-cardgame-a hover:bg-cardgame-a/90',
    2: 'bg-cardgame-b hover:bg-cardgame-b/90',
  };

  const defaultFaceClass = cn(
    'absolute w-full h-full backface-hidden rounded-sm flex justify-center items-center text-xl text-white font-bold'
  );
  const frontFaceClass = cn(
    cardState === 0
      ? teamClass[0]
      : cardState === opposingTeam
        ? teamClass[myTeam]
        : teamClass[opposingTeam]
  );
  const backFaceClass = cn(
    defaultFaceClass,
    'rotate-y-180',
    cardState === 0
      ? teamClass[myTeam]
      : cardState === opposingTeam
        ? teamClass[opposingTeam]
        : teamClass[myTeam]
  );

  useEffect(() => {
    setIsFlipped((prev) => !prev);
  }, [cardState]);

  return (
    <div
      className="perspective-1000 min-w-12"
      style={{ width, height }}
    >
      <div
        className={cn(
          'relative rounded-xl w-full h-full transform transform-3d transition-transform hover:cursor-pointer',
          isFlipped && 'rotate-y-180',
          props.className
        )}
        {...props}
      >
        <div
          className={cn(
            defaultFaceClass,
            cardState === 0 ? teamClass[0] : frontFaceClass
          )}
        />
        <div className={backFaceClass} />
      </div>
    </div>
  );
};

export default Card;
