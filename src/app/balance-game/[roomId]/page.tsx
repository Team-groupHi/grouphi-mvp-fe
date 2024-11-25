import Chatting from '@/components/Chatting';
import { CHAT_DUMMY, MY_NAME, USER_DUMMY, GAME_INFO } from './DUMMY';
import UserInfoCard from '@/components/UserInfoCard';
import { GameListCard } from '@/components/GameListCard';
import { Button } from '@/components/Button';
import { Link } from 'lucide-react';

const WaitingRoom = () => {
  return (
    <section className="w-screen h-screen flex items-center justify-center px-10 gap-10 shrink-0">
      <section className="flex flex-col gap-3 h-4/5 max-w-[250px] relative">
        <Button
          className="absolute -top-12 right-0"
          size={'sm'}
          variant={'ghost'}
        >
          <Link />
          초대 링크 복사
        </Button>
        {USER_DUMMY.map((data, index) => (
          <UserInfoCard
            key={index}
            {...data}
          ></UserInfoCard>
        ))}
      </section>

      <section className="h-4/5 min-w-96 w-full max-w-[900px] flex flex-col justify-center items-center bg-container/50 rounded-lg gap-7">
        <span className="font-semibold">잠시 후 게임이 시작됩니다.</span>
        <GameListCard
          {...GAME_INFO}
          className="h-16"
        ></GameListCard>
        <Button
          className="text-base font-semibold"
          size="xl"
        >
          {`게임시작 (${USER_DUMMY.filter(({ isReady }) => isReady).length}/${USER_DUMMY.length})`}
        </Button>
      </section>

      <section className="h-4/5 w-96 min-w-52">
        <Chatting
          myName={MY_NAME}
          messages={CHAT_DUMMY}
        ></Chatting>
      </section>
    </section>
  );
};

export default WaitingRoom;
