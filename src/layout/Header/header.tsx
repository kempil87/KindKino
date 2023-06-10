import React from 'react';
import Link from 'next/link';

import { NAV_LINKS } from '~/shared/constants/nav-links';

export const Header = () => 
// const search = useStore($search);

  (
    <div className="h-12 primary-gradient">
      <div className="flex items-center justify-between">
        <h4 >KindKino</h4>
        <div className="flex items-center gap-3">
          {NAV_LINKS.map(({ path, name }) => (
            <Link key={path} href={path}>
              {name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
;
