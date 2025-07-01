'use client';

import React from 'react';

import { cn } from '@/lib/utils';

interface TeamScore {
  name: string;
  winningCount: number;
  score: number;
}

interface ScoreboardProps extends React.HTMLAttributes<HTMLDivElement> {
  scoreData: TeamScore[];
}

const Scoreboard = ({ scoreData, ...props }: ScoreboardProps) => {
  return (
    <section
      aria-label="점수판"
      {...props}
    >
      <ul>
        {scoreData.map((team, index) => {
          const teamColorClass =
            index === 0 ? 'to-cardgame-a' : 'to-cardgame-b';

          return (
            <li
              key={team.name + index}
              className={cn(
                'flex items-center justify-evenly w-52 h-20 py-2 italic rounded-r-full mb-2',
                `bg-gradient-to-r from-white/0`,
                teamColorClass
              )}
              role="group"
              aria-label={`${team.name}팀 점수`}
            >
              <div className="flex">
                <h2 className="w-6 text-h1">{team.name}</h2>
                <span
                  className="w-4 text-h2 self-end"
                  aria-label={`승리 횟수 : ${team.winningCount}회`}
                >
                  {team.winningCount}
                </span>
              </div>
              <span
                className="w-10 text-h1"
                aria-label={`현재 점수: ${team.score}점`}
              >
                {team.score}
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Scoreboard;
