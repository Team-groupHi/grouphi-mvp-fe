'use client'

interface ButtonProps {
  variant?: 'solid' | 'secondary' | 'outline' | 'warn' | 'ghost'
  isDisabled?: boolean
  children: string
  onClick: () => void
}

const Button = ({
  variant = 'solid',
  children,
  onClick,
  ...props
}: ButtonProps) => {
  const upperCaseText = children.toUpperCase()
  const variantsClass = {
    solid: 'bg-primary',
    secondary: 'bg-primary-light',
    outline: 'border border-gray text',
    warn: 'bg-error text',
    ghost: 'text hover:bg-black/10',
  }

  return (
    <button
      className={`px-lg py-sm rounded-full ${variantsClass[variant]}`}
      onClick={onClick}
      {...props}
    >
      {upperCaseText}
    </button>
  )
}

export default Button
