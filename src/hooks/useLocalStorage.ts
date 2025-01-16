'use client';

interface LocalStorageReturnProps {
  setItem: (key: string, value: string) => void;
  getItem: (key: string) => string;
  removeItem: (key: string) => void;
  clearStorage: () => void;
}

export const useLocalStorage = (): LocalStorageReturnProps => {
  const localStorage = window.localStorage;

  const setItem = (key: string, value: string) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  const getItem = (key: string): string => {
    const value = localStorage.getItem(key);

    if (value) {
      return JSON.parse(value);
    } else {
      console.error("[LocalStorage Error] There isn't accessible key.");
      return '';
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
