import React from 'react' // React 임포트 추가
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import BalanceGameQuestionCard from './BalanceGameQuestionCard'

describe('BalanceGameQuestionCard', () => {
  it('고양이를 인자로 받아서 텍스트가 있는지 검증', () => {
    render(
      <BalanceGameQuestionCard
        label="고양이"
        selectedAnimal={null}
        onSelect={() => {}}
      />
    )

    expect(screen.getByText('고양이')).toBeInTheDocument()
  })

  it('선택될 시 외곽선이 명확히 표시되는 지 검증', () => {
    render(
      <BalanceGameQuestionCard
        label="고양이"
        selectedAnimal="고양이"
        onSelect={() => {}}
      />
    )

    const section = screen.getByText('고양이').closest('section')
    expect(section).toHaveClass('border-purple-500')
  })

  it('선택되지 않을 시 외곽선이 표시되지 않는 지 검증', () => {
    render(
      <BalanceGameQuestionCard
        label="강아지"
        selectedAnimal="고양이"
        onSelect={() => {}}
      />
    )

    const section = screen.getByText('강아지').closest('section')
    expect(section).toHaveClass('border-transparent')
  })

  it('클릭 시 함수 호출이 명확히 동작하는 지 검증', () => {
    const onSelectMock = vi.fn()

    render(
      <BalanceGameQuestionCard
        label="고양이"
        selectedAnimal={null}
        onSelect={onSelectMock}
      />
    )

    const section = screen.getByText('고양이').closest('section')
    fireEvent.click(section!)

    expect(onSelectMock).toHaveBeenCalled()
  })
})
