'use client';
import React from 'react';
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'solid' | 'secondary' | 'outline' | 'warn' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  shape?: 'square' | 'full';
  weight?: 'light' | 'normal' | 'bold';
  isDisabled?: boolean;
  children: string;
  onClick: () => void;
}

const Button = ({
  variant = 'solid',
  size = 'md',
  shape = 'full',
  weight = 'normal',
  isDisabled,
  children,
  onClick,
  ...props
}: ButtonProps) => {
  const upperCaseText = children.toUpperCase();
  const variantsClass = {
    solid: 'bg-primary text-dark',
    secondary: 'bg-primary-light text-dark',
    outline: 'border border-gray text hover:bg-black/10',
    warn: 'bg-error text',
    ghost: 'text hover:bg-black/10',
    link: 'text hover:bg-black/10 underline underline-offset-4',
  };
  const disabledClass = isDisabled
    ? 'grayscale cursor-default text-gray-700'
    : 'hover:bg-opacity-85';
  const shapeClass = {
    square: 'rounded-md',
    full: 'rounded-full',
  };
  const sizeClass = {
    sm: 'px-md py-xs text-sm',
    md: 'px-lg py-sm text-md',
    lg: 'px-xl py-sm text-lg',
    xl: 'px-2xl py-sm text-xl',
  };
  const weightClass: { [key: string]: string } = {
    light: 'font-light',
    normal: 'font-normal',
    bold: 'font-bold',
  };

  return (
    <button
      className={`${variantsClass[variant]} ${sizeClass[size]} ${shapeClass[shape]} ${weightClass[weight]} ${disabledClass}`}
      disabled={isDisabled}
      onClick={onClick}
      {...props}
    >
      {upperCaseText}
    </button>
  );
};

export default Button;
