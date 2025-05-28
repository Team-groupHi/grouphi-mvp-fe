export const NETWORK = {
  TIMEOUT: 3000,
};

export const DOMAIN = {
  CREATE_ROOMS: '/rooms',
  GET_GAMES: '/games',
  GET_ROOM_DETAIL: (roomId: string) => `/rooms/${roomId}`,
  GET_BALANCEGAME_RESULT: '/games/balance-game/results',
  GET_NICKNAME_VALIDATION: (roomId: string) =>
    `/rooms/${roomId}/players/is-valid-name`,
  GET_QNAGAME_RESULT: '/games/qna-game/results',
};
