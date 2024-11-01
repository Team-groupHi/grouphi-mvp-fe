'use client';
import Image from 'next/image';
import React from 'react';

interface gameListCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  src?: string;
  onClick?: () => void;
}

const GameListCard = ({
  title,
  description,
  src,
  onClick,
  ...props
}: gameListCardProps) => {
  return (
    <article
      className={`basis-1/3 max-w-80 min-w-60 relative bg-primary-container shadow rounded-md overflow-hidden`}
      onClick={onClick}
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
      <section>{description && <p>{description}</p>}</section>
    </article>
  );
};

export default GameListCard;
