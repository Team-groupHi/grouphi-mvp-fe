import { axiosInstance } from '@/app/api/axiosInstance';
import { DOMAIN } from '@/constants/api';
import { QnaGameResultGetResponse, QnaGameResultRequest } from '@/types/api';

export const getQnaGameResults = async ({
  roomId,
  round,
}: QnaGameResultRequest) => {
  const response = await axiosInstance.get<QnaGameResultGetResponse[]>(
    DOMAIN.GET_QNAGAME_RESULT,
    {
      params: {
        roomId,
        round,
      },
    }
  );

  return response.data;
};
