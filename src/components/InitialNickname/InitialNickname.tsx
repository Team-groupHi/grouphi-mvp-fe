'use client';

import React, { useCallback, useEffect } from 'react';

import { STORAGE_KEY } from '@/constants/storage';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import useRoomStore from '@/store/useRoomStore';
import { generateRandomNickname } from '@/utils/randomNickname';

interface InitialNicknameProps {
  children: React.ReactNode;
}

const InitialNickname = ({ children }: InitialNicknameProps) => {
  const { setItem, getItem } = useLocalStorage();
  const { setMyName } = useRoomStore();

  const initialNickname = useCallback(() => {
    let nickname = (getItem(STORAGE_KEY.NICKNAME) as string) || '';

    if (nickname === '') {
      nickname = generateRandomNickname();
      setItem(STORAGE_KEY.NICKNAME, nickname);
    }

    setMyName(nickname);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    initialNickname();
  }, [initialNickname]);

  return <>{children}</>;
};

export default InitialNickname;
