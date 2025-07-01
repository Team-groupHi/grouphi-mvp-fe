'use client';
import React, { useState } from 'react';

import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  initialValue?: boolean;
  width?: string | number;
  height?: string | number;
}

const Card = ({
  initialValue = false,
  width = '6rem',
  height = '8rem',
  ...props
}: CardProps) => {
  const [flipped, setFlipped] = useState(initialValue);
  const defaultFaceClass =
    'absolute w-full h-full backface-hidden rounded-lg flex justify-center items-center text-xl text-white font-bold';

  return (
    <div
      className="perspective-1000"
      style={{ width, height }}
    >
      <div
        className={cn(
          'relative rounded-xl w-full h-full transform transform-3d transition-transform hover:cursor-pointer',
          flipped ? 'rotate-y-180' : '',
          props.className
        )}
        onClick={() => setFlipped(!flipped)}
        {...props}
      >
        <div
          className={cn(
            defaultFaceClass,
            'card-front bg-cardgame-a hover:bg-cardgame-a/90'
          )}
        />
        <div
          className={cn(
            defaultFaceClass,
            'card-back bg-cardgame-b rotate-y-180 hover:bg-cardgame-b/90'
          )}
        />
      </div>
    </div>
  );
};

export default Card;
