import { axiosErrorHandler } from '@/app/api/axiosErrorHandler';
import { axiosInstance } from '@/app/api/axiosInstance';
import { DOMAIN } from '@/constants/api';
import { GamesResponse } from '@/types/api';

/**
 * 게임 목록 조회
 */
export const getGames = async () => {
  try {
    const res = await axiosInstance.get<GamesResponse>(DOMAIN.GAMES);
    return res.data;
  } catch (error) {
    axiosErrorHandler(error);
  }
};
