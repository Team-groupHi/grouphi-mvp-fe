'use client';

import { usePathname, useRouter } from 'next/navigation';

import { Logo, Navigation } from '@/components';
import { PATH } from '@/constants/router';
import useRoomStore from '@/store/useRoomStore';
import { isDevelopment } from '@/utils/env';

import NicknameBar from './NicknameBar';

interface NavigationItem {
  title: string;
  href: string;
}

const MainHeader = () => {
  const currentPath = usePathname();
  const router = useRouter();
  const { myName } = useRoomStore();

  const navigationItems = [
    {
      title: 'HOME',
      href: PATH.HOME,
    },
    isDevelopment
      ? {
          title: 'ABOUT US',
          href: PATH.ABOUT,
        }
      : null,
  ].filter((item): item is NavigationItem => Boolean(item));

  return (
    <section
      id="header"
      className="flex justify-between pb-300"
    >
      <Logo onClick={() => router.push(PATH.HOME)} />
      <section className="flex">
        <NicknameBar
          nickname={myName}
          isEdit={true}
        />
        <Navigation
          items={navigationItems}
          disabled={currentPath}
        />
      </section>
    </section>
  );
};

export default MainHeader;
