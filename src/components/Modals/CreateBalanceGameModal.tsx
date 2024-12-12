'use client';
import Link from 'next/link';
import { Button, Input, Label, ModalShell } from '@/components';

interface BalanceGameModalProps {
  closeModal: () => void;
}

const CreateBalanceGameModal = ({ closeModal }: BalanceGameModalProps) => {
  const handleCreateGame = () => {
    // todo: 유효성검사
    console.log('Create Game!');
    // todo: 방생성 API
    closeModal();
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
          <Button
            asChild={true}
            onClick={handleCreateGame}
          >
            <Link
              href={{
                pathname: `/balance-game/1`,
              }}
            >
              생성하기
            </Link>
          </Button>
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
