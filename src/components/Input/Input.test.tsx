// Input.test.tsx
import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Input from './Input'

describe('Input Component', () => {
  it('changes value when typed into', () => {
    render(<Input placeholder="Type here" />)

    const inputElement = screen.getByPlaceholderText('Type here')
    fireEvent.change(inputElement, { target: { value: 'Hello World' } })

    expect(inputElement).toHaveValue('Hello World')
  })

  it('renders with correct placeholder', () => {
    render(<Input placeholder="Enter text" />)

    const inputElement = screen.getByPlaceholderText('Enter text')
    expect(inputElement).toBeInTheDocument()
    expect(inputElement).toHaveClass('rounded-md')
  })

  it('accepts custom className', () => {
    render(<Input className="custom-class" />)

    const inputElement = screen.getByRole('textbox')
    expect(inputElement).toHaveClass('custom-class')
  })

  it('renders as disabled when disabled prop is true', () => {
    render(<Input disabled />)

    const inputElement = screen.getByRole('textbox')
    expect(inputElement).toBeDisabled()
  })

  it('handles focus and blur events', () => {
    const handleFocus = vi.fn()
    const handleBlur = vi.fn()

    render(
      <Input
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    )

    const inputElement = screen.getByRole('textbox')

    // Focus 이벤트 테스트
    inputElement.focus()
    expect(handleFocus).toHaveBeenCalledTimes(1)

    // Blur 이벤트 테스트
    inputElement.blur()
    expect(handleBlur).toHaveBeenCalledTimes(1)
  })

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLInputElement>()
    render(<Input ref={ref} />)

    const inputElement = screen.getByRole('textbox')
    expect(ref.current).toBe(inputElement)
  })

  it('applies additional props correctly', () => {
    render(
      <Input
        type="password"
        placeholder="Enter password"
      />
    )

    // password는 textbox 역할을 갖지 않기 때문에 getByPlaceholderText를 사용하여 요소 찾기
    const inputElement = screen.getByPlaceholderText('Enter password')
    expect(inputElement).toHaveAttribute('type', 'password')
  })
})
