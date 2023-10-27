import cc from 'classcat';

interface Props {
  className?: HTMLElement['className'];
}

export const Divider = ({ className }: Props) => (
  <div
    className={cc([
      'my-2 h-px w-full bg-gradient-to-r from-[#3f414b00] via-[#3F414B] to-[#3f414b00]',
      className,
    ])}
  />
);
