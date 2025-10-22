'use client';

import { useMutation } from '@tanstack/react-query';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  GameListCard,
} from '@/components';
import { PATH } from '@/constants/router';
import { SOCKET } from '@/constants/websocket';
import { useToast } from '@/hooks/useToast';
import { cn } from '@/lib/utils';
import { createRoom } from '@/services/rooms';
import useModalStore from '@/store/useModalStore';
import useRoomStore from '@/store/useRoomStore';
import useSocketStore from '@/store/useSocketStore';
import { GameResponse } from '@/types/api';

interface GameListCarouselProps {
  games: GameResponse[];
}

const GameListCarousel = ({ games }: GameListCarouselProps) => {
  const path = usePathname();
  const router = useRouter();
  const { toast } = useToast();

  const { setRoomId } = useRoomStore();
  const { closeModal } = useModalStore();
  const { sendMessage } = useSocketStore();

  const [clickedGameId, setClickedGameId] = useState<string | null>(null);

  const MAX_CAROUSEL_ITEMS = path === PATH.HOME ? 6 : 4;
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
      setClickedGameId(null);
    },
  });

  const handleCreateRoom = (gameId: string) => {
    if (clickedGameId) return;
    setClickedGameId(gameId);
    createRoomMutation.mutate(gameId);
  };

  const handleChangeGame = (gameId: string) => {
    if (clickedGameId) return;
    setClickedGameId(gameId);

    if (sendMessage) {
      sendMessage({
        destination: `${SOCKET.ROOM.CHANGE_GAME}`,
        body: {
          gameId,
        },
      });
    }

    closeModal();
  };

  return (
    <section className="px-10">
      <Carousel
        opts={{
          active: isMultiplePages,
        }}
      >
        <CarouselContent
          className={cn(
            'grid grid-rows-2 grid-cols-3 gap-y-4 mb-400 min-w-max',
            path !== PATH.HOME && 'grid-cols-2'
          )}
        >
          {games.map((game) => (
            <CarouselItem key={game.id}>
              <GameListCard
                id={game.id}
                title={game.nameKr}
                description={game.descriptionKr}
                src={game.thumbnailUrl}
                isClicked={clickedGameId === game.id}
                onClick={
                  path === PATH.HOME
                    ? () => handleCreateRoom(game.id)
                    : () => handleChangeGame(game.id)
                }
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
    </section>
  );
};

export default GameListCarousel;
