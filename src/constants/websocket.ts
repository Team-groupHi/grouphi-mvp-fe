export const SOCKET = {
  ENDPOINT: {
    SUBSCRIBE: '/sub',
    PUBLICATION: '/pub',
    ROOM: {
      ROOMS: '/rooms',
      ENTER: '/rooms/enter',
      EXIT: '/rooms/exit',
      CHAT: '/rooms/chat',
      READY: '/rooms/ready',
      UNREADY: '/rooms/unready',
      CHANGE_GAME: '/rooms/change-game',
      CHANGE_PLAYER_NAME: '/rooms/change-player-name',
    },
    BALANCE_GAME: {
      START: '/games/balance-game/start',
      SELECT_A: '/games/balance-game/select-a',
      SELECT_B: '/games/balance-game/select-b',
      UNSELECT: '/games/balance-game/unselect',
      NEXT: '/games/balance-game/next',
      END: '/games/balance-game/end',
    },
  },
  TYPE: {
    ENTER: 'ENTER',
    EXIT: 'EXIT',
    CHAT: 'CHAT',
    READY: 'READY',
    UNREADY: 'UNREADY',
    CHANGE_GAME: 'CHANGE_GAME',
    CHANGE_PLAYER_NAME: 'CHANGE_PLAYER_NAME',
    BG_START: 'BG_START',
    BG_SELECT: 'BG_SELECT',
    BG_UNSELECT: 'BG_UNSELECT',
    BG_NEXT: 'BG_NEXT',
    BG_ALL_RESULTS: 'BG_ALL_RESULTS',
    BG_END: 'BG_END',
  },
  SYSTEM: 'system',
};
