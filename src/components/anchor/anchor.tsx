import {useCallback, useEffect, useRef} from 'react';

import cc from 'classcat';

import {Button} from '~/components/button/button';
import {Icon} from '~/components/icon/icon';

export const Anchor = () => {
  const anchorRef = useRef<HTMLDivElement>(null);

  const callback = useCallback(() => {
    const { scrollTop } = document.body;

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

  const goTop = () => {
    document.body.scrollTo(0, 0);
  };

  useEffect(() => {
    document.body.addEventListener('scroll', callback);

    return () => document.body.removeEventListener('scroll', callback);
  });

  return (
    <div
      ref={anchorRef}
      className={cc(['fixed right-10 opacity-0 invisible transition-all bottom-10 z-[999]'])}
    >
      <div className='primary-gradient p-0.5 rounded-md group'>
        <Button className='!p-4 hover:bg-opacity-100 ' view='light' onClick={goTop}>
          <Icon className='rotate-90 group-hover:scale-125 transition-all' name='arrow_long' size={20} />
        </Button>
      </div>
    </div>

  );
};
