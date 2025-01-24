'use client';

interface LocalStorageReturnProps {
  setItem: (key: string, value: string) => void;
  getItem: (key: string) => unknown;
  removeItem: (key: string) => void;
  clearStorage: () => void;
}

export const useLocalStorage = (): LocalStorageReturnProps => {
  let localStorage: Storage | null = null;

  if (typeof window !== 'undefined') {
    localStorage = window.localStorage;
  }

  const setItem = (key: string, value: string) => {
    try {
      localStorage?.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error('[LocalStorage setItem() Error] ', e);
    }
  };

  const getItem = (key: string) => {
    try {
      const value = localStorage?.getItem(key) || '';
      return value !== '' ? JSON.parse(value) : '';
    } catch (e) {
      console.error('[LocalStorage getItem() Error] ', e);
    }
  };

  const removeItem = (key: string) => {
    try {
      localStorage?.removeItem(key);
    } catch (e) {
      console.error('[LocalStorage removeItem() Error] ', e);
    }
  };

  const clearStorage = () => {
    try {
      localStorage?.clear();
    } catch (e) {
      console.error('[LocalStorage clear() Error] ', e);
    }
  };

  return { setItem, getItem, removeItem, clearStorage };
};
