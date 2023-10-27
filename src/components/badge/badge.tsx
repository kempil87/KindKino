import { PropsWithChildren } from 'react';

interface Badge {
  count: number;
  overflowCount?: number;
}

export const Badge = ({
  count,
  overflowCount,
  children,
}: PropsWithChildren<Badge>) => {
  if (!count) return children;

  return (
    <div className='relative'>
      {children}

      <div className='absolute right-0 top-0 h-fit w-fit -translate-y-1/2 translate-x-1/2 rounded bg-red-500 px-1 text-xs font-medium'>
        {overflowCount && count > overflowCount ? '99+' : count}
      </div>
    </div>
  );
};
