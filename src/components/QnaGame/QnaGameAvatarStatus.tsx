import Image from 'next/image';

import { cn } from '@/lib/utils';

interface QnaGameAvatarStatusProps {
  color: string;
  alt?: string;
  isSelected?: boolean;
}

const QnaGameAvatarStatus = ({
  color,
  alt = 'avatar',
  isSelected = false,
}: QnaGameAvatarStatusProps) => {
  return (
    <div
      className={cn(
        'w-20 h-20 flex items-center justify-center rounded-full bg-container-700',
        isSelected && 'border-3 border-primary-500'
      )}
    >
      <Image
        src={`/images/characters/${color}.webp`}
        alt={alt}
        width={60}
        height={60}
        className="object-contain select-none"
        draggable={false}
        priority
      />
    </div>
  );
};

export default QnaGameAvatarStatus;
