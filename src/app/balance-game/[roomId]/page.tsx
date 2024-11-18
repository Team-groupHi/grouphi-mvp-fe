'use client';
import { usePathname } from 'next/navigation';

const BalanceGameRoomPage = () => {
  const path = usePathname();
  const roomId = path.split('/')[2];

  return <div>BalanceGame의 {roomId}번 RoomPage입니다.</div>;
};

export default BalanceGameRoomPage;
