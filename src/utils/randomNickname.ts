import { NICKNAME } from '@/constants/name';

export const generateRandomNickname = () => {
  const starName =
    NICKNAME.STARS[Math.floor(Math.random() * NICKNAME.STARS.length)];
  const job = NICKNAME.JOBS[Math.floor(Math.random() * NICKNAME.JOBS.length)];

  return `${starName}별 ${job}`;
};
