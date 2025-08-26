'use client';

import { MouseEvent, ReactNode, useEffect } from 'react';

interface ModalShellProps {
  children: ReactNode;
  closeModal: () => void;
  width?: string;
  height?: string;
}

const ModalShell = ({
  children,
  closeModal,
  width = '28rem',
  height = 'auto',
}: ModalShellProps) => {
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

  const modalStyle = {
    width,
    height,
    minWidth: '20rem', // min-w-80
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
        className="p-6 bg-container rounded-lg shadow-lg"
        style={modalStyle}
        tabIndex={0}
      >
        {children}
      </div>
    </div>
  );
};

export default ModalShell;
