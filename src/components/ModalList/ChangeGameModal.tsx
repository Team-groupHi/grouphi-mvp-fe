import { GameListCarousel, Label, ModalShell } from '@/components';
import useGameStore from '@/store/useGameStore';

interface ChangeGameModalProps {
  closeModal: () => void;
  optionPropsNumber: number | string;
}

const ChangeGameModal = ({
  closeModal,
  optionPropsNumber,
}: ChangeGameModalProps) => {
  const { games } = useGameStore();

  const filteredGames = games.filter((game) => game.id !== optionPropsNumber);

  return (
    <ModalShell
      closeModal={closeModal}
      width="auto"
    >
      <section className="flex flex-col items-center gap-4 pt-2">
        <Label className="text-title2">변경하고 싶은 게임을 선택하세요!</Label>
        <Label className="text-title2">▽</Label>
        <GameListCarousel games={filteredGames} />
      </section>
    </ModalShell>
  );
};

export default ChangeGameModal;
