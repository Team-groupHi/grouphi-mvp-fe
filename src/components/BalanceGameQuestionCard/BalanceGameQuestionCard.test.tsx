import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react'; // React 임포트 추가
import { describe, expect, it, vi } from 'vitest';

import BalanceGameQuestionCard from './BalanceGameQuestionCard';

describe('밸런스 게임 질문 카드 테스트', () => {
  it('1) `고양이`를 인자로 받을 경우 `고양이`텍스트가 존재하는지 확인한다.', () => {
    render(
      <BalanceGameQuestionCard
        label="고양이"
        selectedAnimal={null}
        onSelect={() => {}}
      />
    );

    expect(screen.getByText('고양이')).toBeInTheDocument();
  });

  it('2) 카드가 선택될 시 외곽선이 명확히 표시되는 지 확인한다.', () => {
    render(
      <BalanceGameQuestionCard
        label="고양이"
        selectedAnimal="고양이"
        onSelect={() => {}}
      />
    );

    const section = screen.getByText('고양이').closest('section');
    expect(section).toHaveClass('border-secondary-500');
  });

  it('3) 카드가 선택되지 않을 시 외곽선이 표시되지 않는 지 확인한다.', () => {
    render(
      <BalanceGameQuestionCard
        label="강아지"
        selectedAnimal="고양이"
        onSelect={() => {}}
      />
    );

    const section = screen.getByText('강아지').closest('section');
    expect(section).toHaveClass('border-transparent');
  });

  it('4) 카드를 클릭 시 함수 호출이 명확히 동작하는 지 확인한다.', () => {
    const onSelectMock = vi.fn();

    render(
      <BalanceGameQuestionCard
        label="고양이"
        selectedAnimal={null}
        onSelect={onSelectMock}
      />
    );

    const section = screen.getByText('고양이').closest('section');
    fireEvent.click(section!);

    expect(onSelectMock).toHaveBeenCalled();
  });
});
