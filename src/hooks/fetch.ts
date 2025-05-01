import { useQuery, useSuspenseQuery } from '@tanstack/react-query';

import { QUERYKEY } from '@/constants/querykey';
import { getBalanceGameResults } from '@/services/balanceGames';
import { getQnaGameResults } from '@/services/qnaGames';
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

export const useFetchQnaGameResults = ({
  roomId,
  round,
}: {
  roomId: string;
  round: number | undefined;
}) => {
  return useQuery({
    queryKey: [QUERYKEY.QNA_GAME_RESULTS],
    queryFn: () => getQnaGameResults({ roomId, round }),
    enabled: !!round,
  });
};
