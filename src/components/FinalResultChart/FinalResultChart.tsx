'use client';

import { useRef } from 'react';
import { Button } from '@/components/Button';
import Bar, { BarProps } from './Bar';
import { Download } from 'lucide-react';
import html2canvas from 'html2canvas';
import useModalStore from '@/store/useModalStore';
import { useToast } from '@/hooks/useToast';

interface FinalResultChartProps {
  data: BarProps[];
}

const FinalResultChart = ({ data }: FinalResultChartProps) => {
  const chartRef = useRef<HTMLDivElement>(null);

  const { openModal } = useModalStore();
  const { toast } = useToast();

  const handleShareClick = () => {
    if (chartRef.current) {
      const style = document.createElement('style');
      document.head.appendChild(style);
      style.sheet?.insertRule(
        'body > div:last-child img { display: inline-block; }'
      );

      html2canvas(chartRef.current, { scale: 2 })
        .then((canvas) => {
          style.remove();
          const dataUrl = canvas.toDataURL('image/png');

          openModal('SaveImageModal', dataUrl);
        })
        .catch(() => {
          toast({
            title: '결과 사진 캡처에 실패했어요! 다시 시도해주세요.',
            duration: 2000,
            variant: 'destructive',
          });
        });
    }
  };

  return (
    <section className="bg-container-600 h-full w-full flex flex-col items-center rounded-lg gap-8 p-8 overflow-y-auto">
      <h1 className="text-lg font-semibold">최종 결과</h1>
      <section
        className="w-full gap-2 flex flex-col items-center bg-container-600 p-3"
        ref={chartRef}
      >
        {data.map((result, index) => (
          <Bar
            key={index}
            {...result}
          />
        ))}
      </section>
      <Button
        className="font-medium"
        variant={'secondary'}
        onClick={handleShareClick}
      >
        <Download />
        결과 공유하기
      </Button>
    </section>
  );
};

export default FinalResultChart;
