import { QUERYKEY } from '@/constants/querykey';
import { getBalanceGameResults } from '@/services/balanceGames';
import { getRoomDetail } from '@/services/rooms';
import { useQuery } from '@tanstack/react-query';

export const useFetchRoomDetail = (roomId: string) => {
  return useQuery({
    queryKey: [QUERYKEY.ROOM_DETAIL],
    queryFn: () => getRoomDetail(roomId),
    enabled: !!roomId,
  });
};

export const useFetchParticalResult = ({
  roomId,
  round,
}: {
  roomId: string;
  round: number;
}) => {
  return useQuery({
    queryKey: [QUERYKEY.PARTIAL_RESULT, round],
    queryFn: () =>
      getBalanceGameResults({
        roomId,
        round,
      }),
  });
};

export const useFetchFinalResult = (roomId: string) => {
  return useQuery({
    queryKey: [QUERYKEY.FINAL_RESULT],
    queryFn: () =>
      getBalanceGameResults({
        roomId,
      }),
  });
};
