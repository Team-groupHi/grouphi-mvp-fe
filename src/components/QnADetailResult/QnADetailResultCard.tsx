import { HeartIcon } from 'lucide-react';

import { Input } from '@/components';

interface QnADetailResultCardProps {
  nickname: string;
  answer: string;
}

const QnADetailResultCard = ({
  nickname,
  answer,
}: QnADetailResultCardProps) => {
  return (
    <>
      <section className="flex gap-400">
        <div className="flex justify-center items-center text-title3 nickname-card w-[15rem] bg-gradient-purple rounded-lg">
          {nickname}
        </div>
        <Input
          value={answer}
          readOnly
        />
        <div>
          <HeartIcon />
        </div>
      </section>
    </>
  );
};

export default QnADetailResultCard;
