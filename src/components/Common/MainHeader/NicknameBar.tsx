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
    <section className="nickname-bar bg-container-600 text-subtitle px-500 rounded-full flex justify-center items-center min-w-fit">
      {nickname ? (
        <span className="pointer-events-none px-1">{`닉네임 : ${nickname}`}</span>
      ) : (
        <div className="py-1">
          <Loader className="w-5 h-5 animate-spin text-light" />
        </div>
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
