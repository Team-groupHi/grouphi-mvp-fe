// 'use client';

import ModalShell from '../Modal/ModalShell';

interface Modal1Props {
  closeModal: () => void;
  optionPropsNumber?: number;
}

const Modal1 = ({ closeModal, optionPropsNumber }: Modal1Props) => (
  <ModalShell closeModal={closeModal}>
    <h2 className="text-xl font-bold">모달 1</h2>
    <p className="mt-4">모달 1의 내용입니다.</p>
    <p className="mt-2 text-gray-600">선택된 숫자: {optionPropsNumber}</p>
    <button
      onClick={closeModal}
      className="mt-6 px-4 py-2 bg-secondary text-white rounded hover:bg-secondary-600"
    >
      닫기
    </button>
  </ModalShell>
);

export default Modal1;
