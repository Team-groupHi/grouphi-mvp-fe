import Bar, { BarProps } from './Bar';

interface FinalResultChartProps {
  data: BarProps[];
}

const FinalResultChart = ({ data }: FinalResultChartProps) => {
  return (
    <div className="bg-container-600 flex flex-col gap-3">
      {data.map((result, index) => (
        <Bar
          key={index}
          {...result}
        ></Bar>
      ))}
    </div>
  );
};

export default FinalResultChart;
