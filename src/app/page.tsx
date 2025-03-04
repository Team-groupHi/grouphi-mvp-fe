import { HomeClient, Spinner } from '@/components';
import ErrorFallback from '@/components/ErrorBoundary/ErrorFallback';
import ErrorHandlingWrapper from '@/components/ErrorBoundary/ErrorHandlingWrapper';
import { getGames } from '@/services/games';

export default async function Home() {
  const games = await getGames();

  return (
    <>
      <ErrorHandlingWrapper
        fallbackComponent={ErrorFallback}
        suspenseFallback={<Spinner />}
      >
        <HomeClient games={games ?? []} />
      </ErrorHandlingWrapper>
    </>
  );
}
