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
