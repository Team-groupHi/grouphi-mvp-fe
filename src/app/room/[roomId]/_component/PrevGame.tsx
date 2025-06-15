/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import * as StompJS from '@stomp/stompjs';
import {
  CheckCheck,
  Loader,
  MousePointer2,
  SlidersHorizontal,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  GameListCard,
  Label,
  Slider,
} from '@/components';
import { totalRoundsSchema } from '@/constants/form';
import { GAME } from '@/constants/game';
import { MODAL_TYPE } from '@/constants/modal';
import { SOCKET } from '@/constants/websocket';
import useThrottleReadyHandlers from '@/hooks/useThrottleHandlers';
import { useToast } from '@/hooks/useToast';
import { cn } from '@/lib/utils';
import useModalStore from '@/store/useModalStore';
import useRoomStore from '@/store/useRoomStore';
import { Player, RoomResponse } from '@/types/api';
import { isDevelopment } from '@/utils/env';

interface RoundFormProps {
  gameEn: string;
  setTotalRounds: (totalRounds: number) => void;
}

const RoundForm = ({ gameEn, setTotalRounds }: RoundFormProps) => {
  const GAME_QUESTIONS_COUNT = {
    qna: {
      MIN: 5,
      MAX: 10,
      STEP: 1,
    },
    balance: {
      MIN: 10,
      MAX: 20,
      STEP: 2,
    },
    other: {
      MIN: 10,
      MAX: 20,
      STEP: 2,
    },
  } as const;

  const gameToType = (game: string) => {
    switch (game) {
      case GAME.GAMES.COMPREHENSIVE_BALANCE_GAME:
      case GAME.GAMES.CLASSIC_BALANCE_GAME:
      case GAME.GAMES.FOOD_BALANCE_GAME:
      case GAME.GAMES.DATING_BALANCE_GAME:
        return 'balance';
      case GAME.GAMES.QNA_GAME:
        return 'qna';
      default:
        return 'other';
    }
  };

  const game = gameToType(gameEn);

  const QUESTIONS_COUNT = GAME_QUESTIONS_COUNT[game];

  const formSchema = totalRoundsSchema({
    min: QUESTIONS_COUNT.MIN,
    max: QUESTIONS_COUNT.MAX,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      totalRounds: QUESTIONS_COUNT.MIN,
    },
  });

  const totalRounds = form.watch('totalRounds');

  const onChange = (values: z.infer<typeof formSchema>) => {
    setTotalRounds(values.totalRounds);
  };

  useEffect(() => {
    onChange({ totalRounds });
  }, [totalRounds]);

  return (
    <>
      <Form {...form}>
        <form
          id="create-room-form"
          className="flex flex-col pb-300 gap-600 w-full"
        >
          <FormField
            control={form.control}
            name="totalRounds"
            render={({ field: { value, onChange } }) => (
              <FormItem>
                <FormControl>
                  <section className="flex gap-500 items-center min-h-9">
                    <Label
                      className="w-24"
                      htmlFor="total-rounds"
                    >
                      질문의 개수
                    </Label>
                    <Slider
                      defaultValue={[value]}
                      onValueChange={(v) => onChange(v[0])}
                      min={QUESTIONS_COUNT.MIN}
                      max={QUESTIONS_COUNT.MAX}
                      step={QUESTIONS_COUNT.STEP}
                    />
                    <span className="w-4 text-subtitle">{value}</span>
                  </section>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </>
  );
};
interface PrevGameProps {
  roomDetail: RoomResponse;
  players: Player[];
  isRoomManager: boolean;
  sendMessage: <T>(
    params: Omit<StompJS.IPublishParams, 'body'> & { body?: T }
  ) => void;
}

const PrevGame = ({
  roomDetail,
  players,
  sendMessage,
  isRoomManager,
}: PrevGameProps) => {
  const [totalRounds, setTotalRounds] = useState<number>();
  const { myName } = useRoomStore();
  // const { round: BalanceGameRound, setTotalRounds } = useBalanceGameStore();
  // const { round: QnaGameRound } = useQnaGameStore();
  const { openModal } = useModalStore();

  const { toast } = useToast();

  const { handleReady, handleUnready } = useThrottleReadyHandlers(sendMessage);

  const isReady = players.find((player) => player.name === myName)?.isReady;
  const readyCount = players.reduce(
    (count, { isReady }) => count + (isReady ? 1 : 0),
    0
  );
  const isAllReady = readyCount === players.length;

  const handleGameStart = () => {
    if (roomDetail.players.length === 1) {
      toast({
        title: '2명 이상 모여야 게임을 시작할 수 있어요!',
        description:
          '왼쪽 위 친구 초대 버튼을 눌러 같이 할 친구를 초대해보세요.',
      });
      return;
    }

    switch (roomDetail.game.nameEn) {
      case GAME.GAMES.COMPREHENSIVE_BALANCE_GAME:
      case GAME.GAMES.CLASSIC_BALANCE_GAME:
      case GAME.GAMES.FOOD_BALANCE_GAME:
      case GAME.GAMES.DATING_BALANCE_GAME:
        sendMessage({
          destination: `${SOCKET.BALANCE_GAME.START}`,
          body: {
            theme: roomDetail.game.nameEn
              .split(' ')[0]
              .toUpperCase()
              .replace('COMPREHENSIVE', 'ALL'),
            totalRounds,
          },
        });
        break;
      case GAME.GAMES.QNA_GAME:
        sendMessage({
          destination: `${SOCKET.QNA_GAME.START}`,
          body: {
            totalRounds,
          },
        });
        break;
    }
  };

  const handleGameChange = () => {
    openModal(MODAL_TYPE.CHANGE_GAME, roomDetail.game.id);
  };

  return (
    <section className="w-full h-full flex flex-col justify-center items-center gap-7 px-900">
      <span className="font-semibold">잠시 후 게임이 시작됩니다.</span>
      <GameListCard
        title={roomDetail.game.nameKr}
        description={roomDetail.game.descriptionKr}
        src={roomDetail.game.thumbnailUrl}
        className="h-16 pointer-events-none"
      />

      <section className="flex flex-col gap-2 w-full items-center">
        {isRoomManager && (
          <>
            <RoundForm
              setTotalRounds={setTotalRounds}
              gameEn={roomDetail.game.nameEn}
            />
            <Button
              className={cn(
                'text-base font-semibold w-[12rem]',
                !isAllReady && 'pointer-events-none'
              )}
              size="xl"
              variant={
                isAllReady && roomDetail.players.length !== 1
                  ? 'default'
                  : 'waiting'
              }
              onClick={handleGameStart}
            >
              <div className="flex items-center justify-center gap-2">
                {isAllReady ? (
                  <>
                    <CheckCheck />
                    <span>
                      게임 시작({readyCount}/{players.length})
                    </span>
                  </>
                ) : (
                  <>
                    <Loader />
                    <span>
                      준비 대기중({readyCount}/{players.length})
                    </span>
                  </>
                )}
              </div>
            </Button>

            {isDevelopment && (
              <Button
                variant={'secondary'}
                className="text-base font-semibold w-[12rem] flex items-center justify-center gap-2"
                size="xl"
                onClick={handleGameChange}
              >
                <SlidersHorizontal />
                <span>게임 변경</span>
              </Button>
            )}

            {isDevelopment && (
              <Button
                variant={'secondary'}
                className="text-base font-semibold w-[12rem] flex items-center justify-center gap-2"
                size="xl"
                onClick={() => {
                  sendMessage({
                    destination: `${SOCKET.ROOM.CHANGE_GAME}`,
                    body: {
                      gameId: '67ac5da22037c2ec91dec688',
                    },
                  });
                }}
              >
                <SlidersHorizontal />
                <span>게임 임의 변경</span>
              </Button>
            )}
          </>
        )}
      </section>

      {!isRoomManager && (
        <Button
          className="text-base font-semibold w-[12rem]"
          size="xl"
          variant={isReady ? 'waiting' : 'default'}
          onClick={isReady ? handleUnready : handleReady}
        >
          <div className="flex items-center justify-center gap-2">
            {isReady ? (
              <>
                <CheckCheck />
                <span>준비 완료</span>
              </>
            ) : (
              <>
                <MousePointer2 />
                <span>준비 하기</span>
              </>
            )}
          </div>
        </Button>
      )}
    </section>
  );
};

export default PrevGame;
