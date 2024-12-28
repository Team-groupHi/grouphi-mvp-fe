import { axiosErrorHandler } from '@/app/api/axiosErrorHandler';
import { axiosInstance } from '@/app/api/axiosInstance';
import { DOMAIN } from '@/constants/api';

export const createRoom = async (gameId: number | string) => {
  try {
    const response = await axiosInstance.post<string>(DOMAIN.CREATE_ROOMS, {
      gameId: gameId.toString(),
    });
    return response.data;
  } catch (error) {
    axiosErrorHandler(error);
  }
};
