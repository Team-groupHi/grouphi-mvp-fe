/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { AlarmClock } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

interface TimerProps {
  playSeconds: number;
  setIsTimeout: (props: boolean) => void;
}

const Timer = ({ playSeconds, setIsTimeout }: TimerProps) => {
  const totalTime = playSeconds * 1000;
  const [timeLeft, setTimeLeft] = useState(totalTime);

  const rafId = useRef(0);
  const startTimeRef = useRef(Date.now());
  const endTimeRef = useRef(startTimeRef.current + totalTime);

  const percentage = (timeLeft / totalTime) * 100;
  const second = Math.max(0, Math.ceil(timeLeft / 1000));

  const updateTimer = () => {
    const curTime = Date.now();

    setTimeLeft(() => {
      if (curTime >= endTimeRef.current) {
        cancelAnimationFrame(rafId.current);
        return 0;
      }
      return endTimeRef.current - curTime;
    });

    rafId.current = requestAnimationFrame(updateTimer);
  };

  useEffect(() => {
    rafId.current = requestAnimationFrame(updateTimer);
    return () => cancelAnimationFrame(rafId.current);
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) {
      setIsTimeout(true);
    }
  }, [timeLeft, setIsTimeout]);

  return (
    <section className="flex items-center justify-center gap-2 w-full text-title1 font-semibold">
      <AlarmClock />
      <span className="w-6 text-center">{second}</span>

      <div className="w-full bg-[#5D5293] rounded h-4 overflow-hidden">
        <div
          className="bg-primary h-full rounded"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </section>
  );
};

export default Timer;
