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

    setTimeLeft(() => {
      if (curTime >= endTime) {
        cancelAnimationFrame(rafId);
        return 0;
      }
      return endTime - curTime;
    });

    rafId = requestAnimationFrame(updateTimer);
  };

  useEffect(() => {
    const curTime = Date.now();
    // 시작 시간이 아직 아니라면 타이머를 대기시킨다.
    if (curTime < startTime) {
      const delay = startTime - curTime;
      const timerId = setTimeout(() => {
        rafId = requestAnimationFrame(updateTimer);
        setTimeLeft(endTime - Date.now());
      }, delay);
      return () => clearTimeout(timerId);
    } else {
      rafId = requestAnimationFrame(updateTimer);
    }
  }, []);

  return (
    <section className="flex items-center justify-center gap-2 w-full text-title1 font-semibold">
      <AlarmClock />
      <span className="w-6 text-center">{second}</span>

      <div className="w-full bg-[#5D5293] rounded h-4 overflow-hidden">
        <div
          className="bg-primary h-full rounded "
          style={{ width: `${percentage}%` }}
        />
      </div>
    </section>
  );
};

export default Timer;
