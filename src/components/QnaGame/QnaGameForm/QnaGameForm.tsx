'use client';

import { ChangeEvent, useState } from 'react';

import { Button } from '@/components';
import { cn } from '@/lib/utils';

interface QnaGameFormProps {
  question: string;
  onSubmit: (answer: string) => void;
}

const MAX_CHARS = 100;

const QnaGameForm = ({ question, onSubmit }: QnaGameFormProps) => {
  const [answer, setAnswer] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= MAX_CHARS) {
      setAnswer(value);
    }
  };

  const handleSubmit = () => {
    if (answer.trim().length > 0) {
      onSubmit(answer);
      setIsSubmitted(true);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col gap-6">
      <div className="text-center p-4 rounded-xl overflow-y-auto backdrop-blur-sm max-h-[20rem]">
        <h2 className="text-xl font-semibold break-words whitespace-pre-wrap">
          {question}
        </h2>
      </div>

      <div className="relative">
        <textarea
          value={answer}
          disabled={isSubmitted}
          onChange={handleTextChange}
          placeholder="답변을 입력해주세요..."
          className={cn(
            'w-full min-h-[7.5rem] p-4 bg-container-700 rounded-xl resize-none',
            'text-base border border-transparent focus:outline-none focus:border-primary',
            'placeholder:text-muted-foreground'
          )}
          maxLength={MAX_CHARS}
        />

        <div className="absolute bottom-3 right-4 text-sm">
          {answer.length}/{MAX_CHARS}
        </div>
      </div>

      <Button
        onClick={handleSubmit}
        disabled={answer.trim().length === 0 || isSubmitted}
        className="w-full"
        size="lg"
      >
        {isSubmitted ? '제출 완료' : '제출 하기'}
      </Button>
    </div>
  );
};

export default QnaGameForm;
