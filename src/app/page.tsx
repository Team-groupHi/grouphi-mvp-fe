'use client';
import { Navigation, Button } from '@/components';
import { GameListCard } from '@/components/GameListCard';
import { usePathname } from 'next/navigation';

const DUMMY_DATA = [
  {
    title: 'HOME',
    href: '/',
  },
  {
    title: 'ABOUT US',
    href: '/about',
  },
];

export default function Home() {
  const currentPath = usePathname();

  return (
    <main className="flex flex-col h-screen p-800">
      <section
        id="navigation"
        className="flex justify-between pb-300"
      >
        <Button
          variant="link"
          onClick={() => alert('grouphi!')}
        >
          Logo
        </Button>
        <section className="flex">
          <Navigation
            items={DUMMY_DATA}
            disabled={currentPath}
          />
        </section>
      </section>
      <section
        id="gamelist"
        className="flex flex-col grow justify-center items-center"
      >
        {/* todo: Carousel 교체 */}
        <section className="flex gap-200 pb-500">
          <GameListCard title="game1" />
          <GameListCard title="game2" />
          <GameListCard title="game3" />
        </section>
        <section>
          <Button onClick={() => alert('clicked!')}>방 만들기</Button>
        </section>
      </section>
    </main>
  );
}
