import {HTMLAttributes, PropsWithChildren} from 'react';

type ButtonView = 'default' | 'outline';

interface Props extends HTMLAttributes<HTMLButtonElement> {
  view?: ButtonView;
}

const BUTTON_VIEW: Record<ButtonView, HTMLButtonElement['className']> = {
  default: 'primary-gradient',
  outline: '!bg-transparent border border-primary',
};

export const Button = ({
  view = 'default',
  children,
  className,
  ...props
}: PropsWithChildren<Props>) => (
  <button
    {...props}
    className={`
      ${className}
      inline-flex items-center justify-center whitespace-nowrap rounded-md px-8 py-2 font-medium transition-all hover:text-white/75
      ${BUTTON_VIEW[view]}`}
  >
    {children}
  </button>
);
