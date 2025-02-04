import { Button, UserInfoCard } from '@/components';
import { useToast } from '@/hooks/useToast';
import useBalanceGameStore from '@/store/useBalanceGameStore';
import { Player } from '@/types/api';
import { Link } from 'lucide-react';

interface UserListProps {
  players: Player[];
  hostName: string;
}

const UserList = ({ players, hostName }: UserListProps) => {
  const { toast } = useToast();
  const { roomStatus } = useBalanceGameStore();

  const handleLinkCopy = () => {
    const currentUrl = window.document.location.href;
    navigator.clipboard.writeText(currentUrl);
    toast({
      title: '클립보드에 복사되었어요!',
      duration: 1500,
    });
  };

  return (
    <section className="flex flex-col gap-3 h-4/5 w-1/6 min-w-[15rem] max-w-[20rem] relative ml-10">
      {roomStatus === 'idle' && (
        <Button
          className="absolute -top-12 left-0"
          size={'sm'}
          variant={'secondary'}
          onClick={handleLinkCopy}
        >
          <Link />
          초대 링크 복사
        </Button>
      )}
      {players.map((data, index) => (
        <UserInfoCard
          key={index}
          name={data.name}
          isReady={roomStatus === 'idle' ? data.isReady : false}
          fileName={data.avatar}
          isHost={data.name === hostName}
        />
      ))}
    </section>
  );
};

export default UserList;
