'use client';

import { PieChart } from '@/components';
import useBalanceGameStore from '@/store/useBalanceGameStore';

interface PartialResultChartProps {
  data: {
    round: number;
    q: string;
    a: string;
    b: string;
    result: {
      a: string[];
      b: string[];
      c: string[];
    };
  }[];
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
    <section className="bg-container-600 h-full w-full border-white/50 flex flex-col justify-center items-center rounded-lg gap-8 p-8">
      <section>
        <h1 className="text-title1 font-semibold">
          {partialData.round}라운드 결과
        </h1>
      </section>
      <section className="flex items-stretch gap-700">
        <section className="selected-a bg-primary/20 py-500 px-400 rounded-sm flex flex-col gap-300 items-center">
          <h1 className="text-title2">{partialData.a}</h1>
          <hr className="w-full border-white/50" />
          <section className="flex flex-col gap-300 items-center">
            {partialData.result.a.map((user, index) => (
              <span
                key={user + index}
                className="text-body1"
              >
                {user}
              </span>
            ))}
          </section>
        </section>
        <PieChart
          labels={chartLabels}
          data={chartData}
        />
        <section className="selected-b bg-secondary/20 py-500 px-400 rounded-sm flex flex-col gap-300 items-center">
          <h1 className="text-title2">{partialData.b}</h1>
          <hr className="w-full border-white/50" />
          <section className="flex flex-col gap-300 items-center">
            {partialData.result.b.map((user, index) => (
              <span
                key={user + index}
                className="text-body1"
              >
                {user}
              </span>
            ))}
          </section>
        </section>
      </section>
      {partialData.result.c.length !== 0 && (
        <section className="selected-c w-full bg-container-700/70 py-500 px-500 rounded-sm flex flex-col gap-300 items-center">
          <h1 className="text-title2">{UNSELECTED}</h1>
          <hr className="w-full border-white/50" />
          <section className="flex flex-col gap-300 items-center">
            <span className="text-body1">
              {partialData.result.c.join(', ')}
            </span>
          </section>
        </section>
      )}
      <section className="self-end">
        {partialData.round} / {round.totalRounds}
      </section>
    </section>
  );
};

export default PartialResultChart;
