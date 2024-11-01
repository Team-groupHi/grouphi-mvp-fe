'use client';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import React from 'react';

interface gameListCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  src?: string;
  className?: string;
}

const GameListCard = ({
  title,
  description,
  src,
  className,
  ...props
}: gameListCardProps) => {
  const containerClassName =
    'basis-1/3 max-w-80 min-w-60 min-h-52 relative bg-primary-container shadow rounded-md overflow-hidden';
  return (
    <article
      data-testid="gamelistcard-container"
      className={
        className ? cn(containerClassName, className) : containerClassName
      }
      {...props}
    >
      {src && (
        <Image
          src={src}
          alt={title}
          fill
          style={{ objectFit: 'cover' }}
          className="absolute"
        />
      )}
      <section
        className={`relative place-content-center margin-auto h-full p-600 bg-gradient-transparent-black rounded-md z-10 hover:bg-black/30 hover:cursor-pointer`}
      >
        <p className="text font-semibold truncate">{title}</p>
        {description && (
          <p
            className={`font-light text-sm text-gray-300 pt-2 overflow-hidden text-ellipsis line-clamp-2 break-all`}
          >
            {description}
          </p>
        )}
      </section>
    </article>
  );
};

export default GameListCard;
