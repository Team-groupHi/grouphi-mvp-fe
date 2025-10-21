'use client';
import { Plus, Repeat } from 'lucide-react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';

import { Button } from '@/components';
import { PATH } from '@/constants/router';
import { cn } from '@/lib/utils';

interface gameListCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  src?: string | null;
  className?: string;
}

const GameListCard = ({
  title,
  description,
  src,
  className,
  ...props
}: gameListCardProps) => {
  const [isHover, setIsHover] = useState(false);
  const pathname = usePathname();

  const containerDefaultClassName =
    'basis-1/3 min-w-48 max-w-64 2xl:min-w-72 2xl:max-w-80 min-h-fit aspect-[3/2] relative bg-primary-container shadow rounded-md overflow-hidden';

  return (
    <article
      data-testid="gamelistcard-container"
      className={cn(containerDefaultClassName, className)}
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
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <p className="text-light font-semibold truncate pb-400">{title}</p>
        {isHover ? (
          <Button className="mt-50 hover:bg-primary">
            {pathname === PATH.HOME ? (
              <>
                <Plus /> 생성하기
              </>
            ) : (
              <>
                <Repeat /> 변경하기
              </>
            )}
          </Button>
        ) : (
          description && (
            // todo: 메인, 대기실 css 구분하기
            <p
              className={cn(
                'font-light text-sm text-gray-300 break-all',
                pathname === PATH.HOME
                  ? 'overflow-hidden text-ellipsis line-clamp-4'
                  : ''
              )}
            >
              {pathname === PATH.HOME
                ? description.split('\n')[0]
                : description}
            </p>
          )
        )}
      </section>
    </article>
  );
};

export default GameListCard;
