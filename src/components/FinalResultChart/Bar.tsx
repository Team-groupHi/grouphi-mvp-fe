import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/Tooltip';
import clsx from 'clsx';

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
      <span className="w-[25%] text-right">{candidate1}</span>

      {totalVotes === 0 ? (
        <div className="w-[50%] h-5 bg-container-100 rounded-full flex items-center justify-center">
          <span className="font-bold text-sm text-purple text-center w-full">
            0
          </span>
        </div>
      ) : (
        <div className="flex h-5 w-[50%]">
          {votes1 !== 0 && (
            <BarItem
              className={clsx('bg-primary', votes2 === 0 && 'rounded-r-full')}
              isLeft={true}
              percentage={percentageCandidate1}
              votes={votes1}
            />
          )}

          {votes2 !== 0 && (
            <BarItem
              className={clsx('bg-secondary', votes1 === 0 && 'rounded-l-full')}
              isLeft={false}
              percentage={percentageCandidate2}
              votes={votes2}
            />
          )}
        </div>
      )}

      <span className="w-[25%]">{candidate2}</span>
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
        className={clsx(
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

export default Bar;
