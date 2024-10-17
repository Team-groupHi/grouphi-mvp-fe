import React from 'react'
import { render, screen } from '@testing-library/react'
import Hello from './Hello'
import { describe, it, expect } from 'vitest'

describe('Hello component', () => {
  it('renders greeting with provided name', () => {
    render(<Hello name="World" />)
    const greetingElement = screen.getByText('Hello, World!')
    expect(greetingElement).toBeInTheDocument()
  })
})
