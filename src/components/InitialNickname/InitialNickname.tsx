'use client';

import { STORAGE_KEY } from '@/constants/storage';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { generateRandomNickname } from '@/utils/randomNickname';
import React from 'react';

interface InitialNicknameProps {
  children: React.ReactNode;
}

const InitialNickname = ({ children }: InitialNicknameProps) => {
  const { setItem, getItem } = useLocalStorage();

  const initialNickname = () => {
    const nickname = getItem(STORAGE_KEY.NICKNAME);

    if (!nickname) {
      const newNickname = generateRandomNickname();
      setItem(STORAGE_KEY.NICKNAME, newNickname);
    }
  };

  initialNickname();

  return <>{children}</>;
};

export default InitialNickname;
