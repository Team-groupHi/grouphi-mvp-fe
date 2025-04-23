'use client';
import { HeartIcon } from 'lucide-react';
import { useState } from 'react';

import { Input } from '@/components';
import { cn } from '@/lib/utils';
import { theme } from '@/styles/theme';
import { QnaGameResult } from '@/types/api';

interface QnaUserResultProps {
  result: QnaGameResult;
  onLike: (receiver: string) => void;
  onUnlike: (receiver: string) => void;
}

const QnaUserResult = ({ result, onLike, onUnlike }: QnaUserResultProps) => {
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
      <section className="nickame-card flex justify-center items-center text-title2 nickname-card w-xl bg-gradient-purple rounded-lg">
        {name}
      </section>
      <Input
        className="text-base bg-white text-dark border-2 border-gray-400"
        value={answer}
        readOnly
      />
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

export default QnaUserResult;
