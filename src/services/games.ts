import { axiosErrorHandler } from '@/app/api/axiosErrorHandler';
import { axiosInstance } from '@/app/api/axiosInstance';
import { DOMAIN } from '@/constants/api';
import { GameResponse } from '@/types/api';

export const getGames = async () => {
  try {
    const response = await axiosInstance.get<GameResponse[]>(DOMAIN.GET_GAMES);
    return response.data;
  } catch (error) {
    axiosErrorHandler(error);
  }
};
