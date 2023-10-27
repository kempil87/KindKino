import { ButtonHTMLAttributes, PropsWithChildren } from 'react';

import cc from 'classcat';

import { BUTTON_VIEW } from '~/shared/constants/button-views';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  view?: keyof typeof BUTTON_VIEW;
}

export const Button = ({
  view = 'default',
  children,
  className,
  ...props
}: PropsWithChildren<Props>) => (
  <button
    className={cc([
      'whitespace-nowrap rounded-md px-8 py-2 font-medium transition-all flex-center',
      BUTTON_VIEW[view],
      className || '',
    ])}
    {...props}
  >
    {children}
  </button>
);
