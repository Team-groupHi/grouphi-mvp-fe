import { getGames } from '@/services/games';
import { HomeClient } from '@/components';

export default async function Home() {
  const games = await getGames();

  return (
    <>
      <HomeClient games={games ?? []} />
    </>
  );
}
