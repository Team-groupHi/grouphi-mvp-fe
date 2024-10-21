'use client'

interface ButtonProps {
  variant?: 'solid' | 'secondary' | 'outline' | 'warn' | 'ghost'
  isDisabled?: boolean
  border?: string
  children: string
  onClick: () => void
}

const Button = ({
  variant = 'solid',
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
    ? 'grayscale cursor-not-allowed'
    : 'hover:bg-opacity-85'
  const borderClass = border ? border : 'rounded-full'

  return (
    <button
      className={`px-lg py-sm ${borderClass} ${variantsClass[variant]} ${disabledClass}`}
      onClick={onClick}
      {...props}
    >
      {upperCaseText}
    </button>
  )
}

export default Button
