'use client';

import React from 'react';

import { cn } from '@/lib/utils';

interface teamScore {
  name: string;
  winningCount: number;
  score: number;
}
interface ScoreboardProps extends React.HTMLAttributes<HTMLDivElement> {
  data: teamScore[];
}

const Scoreboard = ({ data, ...props }: ScoreboardProps) => {
  return (
    <div
      className="scoreboard"
      {...props}
    >
      {data.map((team, index) => {
        const teamColor = index === 0 ? 'cardgame-a' : 'cardgame-b';

        return (
          <div
            key={team.name + index}
            className={cn(
              'flex items-center justify-evenly w-52 h-20 py-2 italic rounded-r-full mb-2',
              `bg-gradient-to-r from-white/0 to-${teamColor}`
            )}
          >
            <div>
              <span className="w-6 text-h1">{`${team.name}`}</span>
              <span className="w-4 text-h2">{`${team.winningCount}`}</span>
            </div>
            <span className="w-10 text-h1">{` ${team.score}`}</span>
          </div>
        );
      })}
    </div>
  );
};

export default Scoreboard;
