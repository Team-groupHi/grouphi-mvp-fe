import { axiosErrorHandler } from '@/app/api/axiosErrorHandler';
import { axiosInstance } from '@/app/api/axiosInstance';
import { DOMAIN } from '@/constants/api';
import { RoomGetResponse } from '@/types/api';

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

export const getRoomDetail = async (roomId: string) => {
  try {
    const response = await axiosInstance.get<RoomGetResponse>(
      DOMAIN.GET_ROOM_DETAIL(roomId)
    );
    return response.data;
  } catch (error) {
    axiosErrorHandler(error);
  }
};
