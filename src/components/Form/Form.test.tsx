import { zodResolver } from '@hookform/resolvers/zod';
import { fireEvent, render, screen } from '@testing-library/react';
import { useForm } from 'react-hook-form';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { z } from 'zod';

import { Button } from '@/components/Button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/Form';
import Input from '@/components/Input';

const MockForm = () => {
  const formSchema = z.object({
    username: z.string().min(2, {
      message: 'Username must be at least 2 characters.',
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  placeholder="shadcn"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

describe('Form 컴포넌트 테스트', () => {
  beforeEach(() => {
    render(<MockForm />);
  });

  it('1) Form 컴포넌트를 렌더링하면 Username 입력 필드가 표시된다.', () => {
    expect(screen.getByLabelText('Username')).toBeInTheDocument();
  });

  it('2) Form 컴포넌트를 렌더링하면 Submit 버튼이 표시된다.', () => {
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  it('3) Username 입력 필드에 값을 입력하면 해당 값이 반영된다.', () => {
    const input = screen.getByPlaceholderText('shadcn');
    fireEvent.change(input, { target: { value: 'typingtest' } });

    expect(input).toHaveValue('typingtest');
  });

  it('4) Username 입력 필드에 유효하지 않은 값을 입력하고 제출하면 에러 메시지가 표시되며 onSubmit이 실행되지 않는다.', async () => {
    console.log = vi.fn();

    const input = screen.getByPlaceholderText('shadcn');
    fireEvent.change(input, { target: { value: 'a' } }); // 2자 미만 입력
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    expect(
      await screen.findByText('Username must be at least 2 characters.')
    ).toBeInTheDocument();

    expect(console.log).not.toHaveBeenCalled();
  });

  it('5) Username 입력 필드에 유효한 값을 입력하고 제출하면 콘솔에 값이 출력된다.', async () => {
    console.log = vi.fn();

    const input = screen.getByPlaceholderText('shadcn');
    fireEvent.change(input, { target: { value: 'validUsername' } });
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    await screen.findByText('This is your public display name.');

    expect(console.log).toHaveBeenCalledWith({ username: 'validUsername' });
  });
});
