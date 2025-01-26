export const NETWORK = {
  TIMEOUT: 3000,
};

export const DOMAIN = {
  CREATE_ROOMS: '/rooms',
  GAMES: '/games',
  GET_ROOM_DETAIL: (roomId: string) => `/rooms/${roomId}`,
  GET_BALANCEGAME_RESULT: '/games/balance-game/results',
};
