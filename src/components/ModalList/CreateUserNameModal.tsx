import {
  Button,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  ModalShell,
} from '@/components';
import { STORAGE_KEY } from '@/constants/storage';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useToast } from '@/hooks/useToast';
import useModalStore from '@/store/useModalStore';
import useRoomStore from '@/store/useRoomStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const CreateUserNameModal = () => {
  const { closeModal } = useModalStore();
  const { setItem } = useLocalStorage();
  const { myName, setMyName } = useRoomStore();
  const { toast } = useToast();

  const formSchema = z.object({
    username: z
      .string()
      .trim()
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
    if (values.username === myName) {
      toast({
        title: '[알림] 닉네임 중복',
        description: '기존 닉네임과 다른 닉네임을 입력해주세요.',
      });
    } else {
      toast({
        variant: 'success',
        title: '닉네임 변경 성공',
        description: `${values.username}님, 그루파이별에 오신 것을 환영해요!`,
      });
      setMyName(values.username);
      setItem(STORAGE_KEY.NICKNAME, values.username);
      closeModal();
    }
  };

  return (
    <ModalShell closeModal={closeModal}>
      <Form {...form}>
        <form
          noValidate
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
                    placeholder={myName}
                    {...field}
                  />
                </FormControl>
                <FormDescription>2~15 글자 내로 입력해주세요.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">변경하기</Button>
        </form>
      </Form>
    </ModalShell>
  );
};

export default CreateUserNameModal;
