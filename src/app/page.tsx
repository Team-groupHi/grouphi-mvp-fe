'use client';
import { Navigation, Button } from '@/components';
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
    <div className="flex justify-center justify-between">
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
    </div>
  );
}
