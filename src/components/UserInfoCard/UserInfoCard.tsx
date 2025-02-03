import Image from 'next/image';

interface UserInfoCardProps {
  name: string;
  isReady: boolean;
  isHost: boolean;
  fileName: string;
}

const UserInfoCard = ({
  name,
  isReady,
  isHost,
  fileName,
}: UserInfoCardProps) => {
  return (
    <section
      className={`${isReady ? 'bg-primary/50' : 'bg-container'} w-full h-[4rem] flex rounded-lg relative`}
    >
      {isHost && (
        <section className="w-[1.8rem] h-[1.8rem] absolute -top-4 -left-4 z-10 drop-shadow-sm-dark">
          <Image
            src={`/images/crown.png`}
            alt="crown"
            fill={true}
          />
        </section>
      )}
      <figure className="rounded-l-lg overflow-hidden w-[4rem] relative bg-white">
        <Image
          src={`/images/characters/${fileName}.webp`}
          alt="profile"
          fill={true}
        />
      </figure>
      <div className="w-3/4 px-5 flex items-center font-bold">
        <span>{name}</span>
      </div>
    </section>
  );
};

export default UserInfoCard;
