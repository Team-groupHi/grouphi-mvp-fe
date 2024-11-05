'use client';
import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import useModalStore from '@/store/useModalStore';

interface ModalProps {
  closeModal: () => void;
}

const Renderer = 'ModalRenderer';
const Temploading = () => (
  <div className="absolute bottom-0 left-0">Loading...</div>
);

const loadModal = (modalType: string) => {
  if (modalType === Renderer) return null;
  return dynamic<ModalProps>(() => import(`@/components/Modals/${modalType}`), {
    loading: () => <Temploading />,
    ssr: false,
  });
};

const ModalRenderer = () => {
  const { isOpen, activeModal, closeModal } = useModalStore();

  if (!activeModal) return null;
  const DynamicModal = loadModal(activeModal);

  return (
    <Suspense fallback={<Temploading />}>
      {isOpen && DynamicModal && <DynamicModal closeModal={closeModal} />}
    </Suspense>
  );
};

export default ModalRenderer;
