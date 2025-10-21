import { fireEvent, render, screen } from '@testing-library/react';
import Link from 'next/link';
import { describe, expect, test, vi } from 'vitest';

import { Button } from './Button';

describe('Button', () => {
  test('1) 기본 버튼이 잘 렌더링된다.', () => {
    render(<Button>Button</Button>);
    expect(screen.getByText('Button')).toBeInTheDocument();
  });
  test('2) variant를 전달하면 잘 렌더링된다.', () => {
    render(<Button variant="secondary">Secondary Button</Button>);
    expect(screen.getByText('Secondary Button')).toHaveClass('bg-zinc-200');
  });
  test('3) size를 전달하면 크기에 맞게 렌더링된다.', () => {
    render(<Button size="sm">SM Button</Button>);
    expect(screen.getByText('SM Button')).toHaveClass('px-3');

    render(<Button size="xl">XL Button</Button>);
    expect(screen.getByText('XL Button')).toHaveClass('px-10');
  });
  test('4) shape를 전달하면 알맞은 형태로 렌더링된다.', () => {
    render(<Button shape="round">Round Button</Button>);
    expect(screen.getByText('Round Button')).toHaveClass('rounded-full');

    render(<Button shape="square">Square Button</Button>);
    expect(screen.getByText('Square Button')).toHaveClass('rounded-md');
  });
  test('5) className을 전달하면 해당 CSS가 반영된다.', () => {
    render(<Button className="text-secondary">Button</Button>);
    expect(screen.getByText('Button')).toHaveClass('text-secondary');
  });
  test('6) asChild를 전달하면 button 대신 children이 렌더링된다.', () => {
    render(
      <Button asChild>
        <Link href="/login">Login</Link>
      </Button>
    );

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
  });
  test('7) hover하면 배경이 어두워진다.', () => {
    render(<Button>Button</Button>);

    const button = screen.getByText('Button');

    fireEvent.mouseOver(button);
    expect(button).toHaveClass('hover:bg-primary/90');
  });
  test('8) 클릭하면 함수 호출이 동작한다.', () => {
    const onClickMock = vi.fn();

    render(<Button onClick={onClickMock}>Button</Button>);

    const button = screen.getByText('Button');

    fireEvent.click(button);
    expect(onClickMock).toHaveBeenCalled();
  });
});
