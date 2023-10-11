import {ButtonHTMLAttributes, PropsWithChildren} from 'react';

import cc from 'classcat';

type ButtonView = 'default' | 'outline'| 'light';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  view?: ButtonView;
}

const BUTTON_VIEW: Record<ButtonView, HTMLButtonElement['className']> = {
  default: 'primary-gradient hover:text-white/75',
  light: 'text-black/60 text-base hover:bg-opacity-70 bg-white' ,
  outline: '!bg-transparent border border-primary hover:text-white/75',
};

export const Button = ({
  view = 'default',
  children,
  className,
  ...props
}: PropsWithChildren<Props>) => (
  <button
    className={cc([
      'flex-center whitespace-nowrap rounded-md px-8 py-2 font-medium transition-all',
      BUTTON_VIEW[view],
      (className || '')
    ])}
    {...props}
  >
    {children}
  </button>
);
