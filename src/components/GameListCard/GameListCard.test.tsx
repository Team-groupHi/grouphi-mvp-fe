import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';

import { GameListCard } from './';

describe('GameListCard', () => {
  test('1) title, description를 전달하면 렌더링된다.', () => {
    render(
      <GameListCard
        title="game"
        description="game's description"
      />
    );

    expect(screen.getByText('game')).toBeInTheDocument();
    expect(screen.getByText("game's description")).toBeInTheDocument();
  });
  test('2) src를 전달하면 img가 렌더링된다.', () => {
    vi.mock('next/image', () => ({
      __esModule: true,
      default: ({ src, alt }: { src: string; alt: string }) => (
        <img
          src={src}
          alt={alt}
        />
      ),
    }));

    render(
      <GameListCard
        title="game"
        description="game's description"
        src="/test-image.jpg"
      />
    );

    const image = screen.getByAltText('game');
    expect(image).toHaveAttribute('alt', 'game');
  });
  test('3) className를 전달하면 스타일이 렌더링된다.', () => {
    render(
      <GameListCard
        title="game"
        description="game's description"
        className="text-red-500"
      />
    );

    const article = screen.getByTestId('gamelistcard-container');
    expect(article).toHaveClass('text-red-500');
  });
  test('4) 클릭 이벤트가 잘 호출된다.', () => {
    const onClickMock = vi.fn();

    render(
      <GameListCard
        title="game"
        description="game's description"
        onClick={onClickMock}
      />
    );
    const gameListCard = screen.getByText('game');

    fireEvent.click(gameListCard);
    expect(onClickMock).toHaveBeenCalled();
  });
});
