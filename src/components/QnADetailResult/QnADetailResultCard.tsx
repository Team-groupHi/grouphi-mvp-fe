'use client';
import { HeartIcon } from 'lucide-react';
import { useState } from 'react';

import { Input } from '@/components';
import { cn } from '@/lib/utils';
import { theme } from '@/styles/theme';

interface QnADetailResultCardProps {
  nickname: string;
  answer: string;
}

const QnADetailResultCard = ({
  nickname,
  answer,
}: QnADetailResultCardProps) => {
  const [isLike, setIsLike] = useState(false);

  const handleClickHeart = () => {
    setIsLike(() => !isLike);
  };

  return (
    <>
      <section className="flex gap-400">
        <div className="nickame-card flex justify-center items-center text-title3 nickname-card w-[15rem] bg-gradient-purple rounded-lg">
          {nickname}
        </div>
        <Input
          value={answer}
          readOnly
        />
        <div
          className="heart-icon flex items-center cursor-pointer"
          onClick={handleClickHeart}
        >
          <HeartIcon
            className={cn(isLike ? 'text-secondary-500' : 'text-light')}
            fill={isLike ? theme.colors.secondary[500] : 'none'}
          />
        </div>
      </section>
    </>
  );
};

export default QnADetailResultCard;
