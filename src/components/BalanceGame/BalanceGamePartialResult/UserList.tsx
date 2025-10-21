import React from 'react';

import { cn } from '@/lib/utils';

interface UserListProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  data: string[] | string;
  className?: string;
}

const UserList = ({ title, data, className, ...props }: UserListProps) => {
  return (
    <section
      className={cn(
        'text-sm min-w-[12rem] max-w-[54rem] py-500 px-400 rounded-sm flex flex-col gap-300 items-center',
        className
      )}
      {...props}
    >
      <h1 className="text-title3">{title}</h1>
      <hr className="w-full border-white/50" />
      <section className="flex flex-col gap-300 items-center">
        {typeof data === 'string'
          ? data
          : data.map((user, index) => (
              <span
                key={user + index}
                className="text-body2"
              >
                {user}
              </span>
            ))}
      </section>
    </section>
  );
};

export default UserList;
