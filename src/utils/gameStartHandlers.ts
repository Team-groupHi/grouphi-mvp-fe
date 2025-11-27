import { GAME_TYPES } from '@/constants/game';
import { SOCKET } from '@/constants/websocket';
import { RoomResponse } from '@/types/api';

export interface StartHandlerParams {
  sendMessage: <T>(params: { destination: string; body?: T }) => void;
  roomDetail: RoomResponse;
  totalRounds: number;
}

const balanceGameStart = ({
  sendMessage,
  roomDetail,
  totalRounds,
}: StartHandlerParams) => {
  const theme = roomDetail.game.nameEn
    .split(' ')[0]
    .toUpperCase()
    .replace('COMPREHENSIVE', 'ALL');

  sendMessage({
    destination: `${SOCKET.BALANCE_GAME.START}`,
    body: { theme, totalRounds },
  });
};

const qnaGameStart = ({ sendMessage, totalRounds }: StartHandlerParams) => {
  sendMessage({
    destination: `${SOCKET.QNA_GAME.START}`,
    body: { totalRounds },
  });
};

export const gameStartHandlers: {
  [K in keyof typeof GAME_TYPES]: (params: StartHandlerParams) => void;
} = {
  [GAME_TYPES.BALANCE]: balanceGameStart,
  [GAME_TYPES.QNA]: qnaGameStart,
};
