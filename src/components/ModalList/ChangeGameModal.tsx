import { ModalShell } from '@/components';
import useGameStore from '@/store/useGameStore';

import GameListCarousel from '../GameListCarousel';

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
      width="75rem"
    >
      <GameListCarousel games={filteredGames} />
    </ModalShell>
  );
};

export default ChangeGameModal;
