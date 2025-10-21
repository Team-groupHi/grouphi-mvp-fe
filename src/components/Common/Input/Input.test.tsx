import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';

import Input from './Input';

describe('Input Component', () => {
  it('1) 타이핑 가능하다.', () => {
    render(<Input placeholder="Type here" />);

    const inputElement = screen.getByPlaceholderText('Type here');
    fireEvent.change(inputElement, { target: { value: 'Hello World' } });

    expect(inputElement).toHaveValue('Hello World');
  });

  it('2) placeholder 설정이 가능하다.', () => {
    render(<Input placeholder="Enter text" />);

    const inputElement = screen.getByPlaceholderText('Enter text');
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveClass('rounded-md');
  });

  it('3) 커스텀 class name 부여가 가능하다.', () => {
    render(<Input className="custom-class" />);

    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toHaveClass('custom-class');
  });

  it('4) disabled를 부여하면 보이지 않는다.', () => {
    render(<Input disabled />);

    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toBeDisabled();
  });

  it('5) focus, blur 이벤트가 잘 동작한다.', () => {
    const handleFocus = vi.fn();
    const handleBlur = vi.fn();

    render(
      <Input
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    );

    const inputElement = screen.getByRole('textbox');

    // Focus 이벤트 테스트
    inputElement.focus();
    expect(handleFocus).toHaveBeenCalledTimes(1);

    // Blur 이벤트 테스트
    inputElement.blur();
    expect(handleBlur).toHaveBeenCalledTimes(1);
  });

  it('6) forwards ref가 잘 동작한다.', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Input ref={ref} />);

    const inputElement = screen.getByRole('textbox');
    expect(ref.current).toBe(inputElement);
  });

  it('7) password 같은 다른 타입으로 지정할 수 있다.', () => {
    render(
      <Input
        type="password"
        placeholder="Enter password"
      />
    );

    // password는 textbox 역할을 갖지 않기 때문에 getByPlaceholderText를 사용하여 요소 찾기
    const inputElement = screen.getByPlaceholderText('Enter password');
    expect(inputElement).toHaveAttribute('type', 'password');
  });
});
