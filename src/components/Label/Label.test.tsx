import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Label from './Label'; // Label 컴포넌트의 경로를 맞춰주세요

describe('Label Component', () => {
  it('renders with correct text', () => {
    const { getByText } = render(<Label>Test Label</Label>);
    expect(getByText('Test Label')).toBeInTheDocument();
  });

  it('applies additional class names', () => {
    const { container } = render(
      <Label className="custom-class">Custom Class Label</Label>
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('has the correct default classes', () => {
    const { container } = render(<Label>Default Class Label</Label>);
    expect(container.firstChild).toHaveClass('text-sm');
    expect(container.firstChild).toHaveClass('font-medium');
  });
});
