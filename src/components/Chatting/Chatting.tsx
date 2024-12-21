'use client';

import Input from '@/components/Input';
import Item from './Item';
import React, { useRef, useEffect } from 'react';

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
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (inputRef.current && !e.nativeEvent.isComposing) {
        //@TODO: 추후에 소켓 통신으로 로직 변경
        console.log('Submitted:', inputRef.current.value);
        inputRef.current.value = '';
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  useEffect(() => {
    //@TODO: 추후에 소켓 연결 후 채팅을 실시간으로 보고 있을 때는 자동 스크롤, 위 채팅을 보고 있을 때는 자동 스크롤이 안되도록 기능 수정
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <section className="h-4/5">
      <section className="bg-container-600 rounded-t-lg h-4/5 overflow-auto">
        {messages.map((item, index) => (
          <Item
            key={index}
            {...item}
            index={index}
            type={
              item.name === 'system'
                ? 'system'
                : item.name === myName
                  ? 'me'
                  : 'others'
            }
          />
        ))}
        <div ref={messagesEndRef} />
      </section>
      <section className="bg-container-600 p-3 rounded-b-lg border-solid border-t-1 border-container-400">
        <Input
          ref={inputRef}
          className="bg-container-700 border-transparent"
          placeholder="엔터 키를 눌러 채팅 전송"
          onKeyDown={handleSubmit}
        />
      </section>
    </section>
  );
};

export default Chatting;
