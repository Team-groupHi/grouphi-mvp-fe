import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { beforeAll, describe, expect, test, vi } from 'vitest';

import { Slider } from '@/components';

describe('Slider 컴포넌트', () => {
  beforeAll(() => {
    global.ResizeObserver = class ResizeObserver {
      observe() {}
      unobserve() {}
      disconnect() {}
    };
  });

  test('1) 기본 슬라이더를 렌더링한다', () => {
    render(
      <Slider
        defaultValue={[50]}
        min={0}
        max={100}
        step={1}
      />
    );
    const slider = screen.getByRole('slider');
    expect(slider).toBeInTheDocument();
  });

  test('2) 커스텀 className을 전달하면 적용된다.', () => {
    render(
      <Slider
        className="text-white"
        defaultValue={[50]}
      />
    );

    const slider = screen.getByTestId('slider');
    expect(slider).toHaveClass('text-white');
  });

  test('3) Thumb를 조작하면 onChangeValue 이벤트 핸들러가 실행된다.', () => {
    const onValueChangeMock = vi.fn();
    const DEFAULT_VALUE = 10;
    const NEW_VALUE = 20;

    render(<Slider onValueChange={onValueChangeMock} />);

    const slider = screen.getByTestId('slider');
    const thumb = slider.querySelector('.radix-slider-thumb');

    if (!thumb) return;

    fireEvent.mouseDown(thumb, { clientX: DEFAULT_VALUE, clientY: 0 });
    fireEvent.mouseMove(thumb, { clientX: NEW_VALUE, clientY: 0 });
    fireEvent.mouseUp(thumb);

    expect(onValueChangeMock).toBeCalledTimes(1);
    expect(onValueChangeMock).toHaveBeenCalledWith([NEW_VALUE]);
  });
});
