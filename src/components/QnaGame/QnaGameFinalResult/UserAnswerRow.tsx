import { Heart } from 'lucide-react';

import { QnaGameAnswerResponse } from '@/types/api';

interface UserAnswerRowProps {
  user: QnaGameAnswerResponse;
}

const UserAnswerRow = ({ user }: UserAnswerRowProps) => {
  return (
    <section className="flex items-center p-3 bg-primary/10 rounded-xl min-h-3">
      <div className="flex flex-col items-center justify-center min-w-14">
        <Heart className="w-6 h-6 fill-current text-secondary-500" />
        <span className="text-title3">{user.likes}</span>
      </div>

      <div className="p-2 w-36">
        <span className="text-body2 font-medium opacity-80 block">
          {user.name}
        </span>
      </div>

      <div className="text-secondary-500/70 mr-3 flex items-center self-stretch">
        <div className="h-full w-px bg-gray-400/50" />
      </div>

      <div className="flex-1 min-w-44">
        <span className="text-body1 text-base break-words whitespace-pre-wrap">
          {user.answer}
        </span>
      </div>
    </section>
  );
};

export default UserAnswerRow;
