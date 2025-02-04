import { cn } from '@/lib/utils';
import useRoomStore from '@/store/useRoomStore';
import Image from 'next/image';
import { Button } from '../Button';
import { Edit } from 'lucide-react';
import useModalStore from '@/store/useModalStore';

interface UserInfoCardProps {
  name: string;
  isReady: boolean;
  fileName: string;
}

const UserInfoCard = ({ name, isReady, fileName }: UserInfoCardProps) => {
  const { myName } = useRoomStore();
  const { openModal } = useModalStore();

  const handleEditUserName = () => {
    openModal('CreateUserNameModal');
  };

  return (
    <section
      className={cn(
        isReady ? 'bg-primary/50' : 'bg-container',
        'w-full h-[4rem] flex rounded-lg'
      )}
    >
      <figure className="rounded-l-lg overflow-hidden w-[4rem] relative bg-white">
        <Image
          src={`/images/characters/${fileName}.webp`}
          alt="profile"
          fill={true}
        ></Image>
      </figure>
      <div className="w-[calc(100%-4rem)] pl-4 pr-1 flex items-center font-bold justify-between gap-1">
        <span className={cn(myName === name && 'text-primary-400')}>
          {name}
        </span>
        {name === myName && (
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
