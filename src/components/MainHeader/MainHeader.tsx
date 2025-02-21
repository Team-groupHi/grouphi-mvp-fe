'use client';

import React from 'react';
import { Button, Logo, Navigation } from '@/components';
import { PATH } from '@/constants/router';
import { usePathname, useRouter } from 'next/navigation';
import { Edit, Loader } from 'lucide-react';
import useModalStore from '@/store/useModalStore';
import useRoomStore from '@/store/useRoomStore';
import { MODAL_TYPE } from '@/constants/modal';

const MainHeader = () => {
  const currentPath = usePathname();
  const router = useRouter();
  const { openModal } = useModalStore();
  const { myName } = useRoomStore();

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

  const handleNicknameEdit = () => {
    openModal(MODAL_TYPE.CREATE_USERNAME);
  };

  return (
    <section
      id="header"
      className="flex justify-between pb-300"
    >
      <Logo onClick={() => router.push(PATH.HOME)} />
      <section className="flex">
        <section className="nickname bg-container-600 text-subtitle px-500 rounded-full flex justify-center items-center">
          {myName ? (
            <span className="pointer-events-none pr-1">
              {`닉네임 : ${myName}`}
            </span>
          ) : (
            <Loader className="w-5 h-5 animate-spin text-light" />
          )}
          {myName && (
            <Button
              variant="ghost"
              className="px-2 h-8 rounded-full"
              onClick={handleNicknameEdit}
            >
              <Edit />
            </Button>
          )}
        </section>
        <Navigation
          items={navigationItems}
          disabled={currentPath}
        />
      </section>
    </section>
  );
};

export default MainHeader;
