import { getGames } from '@/services/games';
import { HomeClient, ShootingStars, StarsBackground } from '@/components';

export default async function Home() {
  const games = await getGames();

  return (
    <>
      <StarsBackground />
      <ShootingStars />
      <HomeClient games={games ?? []} />
    </>
  );
}
