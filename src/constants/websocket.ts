const PREFIX = {
  ROOMS: '/rooms',
  GAMES: {
    BALANCE: '/games/balance-game',
    QNA: '/games/qna-game',
  },
};

export const SOCKET = {
  SUBSCRIBE: '/topic',
  PUBLICATION: '/app',
  USER: {
    QUEUE_ERRORS: '/user/queue/errors',
  },
  ROOM: {
    ROOMS: `${PREFIX.ROOMS}`,
    ENTER: `${PREFIX.ROOMS}/enter`,
    EXIT: `${PREFIX.ROOMS}/exit`,
    CHAT: `${PREFIX.ROOMS}/chat`,
    READY: `${PREFIX.ROOMS}/ready`,
    UNREADY: `${PREFIX.ROOMS}/unready`,
    CHANGE_GAME: `${PREFIX.ROOMS}/change-game`,
    CHANGE_PLAYER_NAME: `${PREFIX.ROOMS}/change-player-name`,
  },
  BALANCE_GAME: {
    START: `${PREFIX.GAMES.BALANCE}/start`,
    SELECT_A: `${PREFIX.GAMES.BALANCE}/select-a`,
    SELECT_B: `${PREFIX.GAMES.BALANCE}/select-b`,
    UNSELECT: `${PREFIX.GAMES.BALANCE}/unselect`,
    NEXT: `${PREFIX.GAMES.BALANCE}/next`,
    END: `${PREFIX.GAMES.BALANCE}/end`,
  },
  QNA_GAME: {
    START: `${PREFIX.GAMES.QNA}/start`,
    SUBMIT: `${PREFIX.GAMES.QNA}/submit`,
    LIKE: `${PREFIX.GAMES.QNA}/like`,
    UNLIKE: `${PREFIX.GAMES.QNA}/unlike`,
    NEXT: `${PREFIX.GAMES.QNA}/next`,
    END: `${PREFIX.GAMES.QNA}/end`,
  },
  TYPE: {
    ROOM: {
      ENTER: 'ENTER',
      EXIT: 'EXIT',
      CHAT: 'CHAT',
      READY: 'READY',
      UNREADY: 'UNREADY',
      CHANGE_GAME: 'CHANGE_GAME',
      CHANGE_PLAYER_NAME: 'CHANGE_PLAYER_NAME',
      ERROR: 'ERROR',
    },
    BALANCE_GAME: {
      START: 'BG_START',
      SELECT: 'BG_SELECT',
      UNSELECT: 'BG_UNSELECT',
      NEXT: 'BG_NEXT',
      ALL_RESULTS: 'BG_ALL_RESULTS',
      END: 'BG_END',
    },
    QNA_GAME: {
      START: 'QNA_START',
      SUBMIT: 'QNA_SUBMIT',
      LIKE: 'QNA_LIKE',
      UNLIKE: 'QNA_UNLIKE',
      NEXT: 'QNA_NEXT',
      ALL_RESULTS: 'QNA_ALL_RESULTS',
      END: 'QNA_END',
    },
  },
  SYSTEM: 'system',
};
