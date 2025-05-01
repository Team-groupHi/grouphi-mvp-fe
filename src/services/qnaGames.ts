import axios from 'axios';

import { QnaGameResultGetResponse, QnaGameResultRequest } from '@/types/api';

export const getQnaGameResults = async ({
  roomId,
  round,
}: QnaGameResultRequest) => {
  const response = await axios.get<QnaGameResultGetResponse[]>(
    `https://api.grouphi.kr/qna-game/results`,
    {
      params: {
        roomId,
        round,
      },
    }
  );

  return response.data;
};
