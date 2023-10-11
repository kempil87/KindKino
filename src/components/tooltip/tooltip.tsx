import {cloneElement, PropsWithChildren, ReactElement} from 'react';

import cc from 'classcat';

interface Tooltip {
    text: string,
    position?: 'top' | 'bottom'| 'bottom_left',
}

const POSITIONS = {
  bottom: 'top-[calc(100%+8px)]',
  bottom_left: 'top-[calc(100%+8px)] !-left-full',
  top: 'bottom-[calc(100%+8px)]',
};

export const Tooltip = ({text,position = 'top',children}: PropsWithChildren<Tooltip>) => (
  <div className='relative group h-fit'>
    {cloneElement(children as ReactElement)}

    <div
      className={cc([
        'absolute text-sm invisible scale-0 text-[13px] text-white/60 left-1/2 whitespace-nowrap -translate-x-1/2 bg-dark rounded z-30 px-4 py-1 hover:!invisible hover:!scale-0 group-hover:visible group-hover:scale-100 transition-all',
        POSITIONS[position]
      ])}
    >
      {text}
    </div>
  </div>
);
