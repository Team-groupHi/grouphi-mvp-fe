'use client'

interface ButtonProps {
  variant?: 'solid' | 'secondary' | 'outline' | 'warn' | 'ghost'
  isDisabled?: boolean
  children: string
  onClick: () => void
}

const Button = ({ variant = 'solid', children, onClick }: ButtonProps) => {
  const upperCaseText = children.toUpperCase()
  switch (variant) {
    case 'secondary':
      return (
        <button
          className="px-lg py-sm bg-primary-light rounded-full hover:opacity-85"
          onClick={onClick}
        >
          {upperCaseText}
        </button>
      )
    case 'outline':
      return (
        <button
          className="px-lg py-sm border border-gray rounded-full text hover:opacity-80"
          onClick={onClick}
        >
          {upperCaseText}
        </button>
      )
    case 'ghost':
      return (
        <button
          className="px-lg py-sm rounded-full text hover:bg-black/10"
          onClick={onClick}
        >
          {upperCaseText}
        </button>
      )
    case 'warn':
      return (
        <button
          className="px-lg py-sm bg-error rounded-full text hover:opacity-85"
          onClick={onClick}
        >
          {upperCaseText}
        </button>
      )
    case 'solid':
    default:
      return (
        <button
          className="px-lg py-sm bg-primary rounded-full hover:opacity-85"
          onClick={onClick}
        >
          {upperCaseText}
        </button>
      )
  }
}

export default Button
