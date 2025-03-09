import { Edit, Loader } from 'lucide-react';
import React from 'react';

import { Button } from '@/components';
import { MODAL_TYPE } from '@/constants/modal';
import useModalStore from '@/store/useModalStore';

interface NicknameBarProps {
  nickname: string;
  isEdit?: boolean;
}

const NicknameBar = ({ nickname, isEdit }: NicknameBarProps) => {
  const { openModal } = useModalStore();

  const handleNicknameEdit = () => {
    openModal(MODAL_TYPE.CREATE_USERNAME);
  };

  return (
    <section className="nickname-bar bg-container-600 text-subtitle px-500 rounded-full flex justify-center items-center">
      {nickname ? (
        <span className="pointer-events-none px-1">{`닉네임 : ${nickname}`}</span>
      ) : (
        <Loader className="w-5 h-5 animate-spin text-light" />
      )}
      {isEdit && nickname !== '' && (
        <Button
          variant="ghost"
          className="px-2 h-8 rounded-full"
          onClick={handleNicknameEdit}
        >
          <Edit />
        </Button>
      )}
    </section>
  );
};

export default NicknameBar;
