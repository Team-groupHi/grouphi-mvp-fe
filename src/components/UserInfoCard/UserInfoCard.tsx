import { cn } from '@/lib/utils';
import useRoomStore from '@/store/useRoomStore';
import Image from 'next/image';

interface UserInfoCardProps {
  name: string;
  isReady: boolean;
  fileName: string;
}

const UserInfoCard = ({ name, isReady, fileName }: UserInfoCardProps) => {
  const { myName } = useRoomStore();

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
      <div className="w-3/4 px-5 flex items-center font-bold">
        <span className={cn(myName === name && 'text-primary-400')}>
          {name}
        </span>
      </div>
    </section>
  );
};

export default UserInfoCard;
