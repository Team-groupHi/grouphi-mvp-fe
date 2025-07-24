import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/Tooltip';
import { cn } from '@/lib/utils';
import { BalanceGameResultResponse } from '@/types/api';

export interface ResultRowProps {
  data: BalanceGameResultResponse;
}

const ResultRow = ({ data }: ResultRowProps) => {
  const votesA = data.result.a.length;
  const votesB = data.result.b.length;
  const candidateA = data.a;
  const candidateB = data.b;

  const totalVotes = votesA + votesB;

  const percentageCandidate1 = (votesA / totalVotes) * 100;
  const percentageCandidate2 = (votesB / totalVotes) * 100;

  return (
    <div className="w-full flex items-center justify-center gap-6">
      <span className="w-[25%] text-right break-keep">{candidateA}</span>

      {totalVotes === 0 ? (
        <div className="w-[50%] h-5 bg-container-100 rounded-full flex items-center justify-center">
          <span className="font-bold text-sm text-purple text-center w-full">
            0
          </span>
        </div>
      ) : (
        <div className="flex h-5 w-[50%]">
          {votesA !== 0 && (
            <BarItem
              className={cn('bg-primary', votesB === 0 && 'rounded-r-full')}
              isLeft={true}
              percentage={percentageCandidate1}
              votes={votesA}
            />
          )}

          {votesB !== 0 && (
            <BarItem
              className={cn('bg-secondary', votesA === 0 && 'rounded-l-full')}
              isLeft={false}
              percentage={percentageCandidate2}
              votes={votesB}
            />
          )}
        </div>
      )}

      <span className="w-[25%] break-keep">{candidateB}</span>
    </div>
  );
};

interface BarItemProps {
  className: string;
  isLeft: boolean;
  percentage: number;
  votes: number;
}

const BarItem = ({ className, isLeft, percentage, votes }: BarItemProps) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger
        className={cn(
          className,
          'flex items-center justify-center',
          isLeft ? 'rounded-l-full' : 'rounded-r-full'
        )}
        style={{ width: `${percentage}%` }}
      >
        <span className="font-bold text-sm text-purple text-center w-full">
          {votes}
        </span>
      </TooltipTrigger>
      <TooltipContent>
        <p>{`${percentage.toFixed(1)}%`}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

export default ResultRow;
