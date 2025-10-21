import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import BalanceGameFinalResult from './BalanceGameFinalResult';

describe('BalanceGameFinalResult 컴포넌트 테스트', () => {
  it('1) 투표 데이터의 각 후보의 이름이 출력 된다.', () => {
    const DUMMY = [
      {
        round: 1,
        q: '강아지 vs 고양이',
        a: '강아지',
        b: '고양이',
        result: {
          a: ['Alice', 'Bob'],
          b: ['Charlie', 'David', 'Eve', 'Frank', 'Grace', 'Heidi', 'Ivan'],
          c: [],
        },
      },
      {
        round: 2,
        q: '강하띠 vs 코앵히',
        a: '강하띠',
        b: '코앵히',
        result: {
          a: ['Alice', 'Bob', 'Charlie', 'David', 'Eve', 'Frank'],
          b: ['Grace', 'Heidi', 'Ivan', 'Jack'],
          c: [],
        },
      },
      {
        round: 3,
        q: '사과 vs 바나나',
        a: '사과',
        b: '바나나',
        result: {
          a: [],
          b: [
            'Alice',
            'Bob',
            'Charlie',
            'David',
            'Eve',
            'Frank',
            'Grace',
            'Heidi',
            'Ivan',
          ],
          c: [],
        },
      },
    ];
    render(<BalanceGameFinalResult data={DUMMY} />);

    const texts = ['강아지', '고양이', '강하띠', '코앵히', '사과', '바나나'];
    texts.forEach((text) => {
      expect(screen.getByText(text)).toBeInTheDocument();
    });
  });

  it('2) 투표 데이터를 넣으면 각 수치가 Bar에 적힌다.', () => {
    const DUMMY = [
      {
        round: 1,
        q: '강아지 vs 고양이',
        a: '강아지',
        b: '고양이',
        result: {
          a: ['Alice', 'Bob'],
          b: ['Charlie', 'David', 'Eve', 'Frank', 'Grace', 'Heidi', 'Ivan'],
          c: [],
        },
      },
    ];

    render(<BalanceGameFinalResult data={DUMMY} />);

    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('7')).toBeInTheDocument();
  });

  it('3) 한 후보의 투표 수가 0이면 출력되지 않는다.', () => {
    const DUMMY = [
      {
        round: 1,
        q: '강아지 vs 고양이',
        a: '강아지',
        b: '고양이',
        result: {
          a: [],
          b: [
            'Alice',
            'Bob',
            'Charlie',
            'David',
            'Eve',
            'Frank',
            'Grace',
            'Heidi',
            'Ivan',
          ],
          c: [],
        },
      },
    ];

    render(<BalanceGameFinalResult data={DUMMY} />);

    const bar = screen.getByText('0').parentElement;

    if (bar) {
      expect(getComputedStyle(bar).width).toBe('0%');
    }

    expect(screen.getByText('9')).toBeInTheDocument();
  });

  it('4) 두 후보의 투표 수가 0이면 0을 출력한다.', () => {
    const DUMMY = [
      {
        round: 1,
        q: '강아지 vs 고양이',
        a: '강아지',
        b: '고양이',
        result: {
          a: [],
          b: [],
          c: [],
        },
      },
    ];
    render(<BalanceGameFinalResult data={DUMMY} />);
    expect(screen.getByText('0')).toBeInTheDocument();
  });
});
