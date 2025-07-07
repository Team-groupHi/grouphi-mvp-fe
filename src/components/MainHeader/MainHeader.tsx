'use client';

import { usePathname, useRouter } from 'next/navigation';

import { Logo, Navigation } from '@/components';
import { PATH } from '@/constants/router';
import useRoomStore from '@/store/useRoomStore';
import { isDevelopment } from '@/utils/env';

import NicknameBar from './NicknameBar';

const MainHeader = () => {
  const currentPath = usePathname();
  const router = useRouter();
  const { myName } = useRoomStore();

  const navigationItems = [
    {
      title: 'HOME',
      href: PATH.HOME,
      isShow: true,
    },
    {
      title: 'ABOUT US',
      href: PATH.ABOUT,
      isShow: isDevelopment === null ? false : isDevelopment,
    },
  ];

  return (
    <header className="flex justify-between p-800 pb-0 mb-800">
      <Logo onClick={() => router.push(PATH.HOME)} />
      <div className="flex">
        <NicknameBar
          nickname={myName}
          isEdit={true}
        />
        <Navigation
          items={navigationItems}
          disabled={currentPath}
        />
      </div>
    </header>
  );
};

export default MainHeader;
