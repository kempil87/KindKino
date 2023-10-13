import {HTMLAttributes, PropsWithChildren} from 'react';
import Link from 'next/link';

import cc from 'classcat';

import {Icon} from '~/components/icon/icon';

interface Props extends HTMLAttributes<HTMLDivElement> {
  path?: string
}

export const Title = ({children,path,...props}:PropsWithChildren<Props> ) => (
  <div {...props} className={cc(['text-3xl font-medium',props.className,{'flex justify-between items-center':path}])}>
    {children}

    {path && (
      <Link className='text-base group children:transition-all transition-all flex space-x-3 items-center' href={path}>
        <span>Смотреть все</span>

        <div className='group-hover:translate-x-2'>
          <Icon className='rotate-180' name='arrow_long' />
        </div>
      </Link>
    )}
  </div>
);
