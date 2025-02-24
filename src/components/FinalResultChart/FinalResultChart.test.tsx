import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import FinalResultChart from './FinalResultChart';

describe('FinalResultChart 컴포넌트 테스트', () => {
  it('1) 투표 데이터의 각 후보의 이름이 출력 된다.', () => {
    const DUMMY = [
      {
        candidate1: '강아지',
        votes1: 2,
        candidate2: '고양이',
        votes2: 7,
      },
      {
        candidate1: '강하띠',
        votes1: 6,
        candidate2: '코앵히',
        votes2: 4,
      },
      {
        candidate1: '사과',
        votes1: 0,
        candidate2: '바나나',
        votes2: 9,
      },
    ];
    render(<FinalResultChart data={DUMMY}></FinalResultChart>);

    const texts = ['강아지', '고양이', '강하띠', '코앵히', '사과', '바나나'];
    texts.forEach((text) => {
      expect(screen.getByText(text)).toBeInTheDocument();
    });
  });

  it('2) 투표 데이터를 넣으면 각 수치가 Bar에 적힌다.', () => {
    const DUMMY = [
      { candidate1: '강아지', votes1: 2, candidate2: '고양이', votes2: 7 },
    ];
    render(<FinalResultChart data={DUMMY}></FinalResultChart>);

    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('7')).toBeInTheDocument();
  });

  it('3) 한 후보의 투표 수가 0이면 출력되지 않는다.', () => {
    const DUMMY = [
      { candidate1: '강아지', votes1: 0, candidate2: '고양이', votes2: 9 },
    ];
    render(<FinalResultChart data={DUMMY}></FinalResultChart>);

    const bar = screen.getByText('0').parentElement;

    if (bar) {
      expect(getComputedStyle(bar).width).toBe('0%');
    }

    expect(screen.getByText('9')).toBeInTheDocument();
  });

  it('4) 두 후보의 투표 수가 0이면 0을 출력한다.', () => {
    const DUMMY = [
      { candidate1: '강아지', votes1: 0, candidate2: '고양이', votes2: 0 },
    ];
    render(<FinalResultChart data={DUMMY}></FinalResultChart>);
    expect(screen.getByText('0')).toBeInTheDocument();
  });
});
