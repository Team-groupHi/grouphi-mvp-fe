'use client'

interface ButtonProps {
  variant?: 'solid' | 'secondary' | 'outline' | 'warn' | 'ghost'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  isDisabled?: boolean
  border?: string
  children: string
  onClick: () => void
}

const Button = ({
  variant = 'solid',
  size = 'md',
  isDisabled,
  border,
  children,
  onClick,
  ...props
}: ButtonProps) => {
  const upperCaseText = children.toUpperCase()
  const variantsClass = {
    solid: 'bg-primary',
    secondary: 'bg-primary-light',
    outline: 'border border-gray text hover:bg-black/10',
    warn: 'bg-error text',
    ghost: 'text hover:bg-black/10',
  }
  const disabledClass = isDisabled
    ? 'grayscale cursor-default'
    : 'hover:bg-opacity-85'
  const borderClass = border ? border : 'rounded-full'
  const sizeClass = {
    sm: 'px-md py-xs text-sm',
    md: 'px-lg py-sm text-md',
    lg: 'px-xl py-sm text-lg',
    xl: 'px-2xl py-sm text-xl',
  }

  return (
    <button
      className={`${sizeClass[size]} ${variantsClass[variant]} ${borderClass} ${disabledClass}`}
      disabled={isDisabled}
      onClick={onClick}
      {...props}
    >
      {upperCaseText}
    </button>
  )
}

export default Button
