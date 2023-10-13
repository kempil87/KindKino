import {useCallback, useRef} from 'react';

import cc from 'classcat';

import {useScroll} from '~/shared/hooks/use-scroll/use-scroll';

import {Button} from '~/components/button/button';
import {Icon} from '~/components/icon/icon';

export const Anchor = () => {
  const anchorRef = useRef<HTMLDivElement>(null);

  const callback = useCallback((scrollTop:number) => {
    if (anchorRef.current ) {
      if (scrollTop >= 200) {
        anchorRef.current.classList.remove('opacity-0');
        anchorRef.current.classList.remove('invisible');
      } else {
        anchorRef.current.classList.add('opacity-0');
        anchorRef.current.classList.add('invisible');
      }
    }
  }, []);

  const {toTop} = useScroll({callback});

  return (
    <div
      ref={anchorRef}
      className={cc(['fixed right-10 opacity-0  invisible transition-all bottom-10 z-[999]'])}
    >
      <Button className='!p-4 hover:bg-opacity-100 custom-shadow-primary group hover:!bg-white' view='light' onClick={toTop}>
        <Icon className='rotate-90 group-hover:scale-125 transition-all' name='arrow_long' size={20} />
      </Button>
    </div>

  );
};
