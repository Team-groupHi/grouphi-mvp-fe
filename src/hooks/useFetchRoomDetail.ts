import { useSuspenseQuery } from '@tanstack/react-query';

import { QUERYKEY } from '@/constants/querykey';
import { getBalanceGameResults } from '@/services/balanceGames';
import { getRoomDetail } from '@/services/rooms';

export const useFetchRoomDetail = (roomId: string) => {
  return useSuspenseQuery({
    queryKey: [QUERYKEY.ROOM_DETAIL],
    queryFn: () => getRoomDetail(roomId),
  });
};

export const useFetchBalanceGameResults = ({
  roomId,
  round,
}: {
  roomId: string;
  round: number | undefined;
}) => {
  return useSuspenseQuery({
    queryKey: [QUERYKEY.BALANCE_GAME_RESULTS],
    queryFn: () => getBalanceGameResults({ roomId, round }),
  });
};
