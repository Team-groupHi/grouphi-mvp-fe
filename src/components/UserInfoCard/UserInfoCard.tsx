import Image from 'next/image';
//@TODO: 이미지 불러오는 방식 추후 결정
import example from '@/app/assets/profile_test.png';

interface UserInfoCardProps {
  name: string;
  isReady: boolean;
}

const UserInfoCard = ({ name, isReady }: UserInfoCardProps) => {
  return (
    <section
      className={`${isReady ? 'bg-primary/50' : 'bg-container'} w-[250px] h-[65px] flex rounded-lg`}
    >
      <figure className="rounded-l-lg overflow-hidden">
        <Image
          src={example}
          alt="profile"
          width={65}
          height={65}
        ></Image>
      </figure>
      <div className="px-5 flex items-center font-bold">
        <span>{name}</span>
      </div>
    </section>
  );
};

export default UserInfoCard;
