export const FORM = {
  NAME: {
    MIN: 2,
    MAX: 15,
  },
};

export const GAME_QUESTIONS_COUNT = {
  QNA: {
    MIN: 5,
    MAX: 10,
    STEP: 1,
  },
  BALANCE: {
    MIN: 10,
    MAX: 20,
    STEP: 2,
  },
} as const;
