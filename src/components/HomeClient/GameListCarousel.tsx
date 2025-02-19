import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  GameListCard,
} from '@/components';
import { GAME } from '@/constants/game';
import { MODAL } from '@/constants/modal';
import useModalStore from '@/store/useModalStore';
import { GamesResponse } from '@/types/api';

interface GameListCarouselProps {
  games: GamesResponse[];
}

const GameListCarousel = ({ games }: GameListCarouselProps) => {
  const { openModal } = useModalStore();

  const MAX_CAROUSEL_ITEMS = 6;
  const isMultiplePages = games.length > MAX_CAROUSEL_ITEMS;

  return (
    <Carousel
      opts={{
        active: isMultiplePages ? true : false,
      }}
    >
      <CarouselContent className="grid grid-rows-2 grid-cols-3 gap-y-4 mb-500 min-w-[55rem]">
        {games.map((game) => (
          <CarouselItem key={game.id}>
            <GameListCard
              key={game.id}
              id={game.id}
              title={game.nameKr}
              description={game.descriptionKr}
              src={game.thumbnailUrl}
              onClick={() => {
                const modalName = game.nameEn.replaceAll(' ', '');
                switch (modalName) {
                  case GAME.COMPREHENSIVE_BALANCE_GAME:
                  case GAME.CLASSIC_BALANCE_GAME:
                  case GAME.FOOD_BALANCE_GAME:
                  case GAME.DATING_BALANCE_GAME:
                }
                return openModal(MODAL.CREATE_BALANCE_GAME, game.id);
              }}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      {isMultiplePages && (
        <>
          <CarouselPrevious />
          <CarouselNext />
        </>
      )}
    </Carousel>
  );
};

export default GameListCarousel;
