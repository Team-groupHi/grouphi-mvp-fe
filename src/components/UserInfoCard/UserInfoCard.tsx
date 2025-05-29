import { Edit } from 'lucide-react';
import Image from 'next/image';

import { MODAL_TYPE } from '@/constants/modal';
import { cn } from '@/lib/utils';
import useModalStore from '@/store/useModalStore';
import useRoomStore from '@/store/useRoomStore';

import { Button } from '../Button';

interface UserInfoCardProps {
  name: string;
  isReady: boolean;
  isStart: boolean;
  isHost: boolean;
  fileName: string;
}

const UserInfoCard = ({
  name,
  isReady,
  isStart,
  isHost,
  fileName,
}: UserInfoCardProps) => {
  const { myName } = useRoomStore();
  const { openModal } = useModalStore();

  const handleEditUserName = () => {
    openModal(MODAL_TYPE.CREATE_USERNAME);
  };

  return (
    <section
      className={cn(
        isReady ? 'bg-primary/50' : 'bg-container',
        isStart && 'bg-container',
        'w-full h-[4rem] flex rounded-lg relative'
      )}
    >
      {isHost && (
        <section className="w-[1.8rem] h-[1.8rem] absolute -top-4 -left-4 z-10 drop-shadow-sm-dark">
          <Image
            src={`/images/crown.png`}
            alt="crown"
            width={29}
            height={29}
            priority
          />
        </section>
      )}
      <figure className="rounded-l-lg overflow-hidden w-[4rem] relative bg-white">
        <Image
          src={`/images/characters/${fileName}.webp`}
          alt="profile"
          width={64}
          height={64}
          priority
        />
      </figure>
      <div className="w-[calc(100%-4rem)] pl-4 pr-1 flex items-center font-bold justify-between gap-1">
        <span className={cn(myName === name && 'text-primary-400')}>
          {name}
        </span>
        {name === myName && !isReady && (
          <Button
            variant="ghost"
            size="icon"
            onClick={handleEditUserName}
          >
            <Edit />
          </Button>
        )}
      </div>
    </section>
  );
};

export default UserInfoCard;
