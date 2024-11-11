import Input from '@/components/Input';

const Chatting = () => {
  return (
    <section className="">
      <section className="bg-container-600 rounded-t-lg h-full">
        <div className="rounded-t-lg bg-container-600 p-3">
          한나: 채팅어쩌공
          채팅어쩌공채팅어쩌공채팅어쩌공채팅어쩌공채팅어쩌공쩌공채팅어쩌공채팅어쩌공채팅어쩌공채팅어쩌공
        </div>
        <div className="bg-[rgb(50,228,208,0.2)] p-3">시스템 알림!</div>
        <div className="rounded-t-lg bg-container-600 p-3">
          한나: 채팅어쩌공
          채팅어쩌공채팅어쩌공채팅어쩌공채팅어쩌공채팅어쩌공쩌공채팅어쩌공채팅어쩌공채팅어쩌공채팅어쩌공
        </div>
        <div className="bg-[rgb(255,255,255,0.1)] p-3 text-primary-400">
          개울가의 나뭇잎: 나야나~
        </div>
        <div className="bg-container-600 p-3 text-primary-400">
          개울가의 나뭇잎: 나야나~
        </div>
      </section>
      <section className="bg-container-600 p-3 rounded-b-lg border-solid border-t-1 border-zinc-400">
        <Input
          className="bg-container-700 border-transparent"
          placeholder="엔터 키를 눌러 채팅 전송"
        ></Input>
      </section>
    </section>
  );
};

export default Chatting;
