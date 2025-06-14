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
  width,
  height,
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

  // Tailwind arbitrary values로 클래스 생성
  const getWidthClass = () => {
    if (!width) return 'w-[28rem]'; // 기본값
    return `w-[${width}]`;
  };

  const getHeightClass = () => {
    if (!height) return 'h-auto'; // 기본값
    return `h-[${height}]`;
  };

  const modalClasses = `${getWidthClass()} ${getHeightClass()} min-w-80 max-w-screen-lg p-6 bg-container rounded-lg shadow-lg`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity"
      onClick={handleBackgroundClick}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
    >
      <div
        className={modalClasses}
        tabIndex={0}
      >
        {children}
      </div>
    </div>
  );
};

export default ModalShell;
