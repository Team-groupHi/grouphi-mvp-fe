'use client';

import React from 'react';
import { Logo, Navigation } from '@/components';
import { PATH } from '@/constants/router';
import { usePathname, useRouter } from 'next/navigation';

const MainHeader = () => {
  const currentPath = usePathname();
  const router = useRouter();

  const navigationItems = [
    {
      title: 'HOME',
      href: PATH.HOME,
    },
    {
      title: 'ABOUT US',
      href: PATH.ABOUT,
    },
  ];

  return (
    <section
      id="header"
      className="flex justify-between pb-300"
    >
      <Logo onClick={() => router.push(PATH.HOME)} />
      <section className="flex">
        <Navigation
          items={navigationItems}
          disabled={currentPath}
        />
      </section>
    </section>
  );
};

export default MainHeader;
