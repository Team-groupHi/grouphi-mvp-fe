import { Button } from '@/components/Button';
import Bar, { BarProps } from './Bar';

interface FinalResultChartProps {
  data: BarProps[];
}

const FinalResultChart = ({ data }: FinalResultChartProps) => {
  return (
    <section className="bg-container-600 h-4/5 w-full flex flex-col justify-center items-center rounded-lg gap-8 p-4">
      <h1 className="text-xl font-semibold">최종 결과</h1>
      <section className="w-full h-3/5 overflow-y-auto gap-3 flex flex-col items-center">
        {data.map((result, index) => (
          <Bar
            key={index}
            {...result}
          ></Bar>
        ))}
      </section>
      <Button
        shape="square"
        size={'xl'}
        className="font-semibold"
      >
        결과 공유하기
      </Button>
    </section>
  );
};

export default FinalResultChart;
