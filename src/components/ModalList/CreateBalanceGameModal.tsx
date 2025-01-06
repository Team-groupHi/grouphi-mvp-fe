'use client';
import { Button, Input, Label, ModalShell, Slider } from '@/components';
import { PATH } from '@/constants/router';
import { createRoom } from '@/services/rooms';
import useRoomStore from '@/store/useRoomStore';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react';

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

  const inputRef = useRef<HTMLInputElement>(null);
  const [count, setCount] = useState([QUESTIONS_COUNT.MIN]);
  const [error, setError] = useState(false);

  const router = useRouter();
  const { setRoomId, setHostName, setQuestionCount } = useRoomStore();

  const createRoomMutation = useMutation({
    mutationFn: () => createRoom(optionPropsNumber.toString()),
    onSuccess: (roomId) => {
      if (roomId) {
        setRoomId(roomId);
        router.push(`${PATH.BALANCE_GAME}/${roomId}`);
      }
    },
  });

  const handleInputEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  const handleCreateGame = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (count[0] > 0 && inputRef.current?.value) {
      setQuestionCount(count[0]);
      setHostName(inputRef.current?.value);

      setError(false);
      closeModal();
      createRoomMutation.mutate();
    } else {
      setError(true);
    }
  };

  return (
    <ModalShell closeModal={closeModal}>
      <form
        id="create-room-form"
        className="flex flex-col px-300 py-600 gap-700"
        onSubmit={handleCreateGame}
      >
        <section>
          <span className="font-bold">방 생성하기</span>
        </section>
        <section className="flex flex-col gap-600">
          <section className="flex gap-500 items-center">
            <Label
              className="w-24"
              htmlFor="question-count"
            >
              질문의 개수
            </Label>
            <Slider
              name="question-count"
              value={count}
              onValueChange={setCount}
              min={QUESTIONS_COUNT.MIN}
              max={QUESTIONS_COUNT.MAX}
              step={QUESTIONS_COUNT.STEP}
            />
            <span className="w-4 text-subtitle">{count}</span>
          </section>
          <section className="flex gap-500 items-center">
            <Label
              className="w-24"
              htmlFor="nickname-input"
            >
              닉네임
            </Label>
            <section className="flex flex-col gap-200 w-full">
              <Input
                name="nickname-input"
                onKeyDown={handleInputEnter}
                ref={inputRef}
              />
              {error && (
                <section className="text-warning-500 text-subtitle">
                  닉네임을 작성해주세요
                </section>
              )}
            </section>
          </section>
        </section>
        <section className="flex gap-300 self-end">
          <Button type="submit">생성하기</Button>
          <Button
            variant="secondary"
            onClick={closeModal}
          >
            닫기
          </Button>
        </section>
      </form>
    </ModalShell>
  );
};

export default CreateBalanceGameModal;
