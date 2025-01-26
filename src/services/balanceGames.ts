import { axiosErrorHandler } from '@/app/api/axiosErrorHandler';
import { axiosInstance } from '@/app/api/axiosInstance';
import { DOMAIN } from '@/constants/api';
import { BalanceGameResultGetResponse } from '@/types/api';

interface getBalanceGameResultsProps {
  roomId: string;
  round?: number;
}

export const getBalanceGameResults = async ({
  roomId,
  round,
}: getBalanceGameResultsProps) => {
  try {
    const response = await axiosInstance.get<BalanceGameResultGetResponse[]>(
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
