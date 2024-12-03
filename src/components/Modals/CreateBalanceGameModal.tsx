'use client';
import { Button } from '@/components/Button';
import { Input, Label } from '@/components';
import { ModalShell } from '@/components/Modals';

const CreateBalanceGameModal = ({ closeModal }: { closeModal: () => void }) => (
  <ModalShell closeModal={closeModal}>
    <section className="flex flex-col gap-700">
      <section>
        <h2 className="text-lg font-bold">방 생성하기</h2>
      </section>
      <section>
        <Label htmlFor="questions">질문의 개수</Label>
        <Input
          id="questions"
          type="number"
          placeholder="범위는 10-20 이내로 작성해주세요"
          className="bg-gray-50 text-dark"
        />
      </section>
      <section className="flex gap-300 self-end">
        <Button onClick={() => alert('방 생성 API 연결!')}>생성하기</Button>
        <Button
          variant="ghost"
          className="bg-black/15 hover:bg-black/30"
          onClick={closeModal}
        >
          닫기
        </Button>
      </section>
    </section>
  </ModalShell>
);

export default CreateBalanceGameModal;
