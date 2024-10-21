'use client'
import BalanceGameQuestionCard from '@/components/balanceGameQuestionCard'
import { useState } from 'react'

export default function Home() {
  const [selectedAnimal, setSelectedAnimal] = useState<string | null>(null)

  const options = ['고양이', '강아지']

  const handleSelect = (option: string) => {
    setSelectedAnimal(option)
  }
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="p-4 bg-gray-900 flex items-center justify-center gap-4">
        {options.map((option) => (
          <BalanceGameQuestionCard
            key={option}
            label={option}
            selectedAnimal={selectedAnimal}
            onSelect={() => handleSelect(option)}
          />
        ))}
      </div>
    </div>
  )
}
