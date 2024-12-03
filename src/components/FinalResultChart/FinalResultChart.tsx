import { Button } from '@/components/Button';
import Bar, { BarProps } from './Bar';
import { Download } from 'lucide-react';
interface FinalResultChartProps {
  data: BarProps[];
}

const FinalResultChart = ({ data }: FinalResultChartProps) => {
  return (
    <section className="bg-container-600 h-full w-full flex flex-col justify-center items-center rounded-lg gap-8 p-8">
      <h1 className="text-lg font-semibold">최종 결과</h1>
      <section className="w-full h-4/5 overflow-y-auto gap-2 flex flex-col items-center">
        {data.map((result, index) => (
          <Bar
            key={index}
            {...result}
          ></Bar>
        ))}
      </section>
      <Button
        className="font-medium"
        variant={'secondary'}
      >
        <Download />
        결과 공유하기
      </Button>
    </section>
  );
};

export default FinalResultChart;
