'use client';

import { AlarmClock } from 'lucide-react';
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
    <section className="flex items-center justify-center gap-2 w-full text-title1 font-semibold">
      <AlarmClock />
      <span className="w-6 text-center">{second}</span>

      <div className="relative w-full bg-white/20 rounded h-4">
        <div
          className="bg-primary h-full rounded"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </section>
  );
};

export default Timer;
