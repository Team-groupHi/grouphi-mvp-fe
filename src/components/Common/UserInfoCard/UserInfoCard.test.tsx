import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import UserInfoCard from './UserInfoCard';

describe('UserInfoCard 테스트 코드', () => {
  it('1) 준비 상태이면 배경색이 bg-primary/50 로 변한다.', () => {
    render(
      <UserInfoCard
        name="테스트"
        isReady={true}
      />
    );

    const element = screen.getByText('테스트');
    const grandparentElement = element.parentElement?.parentElement;
    if (grandparentElement) {
      expect(grandparentElement.className).toContain('bg-primary/50');
    }
  });
});
