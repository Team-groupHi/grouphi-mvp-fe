import Image from 'next/image';

import { cn } from '@/lib/utils';
interface ItemProps {
  avatar?: string;
  sender: string;
  content: string;
  index: number;
  type: 'system' | 'me' | 'others';
}

const Item = ({ avatar, sender, content, index, type }: ItemProps) => {
  return (
    <div
      className={cn(
        'p-3',
        index === 0 && 'rounded-tl-lg',
        type === 'system'
          ? 'bg-primary/20'
          : index % 2 === 0
            ? 'bg-container-600'
            : 'bg-white/10',
        type !== 'others' && 'text-primary-400'
      )}
    >
      {type == 'system' ? (
        <span className="font-semibold break-words">{content}</span>
      ) : (
        <div className="flex flex-wrap items-center gap-1">
          {avatar && (
            <Image
              src={`/images/characters/${avatar}.webp`}
              alt={`${sender}의 아바타`}
              width={20}
              height={20}
              className="object-contain select-none flex-shrink-0"
              draggable={false}
            />
          )}

          <span className="font-semibold flex-shrink-0">{sender}</span>
          <span className="flex-shrink-0">{`:`}</span>
          <span className="break-all hyphens-auto min-w-0">{content}</span>
        </div>
      )}
    </div>
  );
};

export default Item;
