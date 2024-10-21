'use client'
import React from 'react'
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'solid' | 'secondary' | 'outline' | 'warn' | 'ghost' | 'link'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  shape?: 'square' | 'full'
  fontWeight?: 'light' | 'normal' | 'bold'
  isDisabled?: boolean
  children: string
  onClick: () => void
}

/**
 * @param [onClick] - [필수] 버튼의 이벤트 핸들러입니다.
 * @param [variant='solid'] - 버튼의 스타일을 결정합니다.
 * @param [size='md'] - 버튼의 사이즈입니다. sm ~ xl값을 가집니다.
 * @param [shape='full'] - 버튼의 형태입니다. 사각형은 'square'를 지정해주세요.
 * @param [fontWeight='normal'] - 버튼의 fontWeight입니다.
 * @param [isDisabled=false] - 버튼의 비활성화 여부입니다.
 * @returns
 */
const Button = ({
  variant = 'solid',
  size = 'md',
  shape = 'full',
  fontWeight = 'normal',
  isDisabled = false,
  children,
  onClick,
  ...props
}: ButtonProps) => {
  const upperCaseText = children.toUpperCase()
  const variantsClass = {
    solid: 'bg-primary text-dark',
    secondary: 'bg-primary-light text-dark',
    outline: 'border border-gray text hover:bg-black/10',
    warn: 'bg-error text',
    ghost: 'text hover:bg-black/10',
    link: 'text hover:bg-black/10 underline underline-offset-4',
  }
  const disabledClass = isDisabled
    ? 'grayscale cursor-default text-gray-700'
    : 'hover:bg-opacity-85'
  const shapeClass = {
    square: 'rounded-md',
    full: 'rounded-full',
  }
  const sizeClass = {
    sm: 'px-md py-xs text-sm',
    md: 'px-lg py-sm text-md',
    lg: 'px-xl py-sm text-lg',
    xl: 'px-2xl py-sm text-xl',
  }
  const fontWeightClass: { [key: string]: string } = {
    light: 'font-light',
    normal: 'font-normal',
    bold: 'font-bold',
  }

  return (
    <button
      className={`${variantsClass[variant]} ${sizeClass[size]} ${shapeClass[shape]} ${fontWeightClass[fontWeight]} ${disabledClass}`}
      disabled={isDisabled}
      onClick={onClick}
      {...props}
    >
      {upperCaseText}
    </button>
  )
}

export default Button
