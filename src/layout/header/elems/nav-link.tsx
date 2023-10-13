import Link from 'next/link';
import {useRouter} from 'next/router';

import {NavLinkProps} from '~/shared/constants/nav-links';

import style from '~/styles/header.module.css';

export const NavLink = ({path,name}: NavLinkProps) => {
  const router = useRouter();

  const isActive = router.asPath.startsWith(path);

  return (
    <Link
      key={path}
      className={`${style.NavLink} ${isActive && style.NavLinkActive}`}
      href={path}
    >
      {name}
    </Link>
  );
};
