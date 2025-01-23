import { PieChart } from '@/components';

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
  const labels = Object.keys(partialData.result);

  return (
    <section className="bg-container-600 h-full w-full flex flex-col justify-center items-center rounded-lg gap-8 p-8">
      <h1 className="text-title1 font-semibold">
        {partialData.round}라운드 결과
      </h1>
      <section className="flex items-center">
        <section>
          <h1 className="text-title3">{labels[0]}</h1>
        </section>
        <PieChart
          labels={labels}
          data={[1, 2, 3]}
        />
        <section>
          <h1 className="text-title3">{labels[1]}</h1>
        </section>
      </section>
      <section>
        <h1 className="text-title3">{labels[2]}</h1>
      </section>
    </section>
  );
};

export default PartialResultChart;
