'use client';

import React, { useEffect, useState } from 'react';

interface TimerProps {
  startTime: number;
  endTime: number;
}

const Timer = ({ startTime, endTime }: TimerProps) => {
  const totalTime = endTime - startTime;
  const [timeLeft, setTimeLeft] = useState(totalTime);

  const percentage = (timeLeft / totalTime) * 100;
  const second = Math.ceil(timeLeft / 1000);

  let rafId: number;

  const updateTimer = () => {
    const curTime = Date.now();
    const curTimeLeft = endTime - curTime;

    setTimeLeft((prevTime) => {
      if (prevTime <= 0) {
        cancelAnimationFrame(rafId);
        return 0;
      }
      return curTimeLeft;
    });

    rafId = requestAnimationFrame(updateTimer);
  };

  useEffect(() => {
    rafId = requestAnimationFrame(updateTimer);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <div className="flex items-center justify-center gap-2 w-full">
      <span className="text-lg font-bold">{second}</span>

      <div className="relative w-full bg-gray-200 rounded h-6">
        <div
          className="bg-blue-500 h-full rounded"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default Timer;
