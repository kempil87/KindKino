import { cloneElement, PropsWithChildren, ReactElement } from 'react';

import cc from 'classcat';

interface Tooltip {
  text: string;
  disable?: boolean;
  position?: 'top' | 'bottom' | 'bottom_left';
}

const POSITIONS = {
  bottom: 'top-[calc(100%+8px)]',
  bottom_left: 'top-[calc(100%+8px)] !-left-full',
  top: 'bottom-[calc(100%+8px)]',
};

export const Tooltip = ({
  text,
  position = 'top',
  children,
  disable = false,
}: PropsWithChildren<Tooltip>) => (
  <div className={cc(['relative h-fit', { group: !disable }])}>
    {cloneElement(children as ReactElement)}

    <div
      className={cc([
        'pointer-events-none invisible absolute left-1/2 z-30 -translate-x-1/2 scale-0 whitespace-nowrap rounded bg-dark px-4 py-1 text-[13px] text-sm text-white/60 transition-all custom-shadow hover:!invisible hover:!scale-0 group-hover:visible group-hover:scale-100',
        POSITIONS[position],
      ])}
    >
      {text}
    </div>
  </div>
);
