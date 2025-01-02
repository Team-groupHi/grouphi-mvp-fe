import Chatting from '@/components/Chatting';
import { CHAT_DUMMY, MY_NAME, USER_DUMMY, GAME_INFO } from './DUMMY';
import UserInfoCard from '@/components/UserInfoCard';
import { GameListCard } from '@/components/GameListCard';
import { Button } from '@/components/Button';
import { Loader, Link, CheckCheck, MousePointer2 } from 'lucide-react';

const WaitingRoom = () => {
  // @TODO: 더미데이터를 활용한 로직이므로 추후에 소켓 연동 후 변경 필요
  const readyCount = USER_DUMMY.reduce(
    (count, { isReady }) => count + (isReady ? 1 : 0),
    0
  );
  const isAllReady = readyCount === USER_DUMMY.length;
  const isRoomManager = true;
  const isReady = false;

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
          variant={
            isRoomManager
              ? isAllReady
                ? 'default'
                : 'waiting'
              : isReady
                ? 'waiting'
                : 'default'
          }
        >
          {isRoomManager && isAllReady && (
            <div className="flex items-center justify-center gap-2">
              <CheckCheck />{' '}
              <span>
                게임 시작({readyCount}/{USER_DUMMY.length})
              </span>{' '}
            </div>
          )}
          {isRoomManager && !isAllReady && (
            <div className="flex items-center justify-center gap-2">
              <Loader />{' '}
              <span>
                준비 대기({readyCount}/{USER_DUMMY.length})
              </span>{' '}
            </div>
          )}
          {!isRoomManager && isReady && (
            <div className="flex items-center justify-center gap-2">
              <CheckCheck /> <span>준비 완료</span>
            </div>
          )}
          {!isRoomManager && !isReady && (
            <div className="flex items-center justify-center gap-2">
              <MousePointer2 /> <span>준비 하기</span>
            </div>
          )}
        </Button>
      </section>

      <section className="h-4/5 min-w-[15rem] max-w-[20rem]">
        <Chatting myName={MY_NAME}></Chatting>
      </section>
    </section>
  );
};

export default WaitingRoom;
