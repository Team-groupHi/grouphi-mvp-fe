import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  GameListCard,
} from '@/components';
import { GAME } from '@/constants/game';
import { MODAL_TYPE } from '@/constants/modal';
import useModalStore from '@/store/useModalStore';
import { GameResponse } from '@/types/api';

interface GameListCarouselProps {
  games: GameResponse[];
}

const GameListCarousel = ({ games }: GameListCarouselProps) => {
  const { openModal } = useModalStore();

  const MAX_CAROUSEL_ITEMS = 6;
  const isMultiplePages = games.length > MAX_CAROUSEL_ITEMS;

  return (
    <Carousel
      opts={{
        active: isMultiplePages,
      }}
    >
      <CarouselContent className="grid grid-rows-2 grid-cols-3 gap-y-4 mb-500 min-w-[55rem]">
        {games.map((game) => (
          <CarouselItem key={game.id}>
            <GameListCard
              id={game.id}
              title={game.nameKr}
              description={game.descriptionKr}
              src={game.thumbnailUrl}
              onClick={() => {
                switch (game.nameEn) {
                  case GAME.GAMES.COMPREHENSIVE_BALANCE_GAME:
                  case GAME.GAMES.CLASSIC_BALANCE_GAME:
                  case GAME.GAMES.FOOD_BALANCE_GAME:
                  case GAME.GAMES.DATING_BALANCE_GAME:
                    openModal(MODAL_TYPE.CREATE_BALANCE_GAME, game.id);
                    break;
                  case GAME.GAMES.QNA_GAME:
                    openModal(MODAL_TYPE.CREATE_QNA_GAME, game.id);
                }
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
