'use client';
import { Button, Input, Label, ModalShell } from '@/components';
import { createRoom } from '@/services/rooms';
import { PATH } from '@/constants/router';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

interface BalanceGameModalProps {
  closeModal: () => void;
  optionPropsNumber: number | string;
}

const CreateBalanceGameModal = ({
  closeModal,
  optionPropsNumber,
}: BalanceGameModalProps) => {
  const router = useRouter();

  const createRoomMutation = useMutation({
    mutationFn: () => createRoom(optionPropsNumber),
    onSuccess: (data) => {
      router.push(`${PATH.BALANCE_GAME}/${data}`);
    },
  });

  const handleCreateGame = () => {
    closeModal();
    createRoomMutation.mutate();
  };

  return (
    <ModalShell closeModal={closeModal}>
      <section className="flex flex-col px-300 py-600 gap-700">
        <section>
          <span className="font-bold">방 생성하기</span>
        </section>
        <section className="flex gap-500 items-center text-end">
          <Label
            className="w-24"
            htmlFor="question-count"
          >
            질문의 개수
          </Label>
          <Input
            id="question-count"
            className="bg-white text-dark"
            type="number"
            placeholder="범위는 10-20 이내로 작성해주세요"
            min="10"
            max="20"
            defaultValue={20}
          />
        </section>
        <section className="flex gap-300 self-end">
          <Button onClick={handleCreateGame}>생성하기</Button>
          <Button
            variant="secondary"
            onClick={closeModal}
          >
            닫기
          </Button>
        </section>
      </section>
    </ModalShell>
  );
};

export default CreateBalanceGameModal;
