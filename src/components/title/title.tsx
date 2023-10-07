import {HTMLAttributes, PropsWithChildren} from 'react';

import cc from 'classcat';

type Props = PropsWithChildren & HTMLAttributes<HTMLDivElement>

export const Title = ({children,...props}:Props ) => (
  <div {...props} className={cc(['text-2xl font-medium',props.className])}>
    {children}
  </div>
);
