'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  GameListCard,
} from '@/components';
import { PATH } from '@/constants/router';
import { useToast } from '@/hooks/useToast';
import { createRoom } from '@/services/rooms';
import useRoomStore from '@/store/useRoomStore';
import { GameResponse } from '@/types/api';

interface GameListCarouselProps {
  games: GameResponse[];
}

const GameListCarousel = ({ games }: GameListCarouselProps) => {
  const router = useRouter();
  const { toast } = useToast();

  const { setRoomId } = useRoomStore();

  const MAX_CAROUSEL_ITEMS = 6;
  const isMultiplePages = games.length > MAX_CAROUSEL_ITEMS;

  const createRoomMutation = useMutation({
    mutationFn: (gameId: string) => createRoom(gameId),
    onSuccess: (roomId) => {
      if (roomId) {
        setRoomId(roomId);
        router.push(`${PATH.ROOM}/${roomId}`);
      }
    },
    onError: () => {
      toast({
        variant: 'destructive',
        title: '방 생성에 실패했어요! 다시 시도해주세요.',
      });
    },
  });

  const handleCreateRoom = (gameId: string) => {
    createRoomMutation.mutate(gameId);
  };

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
              onClick={() => handleCreateRoom(game.id)}
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
