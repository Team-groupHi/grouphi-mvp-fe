import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/Tooltip';

export interface BarProps {
  candidate1: string;
  votes1: number;
  candidate2: string;
  votes2: number;
}

const Bar = ({ votes1, candidate1, votes2, candidate2 }: BarProps) => {
  const totalVotes = votes1 + votes2;

  const percentageCandidate1 = (votes1 / totalVotes) * 100;
  const percentageCandidate2 = (votes2 / totalVotes) * 100;

  return (
    <div className="w-full flex items-center justify-center gap-6">
      <span>{candidate1}</span>

      <div className="flex h-8 min-w-[50%]">
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

      <span>{candidate2}</span>
    </div>
  );
};

export default Bar;
