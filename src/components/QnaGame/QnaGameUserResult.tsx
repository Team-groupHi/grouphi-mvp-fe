'use client';
import { HeartIcon } from 'lucide-react';
import { useState } from 'react';

import { cn } from '@/lib/utils';
import { theme } from '@/styles/theme';
import { QnaGameAnswerResponse } from '@/types/api';

interface QnaGameUserResultProps {
  result: QnaGameAnswerResponse;
  onLike: (receiver: string) => void;
  onUnlike: (receiver: string) => void;
}

const QnaGameUserResult = ({
  result,
  onLike,
  onUnlike,
}: QnaGameUserResultProps) => {
  const { name, answer } = result;
  const [isLike, setIsLike] = useState(false);

  const handleClickHeart = () => {
    if (isLike) {
      onUnlike(name);
    } else {
      onLike(name);
    }

    setIsLike(() => !isLike);
  };

  return (
    <section className="flex gap-400">
      <section className="nickame-card flex justify-center items-center text-title3 nickname-card min-w-[14rem] p-2 bg-container-400 rounded-lg">
        {name}
      </section>
      <section className="flex items-center w-full max-w-[42rem] line-clamp-2 px-3 py-1 rounded-md border border-gray-400 border-input bg-white text-dark text-base shadow-sm">
        {answer}
      </section>
      <section
        className="heart-icon flex items-center cursor-pointer"
        onClick={handleClickHeart}
      >
        <HeartIcon
          className={cn(isLike ? 'text-secondary-500' : 'text-light')}
          fill={isLike ? theme.colors.secondary[500] : 'none'}
        />
      </section>
    </section>
  );
};

export default QnaGameUserResult;
