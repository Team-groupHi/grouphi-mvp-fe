import { useSuspenseQuery } from '@tanstack/react-query';

import { QUERYKEY } from '@/constants/querykey';
import { getRoomDetail } from '@/services/rooms';

const useFetchRoomDetail = (roomId: string) => {
  return useSuspenseQuery({
    queryKey: [QUERYKEY.ROOM_DETAIL],
    queryFn: () => getRoomDetail(roomId),
  });
};

export default useFetchRoomDetail;
