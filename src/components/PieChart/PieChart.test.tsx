import { fireEvent, render, screen } from '@testing-library/react';
import { ChartData, ChartOptions } from 'chart.js';
import React from 'react';
import { describe, expect, test, vi } from 'vitest';

import PieChart from './PieChart';

vi.mock('react-chartjs-2', () => ({
  Doughnut: ({
    data,
    options,
  }: {
    data: ChartData<'doughnut'>;
    options: ChartOptions<'doughnut'>;
  }) => (
    <div
      data-testid="pie-chart"
      data-data={JSON.stringify(data)}
      data-options={JSON.stringify(options)}
    />
  ),
}));

describe('PieChart 컴포넌트', () => {
  const labels = ['Label 1', 'Label 2'];
  const data = [10, 20];

  test('1) labels, data를 전달하면 차트를 렌더링한다', () => {
    render(
      <PieChart
        labels={labels}
        data={data}
      />
    );

    const chart = screen.getByTestId('pie-chart');
    expect(chart).toBeInTheDocument();

    const chartData = JSON.parse(chart.getAttribute('data-data') || '{}');
    expect(chartData.labels).toEqual(labels);
    expect(chartData.datasets[0].data).toEqual(data);
  });

  test('2) className을 전달하면 className을 렌더링한다.', () => {
    render(
      <PieChart
        labels={labels}
        data={data}
        className="bg-primary w-80"
      />
    );

    const sectionElement = screen.getByTestId('pie-chart').parentElement;
    expect(sectionElement).toHaveClass('bg-primary');
    expect(sectionElement).toHaveClass('w-80');
  });

  test('3) 추가 props를 전달하면 렌더링한다.', () => {
    const onClickMock = vi.fn();

    render(
      <PieChart
        labels={labels}
        data={data}
        className="bg-primary w-80"
        onClick={onClickMock}
      />
    );

    const chart = screen.getByTestId('pie-chart');
    fireEvent.click(chart);
    expect(onClickMock).toBeCalledTimes(1);
  });

  test('4) 데이터가 없으면 "데이터가 없습니다" 메세지를 렌더링한다.', () => {
    render(
      <PieChart
        labels={[]}
        data={[]}
      />
    );

    const text = screen.getByText('데이터가 없습니다');
    expect(text).toBeInTheDocument();
  });
});
