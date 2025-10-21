import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Label from './Label';

describe('Label Component', () => {
  it('1) font-size는 sm, font-weight는 medium의 텍스트가 잘 출력된다.', () => {
    const { container, getByText } = render(<Label>Test Label</Label>);
    expect(getByText('Test Label')).toBeInTheDocument();
    expect(container.firstChild).toHaveClass('text-sm');
    expect(container.firstChild).toHaveClass('font-medium');
  });

  it('2) 커스텀 class name을 부여할 수 있다.', () => {
    const { container } = render(
      <Label className="custom-class">Custom Class Label</Label>
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });
});
