import nickname from '../../public/data/nickname.json';

export const generateRandomNickname = () => {
  const starName =
    nickname.stars[Math.floor(Math.random() * nickname.stars.length)];
  const job = nickname.jobs[Math.floor(Math.random() * nickname.jobs.length)];

  return `${starName}별 ${job}`;
};
