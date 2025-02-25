import { axiosErrorHandler } from '@/app/api/axiosErrorHandler';
import { axiosInstance } from '@/app/api/axiosInstance';
import { DOMAIN } from '@/constants/api';
import {
  BalanceGameResultRequest,
  BalanceGameResultResponse,
} from '@/types/api';

export const getBalanceGameResults = async ({
  roomId,
  round,
}: BalanceGameResultRequest) => {
  try {
    const response = await axiosInstance.get<BalanceGameResultResponse[]>(
      DOMAIN.GET_BALANCEGAME_RESULT,
      {
        params: {
          roomId,
          round,
        },
      }
    );
    return response.data;
  } catch (error) {
    axiosErrorHandler(error);
  }
};
