'use client';
import React from 'react';

import { cn } from '@/lib/utils';

export type CardState = 0 | 1 | 2;

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  cardState: CardState;
  width?: string | number;
  height?: string | number;
}

const Card = ({
  cardState,
  width = '3rem',
  height = '4rem',
  ...props
}: CardProps) => {
  const isFlipped = cardState !== 0;

  const defaultFaceClass =
    'absolute w-full h-full backface-hidden rounded-sm flex justify-center items-center text-xl text-white font-bold';
  const backFaceStyle = cn(
    defaultFaceClass,
    'rotate-y-180',
    cardState === 1
      ? 'bg-cardgame-a hover:bg-cardgame-a/90'
      : cardState === 2
        ? 'bg-cardgame-b hover:bg-cardgame-b/90'
        : 'bg-container-600/70 hover:bg-container-700/90'
  );

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
            'bg-container-600/70 hover:bg-container-700/90'
          )}
        />
        <div className={backFaceStyle} />
      </div>
    </div>
  );
};

export default Card;
