'use client';

import Input from '@/components/Input';
import Item from './Item';
import React, { useRef, useEffect } from 'react';
import { SOCKET } from '@/constants/websocket';
import { ChatMessage } from '@/types';
import * as StompJS from '@stomp/stompjs';

interface ChattingProps {
  myName: string;
  chatMessages: ChatMessage[];
  sendMessage: <T>(
    params: Omit<StompJS.IPublishParams, 'body'> & { body?: T }
  ) => void;
}

const Chatting = ({ myName, chatMessages, sendMessage }: ChattingProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (
      inputRef.current &&
      !e.nativeEvent.isComposing &&
      inputRef.current.value.trim().length !== 0
    ) {
      sendMessage({
        destination: `${SOCKET.ENDPOINT.ROOM.CHAT}`,
        body: {
          message: inputRef.current.value,
        },
      });
      inputRef.current.value = '';
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    //@TODO: 추후에 채팅을 실시간으로 보고 있을 때는 자동 스크롤, 위 채팅을 보고 있을 때는 자동 스크롤이 안되도록 기능 수정
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  return (
    <section className="h-[calc(100%-3rem)]">
      <section className="h-[calc(100%-4rem)] bg-container-600 rounded-t-lg overflow-auto">
        {chatMessages.map((item, index) => (
          <Item
            key={index}
            {...item}
            index={index}
            type={
              item.sender === 'system'
                ? 'system'
                : item.sender === myName
                  ? 'me'
                  : 'others'
            }
          />
        ))}
        <div ref={messagesEndRef} />
      </section>
      <section className="h-[4rem] flex justify-center items-center bg-container-600 p-3 rounded-b-lg border-solid border-t-1 border-container-400">
        <Input
          ref={inputRef}
          className="bg-container-700 border-transparent"
          placeholder="엔터 키를 눌러 채팅 전송"
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e)}
        />
      </section>
    </section>
  );
};

export default Chatting;
