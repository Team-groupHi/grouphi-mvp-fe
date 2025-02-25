import { axiosErrorHandler } from '@/app/api/axiosErrorHandler';
import { axiosInstance } from '@/app/api/axiosInstance';
import { DOMAIN } from '@/constants/api';
import { RoomGetResponse, RoomPlayerNameValidationRequest } from '@/types/api';

export const createRoom = async (gameId: string) => {
  try {
    const response = await axiosInstance.post<string>(DOMAIN.CREATE_ROOMS, {
      gameId,
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

export const isValidNickname = async ({
  roomId,
  name,
}: RoomPlayerNameValidationRequest) => {
  try {
    const response = await axiosInstance.post<boolean>(
      DOMAIN.GET_NICKNAME_VALIDATION(roomId),
      {
        name,
      }
    );
    return response.data;
  } catch (error) {
    axiosErrorHandler(error);
  }
};
