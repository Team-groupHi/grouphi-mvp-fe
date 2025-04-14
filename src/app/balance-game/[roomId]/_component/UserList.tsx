'use client';

import { Link } from 'lucide-react';

import { Button, UserInfoCard } from '@/components';
import { useToast } from '@/hooks/useToast';
import useBalanceGameStore from '@/store/useBalanceGameStore';
import { Player } from '@/types/api';

interface UserListProps {
  players: Player[];
}

const UserList = ({ players }: UserListProps) => {
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
      {players.map((player) => (
        <UserInfoCard
          key={player.name}
          name={player.name}
          isReady={roomStatus === 'idle' ? player.isReady : false}
          fileName={player.avatar}
          isHost={player.isHost}
        />
      ))}
    </section>
  );
};

export default UserList;
