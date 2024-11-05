import { create } from 'zustand';

type ModalType = string | null;

interface ModalStore {
  isOpen: boolean;
  activeModal: ModalType;
  openModal: (modalType: ModalType) => void;
  closeModal: () => void;
}

const useModalStore = create<ModalStore>((set) => ({
  isOpen: false,
  activeModal: null,
  openModal: (modalType) => set({ activeModal: modalType, isOpen: true }),
  closeModal: () => set({ activeModal: null, isOpen: false }),
}));

export default useModalStore;
