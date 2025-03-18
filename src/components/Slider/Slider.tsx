'use client';

import * as SliderPrimitive from '@radix-ui/react-slider';
import * as React from 'react';

import { cn } from '@/lib/utils';

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, min = 0, max = 100, step = 1, ...props }, ref) => {
  const scaleCount = Number((max - min) / step);

  const scales = [...Array(scaleCount)].map((_, index) => {
    if (index === 0 || scaleCount > 30) return null;

    const position = (index / scaleCount) * 100;

    return (
      <div
        key={index}
        className="scale absolute w-1 h-1 rounded-full bg-black/30"
        style={{ left: `${position}%` }}
      />
    );
  });

  return (
    <SliderPrimitive.Root
      data-testid="slider"
      ref={ref}
      className={cn(
        'relative flex w-full touch-none select-none items-center',
        className
      )}
      min={min}
      max={max}
      step={step}
      {...props}
    >
      <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-gray-100">
        <SliderPrimitive.Range className="absolute h-full bg-secondary-500" />
      </SliderPrimitive.Track>
      {scales}
      <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-secondary-500 bg-white ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer" />
    </SliderPrimitive.Root>
  );
});
Slider.displayName = SliderPrimitive.Root.displayName;

export default Slider;
