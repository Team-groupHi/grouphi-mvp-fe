import {
  ModalShell,
  Form,
  FormField,
  FormItem,
  FormLabel,
  Input,
  FormControl,
  FormDescription,
  FormMessage,
  Button,
} from '@/components';
import useModalStore from '@/store/useModalStore';
import useRoomStore from '@/store/useRoomStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const CreateUserNameModal = () => {
  const { closeModal } = useModalStore();
  const { setMyName } = useRoomStore();

  const formSchema = z.object({
    username: z
      .string()
      .min(2, {
        message: '닉네임은 최소 2글자 이상이어야 해요.',
      })
      .max(15, {
        message: '닉네임은 최대 15글자 이하여야 해요.',
      }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setMyName(values.username);
    closeModal();
  };

  return (
    <ModalShell>
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
                <FormLabel>닉네임</FormLabel>
                <FormControl>
                  <Input
                    placeholder="username"
                    {...field}
                  />
                </FormControl>
                <FormDescription>2~15 글자 내로 입력해주세요.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">입장하기</Button>
        </form>
      </Form>
    </ModalShell>
  );
};

export default CreateUserNameModal;
