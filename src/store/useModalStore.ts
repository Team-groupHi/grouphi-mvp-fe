// useModalStore.ts
import { create } from 'zustand';

type ModalType = string | null;

interface ModalStore {
  isOpen: boolean;
  activeModal: ModalType;
  optionPropsNumber?: number;
  openModal: (modalType: ModalType, optionalNumber?: number) => void;
  closeModal: () => void;
}

const useModalStore = create<ModalStore>((set) => ({
  isOpen: false,
  activeModal: null,
  optionPropsNumber: undefined,
  openModal: (modalType: ModalType, optionPropsNumber?: number) =>
    set({ activeModal: modalType, optionPropsNumber, isOpen: true }),
  closeModal: () =>
    set({ activeModal: null, optionPropsNumber: undefined, isOpen: false }),
}));

export default useModalStore;
