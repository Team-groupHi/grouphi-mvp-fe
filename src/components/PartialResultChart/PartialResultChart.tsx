'use client';

import { PieChart } from '@/components';
import useRoomStore from '@/store/useRoomStore';

export interface PartialResultChartProps {
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
  };
}

const PartialResultChart = ({ data: partialData }: PartialResultChartProps) => {
  const UNSELECTED = '미선택';
  const chartData = [
    partialData.result.a.length,
    partialData.result.b.length,
    partialData.result.c.length,
  ];
  const chartLabels = [partialData.a, partialData.b, UNSELECTED];
  const { questionCount } = useRoomStore();

  return (
    <section className="bg-container-600 h-full w-full flex flex-col justify-center items-center rounded-lg gap-8 p-8">
      <h1 className="text-title1 font-semibold">
        {partialData.round}라운드 결과
      </h1>
      <section className="flex items-center">
        <section className="selected-a bg-primary/20 p-400 rounded-sm flex flex-col gap-100">
          <h1 className="text-title2">{partialData.a}</h1>
          <hr />
          <section className="flex flex-col gap-100">
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
        <section className="selected-b bg-secondary/20 p-400 rounded-sm flex flex-col gap-100">
          <h1 className="text-title2">{partialData.b}</h1>
          <hr />
          <section className="flex flex-col gap-100">
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
      <section>
        <section className="unselected bg-tertiary/20 p-400 rounded-sm flex flex-col gap-100">
          <h1 className="text-title2">{UNSELECTED}</h1>
          <hr />
          <section className="flex flex-col gap-100">
            <span>{partialData.result.c.join(', ')}</span>
          </section>
        </section>
      </section>
      <section className="self-end">
        {partialData.round} / {questionCount}
      </section>
    </section>
  );
};

export default PartialResultChart;
