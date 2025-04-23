'use client';

import { ChangeEvent, useEffect, useRef, useState } from 'react';

import { Button } from '@/components/Button/Button';
import { cn } from '@/lib/utils';

interface QnaQuestionPanelProps {
  question: string;
  onSubmit: (answer: string) => void;
  isSubmitting?: boolean;
}

const MAX_CHARS = 100;

const QnaQuestionPanel = ({
  question,
  onSubmit,
  isSubmitting = false,
}: QnaQuestionPanelProps) => {
  const [answer, setAnswer] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const questionRef = useRef<HTMLDivElement>(null);

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= MAX_CHARS) {
      setAnswer(value);
    }
  };

  const handleSubmit = () => {
    if (answer.trim().length > 0 && !isSubmitting) {
      onSubmit(answer);
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [answer]);

  return (
    <div className="w-full max-w-3xl mx-auto p-6 rounded-2xl bg-container/50 flex flex-col gap-6">
      <div
        className="text-center p-4 rounded-xl overflow-y-auto backdrop-blur-sm"
        style={{ maxHeight: '30vh' }}
        ref={questionRef}
      >
        <h2 className="text-xl font-semibold break-words whitespace-pre-wrap">
          {question}
        </h2>
      </div>

      <div className="relative">
        <textarea
          ref={textareaRef}
          value={answer}
          onChange={handleTextChange}
          placeholder="답변을 입력해주세요..."
          className={cn(
            'w-full min-h-[120px] p-4 bg-container-700 rounded-xl resize-none',
            'text-base border border-transparent focus:outline-none focus:border-primary',
            'placeholder:text-muted-foreground'
          )}
          maxLength={MAX_CHARS}
        />

        <div className="absolute bottom-3 right-4 text-sm text-muted-foreground">
          {answer.length}/{MAX_CHARS}
        </div>
      </div>

      <Button
        onClick={handleSubmit}
        disabled={answer.trim().length === 0 || isSubmitting}
        className="w-full"
        size="lg"
      >
        {isSubmitting ? '제출 중...' : '제출하기'}
      </Button>
    </div>
  );
};

export default QnaQuestionPanel;
