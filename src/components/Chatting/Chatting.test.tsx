import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Chatting from './Chatting';

describe('채팅 컴포넌트 테스트', () => {
  it('1) 내가 채팅을 치면 primary 색의 텍스트를 출력한다.', () => {
    const DUMMY = [
      {
        sender: '한나',
        content:
          '채팅어쩌공채팅어쩌공채팅어쩌공채팅어쩌공채팅어쩌공채팅어쩌공쩌공채팅어쩌공채팅어쩌공채팅어쩌공채팅어쩌공',
      },
      {
        sender: '개울가의 나뭇잎',
        content: '나야나~',
      },
      {
        sender: 'system',
        content: '시스템 알림!',
      },
    ];

    render(
      <Chatting
        chatMessages={DUMMY}
        myName="개울가의 나뭇잎"
        sendMessage={() => {}}
      />
    );

    const element = screen.getByText('개울가의 나뭇잎');
    const grandparentElement = element.parentElement?.parentElement;
    if (grandparentElement) {
      expect(grandparentElement.className).toContain('text-primary-400');
    }
  });

  it('2) 시스템 알림이 오면 primary 색의 텍스트와 primary/20 배경을 출력한다.', () => {
    const DUMMY = [
      {
        sender: 'system',
        content: '시스템 알림!',
      },
    ];

    render(
      <Chatting
        chatMessages={DUMMY}
        myName="개울가의 나뭇잎"
        sendMessage={() => {}}
      />
    );

    const element = screen.getByText('시스템 알림!');
    const parentElement = element.parentElement;
    if (parentElement) {
      expect(parentElement.className).toContain('text-primary-400');
      expect(parentElement.className).toContain('bg-primary/20');
    }
  });
  //@TODO: 추후에 채팅 컴포넌트 소켓 연결 시 input 동작 테스트 작성
});
