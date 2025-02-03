/* eslint-disable react-hooks/exhaustive-deps */
import { PartialResultChart, FinalResultChart } from '@/components';
import BalanceGameProgress from '@/components/BalanceGameProgress';
import PrevGame from './PrevGame';
import useBalanceGameStore from '@/store/useBalanceGameStore';
import {
  BalanceGameResultGetResponse,
  Player,
  RoomGetResponse,
} from '@/types/api';
import * as StompJS from '@stomp/stompjs';
import { useEffect, useState } from 'react';
import { BarProps } from '@/components/FinalResultChart/Bar';
import { getBalanceGameResults } from '@/services/balanceGames';
import { useToast } from '@/hooks/useToast';

interface GamePanelProps {
  roomId: string;
  roomDetail: RoomGetResponse;
  players: Player[];
  isRoomManager: boolean;
  sendMessage: <T>(
    params: Omit<StompJS.IPublishParams, 'body'> & { body?: T }
  ) => void;
}

const GamePanel = ({
  roomId,
  roomDetail,
  players,
  isRoomManager,
  sendMessage,
}: GamePanelProps) => {
  const { toast } = useToast();
  const { roomStatus, selectedPlayers } = useBalanceGameStore();

  const [partialResult, setPartialResult] = useState<
    BalanceGameResultGetResponse[]
  >([]);
  const [finalResult, setFinalResult] = useState<BarProps[]>([]);

  useEffect(() => {
    if (roomStatus === 'finalResult') {
      getBalanceGameResults({ roomId: roomId })
        .then((res) => {
          if (res) {
            const finalResult: BarProps[] = res.map((data) => ({
              candidate1: data.a,
              candidate2: data.b,
              votes1: data.result.a.length,
              votes2: data.result.b.length,
            }));

            setFinalResult(finalResult);
          }
        })
        .catch(() => {
          toast({
            variant: 'destructive',
            title: '문제가 생겼습니다. 다시 시도해주세요.',
          });
        });
    }
  }, [roomStatus]);

  return (
    <section className="w-3/5 h-4/5 min-w-[45rem] max-w-[70rem] w-full bg-container/50 rounded-lg">
      {roomStatus === 'idle' && (
        <PrevGame
          roomDetail={roomDetail}
          players={players}
          isRoomManager={isRoomManager}
          sendMessage={sendMessage}
        />
      )}
      {roomStatus === 'progress' && (
        <BalanceGameProgress
          sendMessage={sendMessage}
          roomId={roomId}
          setPartialResult={setPartialResult}
          isAllSelected={
            players.length !== 0 &&
            new Set(selectedPlayers).size === players.length
          }
        />
      )}
      {roomStatus === 'result' &&
        partialResult &&
        partialResult.length !== 0 && (
          <PartialResultChart data={partialResult} />
        )}
      {roomStatus === 'finalResult' && finalResult.length !== 0 && (
        <FinalResultChart data={finalResult} />
      )}
    </section>
  );
};

export default GamePanel;
