'use client';

import { MouseEvent, ReactNode, useEffect } from 'react';

interface ModalShellProps {
  children: ReactNode;
  closeModal: () => void;
}

const ModalShell = ({ children, closeModal }: ModalShellProps) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleBackgroundClick = (e: MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity"
      onClick={handleBackgroundClick}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="w-full max-w-md p-6 bg-container rounded-lg shadow-lg"
        tabIndex={0}
      >
        {children}
      </div>
    </div>
  );
};

export default ModalShell;
