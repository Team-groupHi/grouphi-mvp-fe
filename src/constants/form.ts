import { z } from 'zod';

export const FORM = {
  NAME: {
    MIN: 2,
    MAX: 15,
  },
};

export const totalRoundsSchema = ({ min, max }: { min: number; max: number }) =>
  z.object({
    totalRounds: z.number().min(min).max(max),
  });

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
  DEFAULT: {
    MIN: 10,
    MAX: 20,
    STEP: 2,
  },
} as const;

export const GAME_TYPES = {
  QNA: 'QNA',
  BALANCE: 'BALANCE',
  DEFAULT: 'DEFAULT',
} as const;
