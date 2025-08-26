import { act, render, screen } from '@testing-library/react';
import React from 'react';
import { beforeEach, describe, expect, it } from 'vitest';

import Timer from './Timer';

describe('Timer Component', () => {
  beforeEach(() => {
    render(
      <Timer
        playSeconds={3000}
        setIsTimeout={() => {}}
      />
    );
  });
  it('1) 타이머 종료 시간 이후에는 남은 시간이 0이 된다.', async () => {
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 3010)); // 살짝의 보정값 적용
    });

    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('2) 타이머를 3초로 설정하면 1초마다 남은 시간이 2, 1, 0으로 바뀐다.', async () => {
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1010)); // 살짝의 보정값 적용
    });
    expect(screen.getByText('2')).toBeInTheDocument();

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1010)); // 살짝의 보정값 적용
    });
    expect(screen.getByText('1')).toBeInTheDocument();

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1010)); // 살짝의 보정값 적용
    });
    expect(screen.getByText('0')).toBeInTheDocument();
  });
});
