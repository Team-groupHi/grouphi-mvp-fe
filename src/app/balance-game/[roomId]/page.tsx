import Chatting from '@/components/Chatting';
import { CHAT_DUMMY, MY_NAME, USER_DUMMY } from './DUMMY';
import UserInfoCard from '@/components/UserInfoCard';

const WaitingRoom = () => {
  return (
    <section className="w-screen h-screen flex items-center justify-center px-10 gap-10 shrink-0">
      <section className="flex flex-col gap-3 h-4/5 max-w-[250px]">
        {USER_DUMMY.map((data, index) => (
          <UserInfoCard
            key={index}
            {...data}
          ></UserInfoCard>
        ))}
      </section>

      <section className="h-4/5 min-w-96 w-full max-w-[900px] bg-container/50 rounded-lg">
        s2
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
