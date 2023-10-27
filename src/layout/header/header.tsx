/* eslint-disable effector/mandatory-scope-binding */

import { useRef } from 'react';

import cc from 'classcat';
import { useUnit } from 'effector-react/scope';

import { NAV_LINKS } from '~/shared/constants/nav-links';
import { ROUTES } from '~/shared/constants/routes-links';
import { useScroll } from '~/shared/hooks/use-scroll/use-scroll';
import { $menu, toggleMenu } from '~/shared/models/menu';
import { showModal } from '~/shared/models/modal';
import { $profile } from '~/shared/models/profile';

import style from '../../styles/header.module.css';

import { Icon } from '~/components/icon/icon';
import { Logo } from '~/components/logo/logo';
import { Notifications } from '~/components/notifications/notifications';
import { ProfileMenu } from '~/components/profile-menu/profile-menu';
import { SearchDrawer } from '~/components/search-drawer/search-drawer';
import { NavLink } from '~/layout/header/elems/nav-link';

export const Header = () => {
  const { showModalFn, profileModel, menuModel, toggleMenuFn } = useUnit({
    menuModel: $menu,
    profileModel: $profile,
    showModalFn: showModal,
    toggleMenuFn: toggleMenu,
  });

  const headerRef = useRef<HTMLHeadElement>(null);

  const callback = (top: number) => {
    if (headerRef.current) {
      if (top) {
        headerRef.current.classList.add(style.headerActive);

        return;
      }
      headerRef.current.classList.remove(style.headerActive);
    }
  };

  useScroll({ callback });

  return (
    <header
      ref={headerRef}
      className={cc([style.header, 'app-container h-[78px]'])}
    >
      <Logo path={ROUTES.home} />

      <button
        className={cc([style.menu, { [style.menuActive]: menuModel }])}
        onClick={toggleMenuFn}
      />

      <nav className='flex items-center gap-3.5 max-menu:hidden'>
        {NAV_LINKS.map((props) => (
          <NavLink key={props.path} {...props} />
        ))}

        <SearchDrawer />

        <Notifications />

        {profileModel ? (
          <ProfileMenu />
        ) : (
          <button
            className={style.headerButton}
            onClick={() => showModalFn('auth')}
          >
            <Icon className={style.search} name='user' />
          </button>
        )}
      </nav>
    </header>
  );
};
