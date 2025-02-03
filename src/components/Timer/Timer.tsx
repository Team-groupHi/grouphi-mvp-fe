/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { AlarmClock } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

type Time = string | number | Date | Dayjs;

interface TimerProps {
  startTime: Time;
  endTime: Time;
  setIsTimeout: (props: boolean) => void;
}

const Timer = ({ startTime, endTime, setIsTimeout }: TimerProps) => {
  const localStartTime = dayjs.utc(startTime).local().valueOf();
  const localEndTime = dayjs.utc(endTime).local().valueOf();

  const totalTime = localEndTime - localStartTime;
  const [timeLeft, setTimeLeft] = useState(totalTime);

  const percentage = (timeLeft / totalTime) * 100;
  const second = Math.ceil(timeLeft / 1000);

  const rafId = useRef(0);

  const updateTimer = () => {
    const curTime = Date.now();

    setTimeLeft(() => {
      if (curTime >= localEndTime) {
        cancelAnimationFrame(rafId.current);
        return 0;
      }
      return localEndTime - curTime;
    });

    rafId.current = requestAnimationFrame(updateTimer);
  };

  useEffect(() => {
    const curTime = Date.now();
    // 시작 시간이 아직 아니라면 타이머를 대기시킨다.
    if (curTime < localStartTime) {
      const delay = localStartTime - curTime;
      const timerId = setTimeout(() => {
        rafId.current = requestAnimationFrame(updateTimer);
        setTimeLeft(localEndTime - Date.now());
      }, delay);
      return () => clearTimeout(timerId);
    } else {
      rafId.current = requestAnimationFrame(updateTimer);
    }
  }, [endTime, startTime, updateTimer]);

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
          className="bg-primary h-full rounded "
          style={{ width: `${percentage}%` }}
        />
      </div>
    </section>
  );
};

export default Timer;
