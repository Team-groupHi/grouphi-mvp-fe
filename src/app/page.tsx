'use client';
import { Navigation, Button } from '@/components';
import { Carousel, CarouselContent, CarouselItem } from '@/components/Carousel';
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
const DUMMY_GAMES = [
  {
    title: '밸런스 게임',
    description: '두 가지 선택지 중에 고르는 게임입니다.',
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
        className="flex flex-col grow items-center"
      >
        <span className="text-lg pt-1000">Game List</span>
        <span className="text-lg pb-200">▽</span>
        <section className="flex gap-200">
          <Carousel className="w-full max-w-xl">
            <CarouselContent>
              {DUMMY_GAMES.map((game, index) => (
                <CarouselItem
                  key={index}
                  className="grid gap-500"
                >
                  <GameListCard
                    key={index}
                    className="w-80"
                    {...game}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </section>
      </section>
    </main>
  );
}
