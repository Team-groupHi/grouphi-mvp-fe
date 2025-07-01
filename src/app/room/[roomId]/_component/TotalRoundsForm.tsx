import { zodResolver } from '@hookform/resolvers/zod';
import { MutableRefObject, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Label,
  Slider,
} from '@/components';
import { GAME_QUESTIONS_COUNT, totalRoundsSchema } from '@/constants/form';
import { GameType } from '@/types/form';

interface TotalRoundsFormProps {
  gameType: GameType;
  totalRoundsRef: MutableRefObject<number>;
}

const TotalRoundsForm = ({
  gameType,
  totalRoundsRef,
}: TotalRoundsFormProps) => {
  const QUESTIONS_COUNT = GAME_QUESTIONS_COUNT[gameType];

  const formSchema = totalRoundsSchema({
    min: QUESTIONS_COUNT.MIN,
    max: QUESTIONS_COUNT.MAX,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      totalRounds: QUESTIONS_COUNT.MIN,
    },
  });

  const totalRounds = form.watch('totalRounds');

  useEffect(() => {
    const onChange = (values: z.infer<typeof formSchema>) => {
      totalRoundsRef.current = values.totalRounds;
    };

    onChange({ totalRounds });
  }, [totalRounds, totalRoundsRef]);

  return (
    <section className="w-full max-w-md">
      <Form {...form}>
        <form
          id="create-room-form"
          className="flex flex-col pb-300 gap-600 w-full"
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
        </form>
      </Form>
    </section>
  );
};

export default TotalRoundsForm;
