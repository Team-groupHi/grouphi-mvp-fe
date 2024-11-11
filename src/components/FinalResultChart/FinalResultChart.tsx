import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/Tooltip';

interface FinalResultChartProps {
  votes1: number;
  votes2: number;
}

const FinalResultChart = ({ votes1, votes2 }: FinalResultChartProps) => {
  const totalVotes = votes1 + votes2;

  const percentageCandidate1 = (votes1 / totalVotes) * 100;
  const percentageCandidate2 = (votes2 / totalVotes) * 100;
  return (
    <div className="w-full max-w-xs mx-auto">
      <div className="flex h-8">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger
              className="bg-primary rounded-l-full flex items-center justify-center"
              style={{ width: `${percentageCandidate1}%` }}
            >
              <span className="font-bold bg-clip-text text-transparent bg-gradient-purple text-center w-full">{`${votes1}`}</span>
            </TooltipTrigger>
            <TooltipContent>
              <p>{percentageCandidate1.toFixed(1)}%</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger
              className="bg-secondary rounded-r-full flex items-center justify-center"
              style={{ width: `${percentageCandidate2}%` }}
            >
              <span className="font-bold bg-clip-text text-transparent bg-gradient-purple text-center w-full">{`${votes2}`}</span>
            </TooltipTrigger>
            <TooltipContent>
              <p>{percentageCandidate2.toFixed(1)}%</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default FinalResultChart;
