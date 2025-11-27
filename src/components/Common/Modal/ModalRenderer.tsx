'use client';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

import useModalStore from '@/store/useModalStore';

interface ModalProps {
  closeModal: () => void;
  optionPropsNumber?: number | string;
}

const Temploading = () => (
  <div className="absolute bottom-0 left-0">Loading...</div>
);

const ErrorModal = ({ closeModal }: ModalProps) => (
  <div className="absolute bottom-0 left-0 bg-red-500 text-white p-4">
    잘못된 모달이에요. <button onClick={closeModal}>닫기</button>
  </div>
);

const loadModal = (modalType: string) => {
  // 상수화, 문서화 시켜서 자동으로 관리하는 프로세스 필요
  return dynamic<ModalProps>(
    () =>
      import(`@/components/ModalList/${modalType}`).catch(() => {
        console.error(`모달 파일을 불러오는 중 에러 발생: ${modalType}`);
        return () => ErrorModal;
      }),
    {
      loading: () => <Temploading />,
      ssr: false,
    }
  );
};

const ModalRenderer = () => {
  const { isOpen, activeModal, optionPropsNumber, closeModal } =
    useModalStore();

  if (!activeModal) return null;
  const DynamicModal = loadModal(activeModal);

  return (
    <Suspense fallback={<Temploading />}>
      {isOpen && DynamicModal && (
        <DynamicModal
          closeModal={closeModal}
          optionPropsNumber={optionPropsNumber}
        />
      )}
    </Suspense>
  );
};

export default ModalRenderer;
