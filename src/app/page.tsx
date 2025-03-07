import { HomeClient } from '@/components';
import { getGames } from '@/services/games';

export default async function Home() {
  const games = await getGames();

  return (
    <>
      <HomeClient games={games ?? []} />
    </>
  );
}
