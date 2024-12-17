import Image from 'next/image';

interface UserInfoCardProps {
  name: string;
  isReady: boolean;
  fileName: string;
}

const UserInfoCard = ({ name, isReady, fileName }: UserInfoCardProps) => {
  return (
    <section
      className={`${isReady ? 'bg-primary/50' : 'bg-container'} w-full h-[4rem] flex rounded-lg`}
    >
      <figure className="rounded-l-lg overflow-hidden w-[4rem] relative bg-white">
        <Image
          src={`/images/characters/${fileName}.png`}
          alt="profile"
          fill={true}
        ></Image>
      </figure>
      <div className="px-5 flex items-center font-bold">
        <span>{name}</span>
      </div>
    </section>
  );
};

export default UserInfoCard;
