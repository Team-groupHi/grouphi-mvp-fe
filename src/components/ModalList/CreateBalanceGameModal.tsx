'use client';
import { useState } from 'react';
import { Button, Label, ModalShell, Slider } from '@/components';
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
  const QUESTIONS_COUNT = {
    MIN: 10,
    MAX: 20,
    STEP: 2,
  };

  const [questionCount, setQuestionCount] = useState([QUESTIONS_COUNT.MIN]);
  const router = useRouter();

  const createRoomMutation = useMutation({
    mutationFn: () => createRoom(optionPropsNumber),
    onSuccess: (data) => {
      router.push(
        `${PATH.BALANCE_GAME}/${data}?question-count=${questionCount}`
      );
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
          <Slider
            name="question-count"
            value={questionCount}
            onValueChange={setQuestionCount}
            min={QUESTIONS_COUNT.MIN}
            max={QUESTIONS_COUNT.MAX}
            step={QUESTIONS_COUNT.STEP}
          />
          <span className="w-4 text-subtitle">{questionCount}</span>
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
