'use client';

import { PieChart } from '@/components';
import useBalanceGameStore from '@/store/useBalanceGameStore';
import { BalanceGameResultGetResponse } from '@/types/api';
import { UserList } from '.';

interface PartialResultChartProps {
  data: BalanceGameResultGetResponse[];
}

const PartialResultChart = ({ data }: PartialResultChartProps) => {
  const partialData = data[0];
  const UNSELECTED = '미선택';
  const chartData = [
    partialData.result.a.length,
    partialData.result.b.length,
    partialData.result.c.length,
  ];
  const chartLabels = [partialData.a, partialData.b, UNSELECTED];

  const { round } = useBalanceGameStore();

  return (
    <section className="bg-container-600 h-full w-full min-h-fit border-white/50 flex flex-col justify-between items-center rounded-lg gap-8 p-8">
      <section>
        <h1 className="pt-600 text-title1 font-semibold">
          {partialData.round}라운드 결과
        </h1>
      </section>
      <section className="flex justify-between items-stretch gap-700">
        <UserList
          title={partialData.a}
          data={partialData.result.a}
          className={'selected-a bg-primary/20'}
        />
        <PieChart
          labels={chartLabels}
          data={chartData}
        />
        <UserList
          title={partialData.b}
          data={partialData.result.b}
          className={'selected-b bg-secondary/20'}
        />
      </section>
      {partialData.result.c.length !== 0 && (
        <UserList
          title={UNSELECTED}
          data={partialData.result.c.join(', ')}
          className="selected-c w-full bg-container-700/70"
        />
      )}
      <section className="self-end">
        {partialData.round} / {round.totalRounds}
      </section>
    </section>
  );
};

export default PartialResultChart;
