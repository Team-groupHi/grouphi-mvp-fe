'use client';

interface LocalStorageReturnProps {
  setItem: (key: string, value: string) => void;
  getItem: (key: string) => string | null;
  removeItem: (key: string) => void;
  clearStorage: () => void;
}

export const useLocalStorage = (): LocalStorageReturnProps => {
  const localStorage = window.localStorage;

  const setItem = (key: string, value: string) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error('[LocalStorage Error] ', e);
    }
  };

  const getItem = (key: string) => {
    try {
      const value = localStorage.getItem(key);
      return value && JSON.parse(value);
    } catch (e) {
      console.error('[LocalStorage Error] ', e);
      return null;
    }
  };

  const removeItem = (key: string) => {
    localStorage.removeItem(key);
  };

  const clearStorage = () => {
    localStorage.clear();
  };

  return { setItem, getItem, removeItem, clearStorage };
};
