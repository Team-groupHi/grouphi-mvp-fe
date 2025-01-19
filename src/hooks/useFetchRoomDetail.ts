import { QUERYKEY } from '@/constants/querykey';
import { getRoomDetail } from '@/services/rooms';
import { useQuery } from '@tanstack/react-query';

const useFetchRoomDetail = (roomId: string | null) => {
  return useQuery({
    queryKey: [QUERYKEY.ROOM_DETAIL],
    queryFn: async () => {
      if (!roomId) return null;
      const data = await getRoomDetail(roomId);
      return data;
    },
    enabled: !!roomId,
  });
};

export default useFetchRoomDetail;
