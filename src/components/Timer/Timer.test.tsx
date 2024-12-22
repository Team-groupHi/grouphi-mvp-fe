import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Timer from './Timer';

describe('Timer Component', () => {
  beforeEach(() => {
    const startTime = Date.now();
    const endTime = startTime + 3000; // 3초 후

    render(
      <Timer
        startTime={startTime}
        endTime={endTime}
      />
    );
  });
  it('1) 타이머 종료 시간 이후에는 남은 시간이 0이 된다.', async () => {
    await new Promise((resolve) => setTimeout(resolve, 3100)); // 살짝의 보정값 적용

    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('2) 타이머를 3초로 설정하면 1초마다 남은 시간이 2, 1, 0으로 바뀐다.', async () => {
    await waitFor(
      () => {
        expect(screen.getByText('2')).toBeInTheDocument();
      },
      { timeout: 2000 }
    );

    await waitFor(
      () => {
        expect(screen.getByText('1')).toBeInTheDocument();
      },
      { timeout: 2000 }
    );

    await waitFor(
      () => {
        expect(screen.getByText('0')).toBeInTheDocument();
      },
      { timeout: 2000 }
    );
  });
});
