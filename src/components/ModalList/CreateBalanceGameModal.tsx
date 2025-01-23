'use client';
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Input,
  Label,
  ModalShell,
  Slider,
} from '@/components';
import { FORM } from '@/constants/form';
import { PATH } from '@/constants/router';
import { createRoom } from '@/services/rooms';
import useRoomStore from '@/store/useRoomStore';
import useBalanceGameStore from '@/store/useBalanceGameStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface BalanceGameModalProps {
  closeModal: () => void;
  optionPropsNumber: number | string;
}

const CreateBalanceGameModal = ({
  closeModal,
  optionPropsNumber,
}: BalanceGameModalProps) => {
  const QUESTIONS_COUNT = {
    MIN: 10,
    MAX: 20,
    STEP: 2,
  };

  const formSchema = z.object({
    totalRounds: z.number().min(QUESTIONS_COUNT.MIN).max(QUESTIONS_COUNT.MAX),
    hostName: z
      .string()
      .trim()
      .min(FORM.NAME.MIN, {
        message: '닉네임은 2-15글자 이내 작성해주세요.(공백 제외)',
      })
      .max(FORM.NAME.MAX, {
        message: '닉네임은 2-15글자 이내 작성해주세요.(공백 제외)',
      }),
  });

  const router = useRouter();
  const { setRoomId, setHostName } = useRoomStore();
  const { setTotalRounds } = useBalanceGameStore();

  const createRoomMutation = useMutation({
    mutationFn: () => createRoom(optionPropsNumber.toString()),
    onSuccess: (roomId) => {
      if (roomId) {
        setRoomId(roomId);
        router.push(`${PATH.BALANCE_GAME}/${roomId}`);
      }
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      hostName: '',
      totalRounds: QUESTIONS_COUNT.MIN,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log('form values : ', values);
    setTotalRounds(values.totalRounds);
    setHostName(values.hostName);

    createRoomMutation.mutate();
    closeModal();
  };

  return (
    <ModalShell closeModal={closeModal}>
      <section>
        <span className="font-bold">방 생성하기</span>
      </section>
      <Form {...form}>
        <form
          id="create-room-form"
          className="flex flex-col px-300 py-600 gap-600"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="totalRounds"
            render={({ field: { value, onChange } }) => (
              <FormItem>
                <FormControl>
                  <section className="flex gap-500 items-center min-h-9">
                    <Label
                      className="w-24"
                      htmlFor="total-rounds"
                    >
                      질문의 개수
                    </Label>
                    <Slider
                      defaultValue={[value]}
                      onValueChange={(v) => onChange(v[0])}
                      min={QUESTIONS_COUNT.MIN}
                      max={QUESTIONS_COUNT.MAX}
                      step={QUESTIONS_COUNT.STEP}
                    />
                    <span className="w-4 text-subtitle">{value}</span>
                  </section>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="hostName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <section className="flex gap-500 items-center">
                    <Label
                      className="w-24"
                      htmlFor="nickname-input"
                    >
                      닉네임
                    </Label>
                    <section className="flex flex-col gap-200 w-full">
                      <Input
                        placeholder="2-15자 이내로 작성해주세요"
                        {...field}
                      />
                    </section>
                  </section>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <section className="flex gap-300 self-end">
            <Button type="submit">생성하기</Button>
            <Button
              variant="secondary"
              onClick={closeModal}
            >
              닫기
            </Button>
          </section>
        </form>
      </Form>
    </ModalShell>
  );
};

export default CreateBalanceGameModal;
