/* eslint-disable effector/mandatory-scope-binding */
import Link from 'next/link';
import {useRouter} from 'next/router';

import cc from 'classcat';
import {useUnit} from 'effector-react/scope';

import {NAV_LINKS} from '~/shared/constants/nav-links';
import {ROUTES} from '~/shared/constants/routes-links';
import {$menu, toggleMenu} from '~/shared/models/menu';
import {showModal} from '~/shared/models/modal';
import {$profile} from '~/shared/models/profile';

import style from '../../styles/header.module.css';

import {Icon} from '~/components/icon/icon';
import {Logo} from '~/components/logo/logo';
import {ProfileMenu} from '~/components/profile-menu/profile-menu';
import {SearchDrawer} from '~/components/search-drawer/search-drawer';

export const Header = () => {
  const {pathname} = useRouter();

  const {showModalFn,$profileModel} = useUnit({
    $menuModel: $menu,
    $profileModel: $profile,
    showModalFn: showModal,
    toggleMenuFn: toggleMenu,
  });

  return (
    <div className={cc([style.header, 'app-container h-[78px]'])}>
      {/*<button*/}
      {/*  className="h-[12px] children:cursor-pointer w-[38px] transition-all hover:opacity-75"*/}
      {/*  onClick={() => toggleMenuFn()}*/}
      {/*>*/}
      {/*  <div*/}
      {/*    className={cc([*/}
      {/*      style.burgerMenu,*/}
      {/*      {[style.burgerMenuActive]: $menuModel},*/}
      {/*    ])}*/}
      {/*  />*/}
      {/*</button>*/}

      <button>
        <div />
        <div />
        <div />
      </button>

      <Logo path={ROUTES.home}/>

      <nav className="flex items-center gap-5">
        {NAV_LINKS.map(({path, name}) => {
          const isActive = path === pathname;

          return (
            <Link
              key={path}
              className={`${style.NavLink} ${isActive && style.NavLinkActive}`}
              href={path}
            >
              {name}
            </Link>
          );
        })}

        <SearchDrawer />

        {$profileModel ? (
          <ProfileMenu />
        ): (
          <Icon
            className={style.search}
            name="user"
            onClick={() => showModalFn('auth')}
          />
        )}

      </nav>
    </div>
  );
};
