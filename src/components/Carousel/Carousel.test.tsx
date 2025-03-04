/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import * as React from 'react';
import { beforeEach, describe, expect, it, Mock, vi } from 'vitest';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './Carousel';

// Embla Carousel을 모의 처리
vi.mock('embla-carousel-react', () => ({
  __esModule: true,
  default: () => [
    null,
    {
      scrollPrev: vi.fn(),
      scrollNext: vi.fn(),
      canScrollPrev: vi.fn().mockReturnValue(true),
      canScrollNext: vi.fn().mockReturnValue(true),
      on: vi.fn(),
      off: vi.fn(),
    },
  ],
}));

describe('Carousel Component', () => {
  let mockScrollPrev: Mock;
  let mockScrollNext: Mock;
  let mockApi: any;

  beforeEach(() => {
    mockScrollPrev = vi.fn();
    mockScrollNext = vi.fn();
    mockApi = {
      canScrollPrev: true,
      canScrollNext: true,
      scrollPrev: mockScrollPrev,
      scrollNext: mockScrollNext,
      on: vi.fn(),
      off: vi.fn(),
    };
  });

  it('1) 캐러셀이 자식과 함께 렌더링 된다.', () => {
    render(
      <Carousel aria-label="carousel">
        <CarouselContent>
          <CarouselItem aria-label="slide">Slide 1</CarouselItem>
          <CarouselItem aria-label="slide">Slide 2</CarouselItem>
        </CarouselContent>
      </Carousel>
    );
    expect(
      screen.getByRole('region', { name: 'carousel' })
    ).toBeInTheDocument();
    expect(screen.getAllByRole('group', { name: 'slide' }).length).toBe(2);
  });

  it('2) 이전 버튼을 누르면 이전 슬라이드로 스크롤 된다.', async () => {
    render(
      <Carousel setApi={(api) => (mockApi = api)}>
        <CarouselContent>
          <CarouselItem>Slide 1</CarouselItem>
          <CarouselItem>Slide 2</CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
      </Carousel>
    );

    mockApi.canScrollPrev = true;

    const prevButton = screen.getByRole('button', { name: 'Previous slide' });
    expect(prevButton).not.toBeDisabled();

    fireEvent.click(prevButton);

    await waitFor(() => {
      expect(mockApi.scrollPrev).toHaveBeenCalled();
    });
  });

  it('3) 다음 버튼을 누르면 다음 슬라이드로 스크롤 된다.', async () => {
    render(
      <Carousel setApi={(api) => (mockApi = api)}>
        <CarouselContent>
          <CarouselItem>Slide 1</CarouselItem>
          <CarouselItem>Slide 2</CarouselItem>
        </CarouselContent>
        <CarouselNext />
      </Carousel>
    );

    mockApi.canScrollNext = true;

    const nextButton = screen.getByRole('button', { name: 'Next slide' });
    expect(nextButton).not.toBeDisabled();

    fireEvent.click(nextButton);

    await waitFor(() => {
      expect(mockApi.scrollNext).toHaveBeenCalled();
    });
  });
});
