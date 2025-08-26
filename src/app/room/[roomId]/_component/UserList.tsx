'use client';

import { Link } from 'lucide-react';

import { Button, UserInfoCard } from '@/components';
import { ROOM_STATUS } from '@/constants/room';
import { useToast } from '@/hooks/useToast';
import useRoomStore from '@/store/useRoomStore';
import { Player } from '@/types/api';

interface UserListProps {
  players: Player[];
}

const UserList = ({ players }: UserListProps) => {
  const { toast } = useToast();
  const { roomStatus } = useRoomStore();

  const handleLinkCopy = () => {
    const currentUrl = window.document.location.href;
    navigator.clipboard.writeText(currentUrl);
    toast({
      title: '클립보드에 복사되었어요!',
      duration: 1500,
    });
  };

  return (
    <section className="flex flex-col gap-3 h-[80vh] w-[14rem] min-w-[14rem] max-w-[15rem] relative ml-10">
      {roomStatus === ROOM_STATUS.IDLE && (
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
          isReady={player.isReady}
          isStart={roomStatus !== ROOM_STATUS.IDLE}
          fileName={player.avatar}
          isHost={player.isHost}
        />
      ))}
    </section>
  );
};

export default UserList;
