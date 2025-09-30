import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components';
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

  const percentageCandidateA = totalVotes > 0 ? (votesA / totalVotes) * 100 : 0;
  const percentageCandidateB = totalVotes > 0 ? (votesB / totalVotes) * 100 : 0;

  return (
    <TooltipProvider delayDuration={0}>
      <div className="w-full flex items-center justify-center gap-6">
        <Tooltip>
          <TooltipTrigger asChild>
            <span
              className={cn(
                'w-[25%] text-right break-keep',
                votesA > votesB && 'font-bold'
              )}
            >
              {candidateA}
            </span>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p className="text-right whitespace-pre-wrap">
              {votesA > 0 ? data.result.a.join('\n') : '투표자가 없어요!'}
            </p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            {totalVotes === 0 ? (
              <div className="w-[50%] h-5 bg-container-100 rounded-full flex items-center justify-center">
                <span className="font-bold text-sm text-purple text-center w-full min-w-28">
                  0
                </span>
              </div>
            ) : (
              <div className="flex h-5 w-[50%] overflow-hidden rounded-full">
                {votesA > 0 && (
                  <div
                    className={cn(
                      'bg-primary flex items-center justify-center',
                      votesB === 0 && 'rounded-r-full',
                      'rounded-l-full'
                    )}
                    style={{ width: `${percentageCandidateA}%` }}
                  >
                    <span className="font-bold text-sm text-purple text-center w-full min-w-28">
                      {votesA}
                    </span>
                  </div>
                )}

                {votesB > 0 && (
                  <div
                    className={cn(
                      'bg-secondary flex items-center justify-center',
                      votesA === 0 && 'rounded-l-full',
                      'rounded-r-full'
                    )}
                    style={{ width: `${percentageCandidateB}%` }}
                  >
                    <span className="font-bold text-sm text-purple text-center w-full min-w-28">
                      {votesB}
                    </span>
                  </div>
                )}
              </div>
            )}
          </TooltipTrigger>
          <TooltipContent side="top">
            <p className="mtext-center">{data.q}</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <span
              className={cn(
                'w-[25%] break-keep',
                votesB > votesA && 'font-bold'
              )}
            >
              {candidateB}
            </span>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p className="whitespace-pre-wrap">
              {votesB > 0 ? data.result.b.join('\n') : '투표자가 없어요!'}
            </p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
};

export default ResultRow;
