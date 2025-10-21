import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'bg-primary text-dark hover:bg-primary/90',
        secondary: 'bg-zinc-200 text-zinc-900 hover:bg-zinc-200/80',
        waiting: 'bg-container-600 text hover:bg-container-700',
        outline:
          'bg-primary-container text border border-zinc-200 hover:bg-zinc-900/40',
        destructive: 'bg-red-500 text-zinc-50 hover:bg-red-500/90',
        ghost: 'text hover:bg-zinc-900/40',
        link: 'text underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 px-3 py-2',
        md: 'h-10 px-4 py-2',
        lg: 'h-11 px-8 py-2 text-md',
        xl: 'h-12 px-10 py-2 text-lg',
        icon: 'h-10 w-10',
      },
      shape: {
        round: 'rounded-full',
        square: 'rounded-md',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  shape?: 'round' | 'square';
}

/**
 * @param [variant] - 버튼의 스타일을 결정합니다.
 * @param [size='md'] - 버튼의 사이즈입니다. sm ~ xl값을 가집니다.
 * @param [shape='round'] - 버튼의 형태입니다. 사각형은 'square'를 지정해주세요.
 * @param [className] - TailwindCSS 커스텀 속성을 전달합니다.
 * @param [asChild=false] - Link 컴포넌트를 중첩시킬 수 있습니다.
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant,
      size = 'md',
      shape = 'round',
      className,
      asChild = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button';

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className, shape }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
