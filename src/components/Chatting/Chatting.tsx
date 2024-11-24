'use client';

import Input from '@/components/Input';
import Item from './Item';
import React, { useRef, useState } from 'react';

interface Message {
  name: string;
  message: string;
}

interface ChattingProps {
  messages: Message[];
  myName: string;
}

const Chatting = ({ messages, myName }: ChattingProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isComposing, setIsComposing] = useState(false);

  const handleSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (inputRef.current && !isComposing) {
        console.log('Submitted:', inputRef.current.value);
        inputRef.current.value = '';
      }
    }
  };

  return (
    <section className="h-4/5">
      <section className="bg-container-600 rounded-t-lg h-4/5 overflow-auto">
        {messages.map((item, index) => (
          <Item
            key={index}
            {...item}
            index={index}
            isSelf={myName === item.name}
            isSystem={item.name === 'system'}
          ></Item>
        ))}
      </section>
      <section className="bg-container-600 p-3 rounded-b-lg border-solid border-t-1 border-container-400">
        <Input
          ref={inputRef}
          className="bg-container-700 border-transparent"
          placeholder="엔터 키를 눌러 채팅 전송"
          onKeyDown={handleSubmit}
          onCompositionStart={() => setIsComposing(true)}
          onCompositionEnd={() => setIsComposing(false)}
        ></Input>
      </section>
    </section>
  );
};

export default Chatting;
