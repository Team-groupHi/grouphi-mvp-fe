import Chatting from '@/components/Chatting';
import { CHAT_DUMMY, MY_NAME, USER_DUMMY, GAME_INFO } from './DUMMY';
import UserInfoCard from '@/components/UserInfoCard';
import { GameListCard } from '@/components/GameListCard';
import { Button } from '@/components/Button';
import { Loader, Link, CheckCheck } from 'lucide-react';

const WaitingRoom = () => {
  const readyCount = USER_DUMMY.filter(({ isReady }) => isReady).length;
  const isAllReady = readyCount === USER_DUMMY.length;

  return (
    <section className="w-screen h-screen flex items-center justify-center px-10 gap-10 shrink-0">
      <section className="flex flex-col gap-3 h-4/5 min-w-[15rem] max-w-[20rem] relative">
        <Button
          className="absolute -top-12 left-0"
          size={'sm'}
          variant={'secondary'}
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

      <section className="h-4/5 min-w-[45rem] max-w-[70rem] w-full flex flex-col justify-center items-center bg-container/50 rounded-lg gap-7">
        <span className="font-semibold">잠시 후 게임이 시작됩니다.</span>
        <GameListCard
          {...GAME_INFO}
          className="h-16"
        ></GameListCard>
        <Button
          className="text-base font-semibold"
          size="xl"
          variant={isAllReady ? 'default' : 'waiting'}
        >
          {isAllReady ? <CheckCheck /> : <Loader />}
          {`${isAllReady ? '게임 시작' : '준비 대기'} (${readyCount}/${USER_DUMMY.length})`}
        </Button>
      </section>

      <section className="h-4/5 min-w-[15rem] max-w-[20rem]">
        <Chatting
          myName={MY_NAME}
          messages={CHAT_DUMMY}
        ></Chatting>
      </section>
    </section>
  );
};

export default WaitingRoom;
