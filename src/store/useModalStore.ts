import { create } from 'zustand';

type ModalType = string | null;

interface ModalStore {
  isOpen: boolean;
  activeModal: ModalType;
  optionPropsNumber?: number | string;
  openModal: (modalType: ModalType, optionalNumber?: number | string) => void;
  closeModal: () => void;
}

const useModalStore = create<ModalStore>((set) => ({
  isOpen: false,
  activeModal: null,
  optionPropsNumber: undefined,
  openModal: (modalType: ModalType, optionPropsNumber?: number | string) =>
    set({ activeModal: modalType, optionPropsNumber, isOpen: true }),
  closeModal: () =>
    set({ activeModal: null, optionPropsNumber: undefined, isOpen: false }),
}));

export default useModalStore;
