import { useQuery } from '@tanstack/react-query';

import { QUERYKEY } from '@/constants/querykey';
import { getRoomDetail } from '@/services/rooms';

const useFetchRoomDetail = (roomId: string) => {
  return useQuery({
    queryKey: [QUERYKEY.ROOM_DETAIL],
    queryFn: () => getRoomDetail(roomId),
  });
};

export default useFetchRoomDetail;
