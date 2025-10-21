'use client';

import * as StompJS from '@stomp/stompjs';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import { Input } from '@/components';
import { SOCKET } from '@/constants/websocket';
import { ChatMessage } from '@/types';

import Item from './Item';
import NewMessage from './NewMessage';

interface ChattingProps {
  myName: string;
  chatMessages: ChatMessage[];
  sendMessage: <T>(
    params: Omit<StompJS.IPublishParams, 'body'> & { body?: T }
  ) => void;
}

const Chatting = ({ myName, chatMessages, sendMessage }: ChattingProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesContainerRef = useRef<HTMLElement>(null);

  const [isAtBottom, setIsAtBottom] = useState(true);

  const [showNewMessage, setShowNewMessage] = useState(false);

  const handleScroll = useCallback(() => {
    const container = messagesContainerRef.current;
    if (!container) return;

    const scrollHeight = container.scrollHeight;
    const scrollTop = container.scrollTop;
    const clientHeight = container.clientHeight;
    const isBottom = scrollTop + clientHeight >= scrollHeight - 1;

    setIsAtBottom(isBottom);

    if (isBottom) {
      setShowNewMessage(false);
    }
  }, []);

  const handleSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (
      inputRef.current &&
      !e.nativeEvent.isComposing &&
      inputRef.current.value.trim().length !== 0
    ) {
      sendMessage({
        destination: `${SOCKET.ROOM.CHAT}`,
        body: {
          message: inputRef.current.value,
        },
      });
      inputRef.current.value = '';
    }
  };

  const handleNewMessageClick = () => {
    const container = messagesContainerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  };

  useEffect(() => {
    if (chatMessages.length === 0) return;

    const lastMessage = chatMessages[chatMessages.length - 1];
    const isSentByMe = lastMessage.sender === myName;
    const container = messagesContainerRef.current;

    if (!isAtBottom && !isSentByMe) {
      setShowNewMessage(true);
    }

    if (container && (isSentByMe || isAtBottom)) {
      container.scrollTop = container.scrollHeight;
    }
    handleScroll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatMessages, myName, handleScroll]);

  useEffect(() => {
    const container = messagesContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => {
        container.removeEventListener('scroll', handleScroll);
      };
    }
  }, [handleScroll]);

  return (
    <section className="h-full w-full">
      <section className="h-[calc(100%-4rem)] w-full relative">
        <section
          ref={messagesContainerRef}
          className="h-full w-full box-border bg-container-600 rounded-t-lg overflow-y-auto overflow-w-hidden"
        >
          {chatMessages.map((item, index) => (
            <Item
              key={`${item.sender}-${index}`}
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
        </section>
        {showNewMessage && (
          <section className="absolute bottom-0 w-full flex justify-center box-border p-2 pr-5">
            <NewMessage
              message={chatMessages[chatMessages.length - 1].content}
              sender={chatMessages[chatMessages.length - 1].sender}
              onClick={handleNewMessageClick}
            />
          </section>
        )}
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
