/* eslint-disable effector/mandatory-scope-binding */
import Link from 'next/link';
import {useRouter} from 'next/router';

import cc from 'classcat';
import {useUnit} from 'effector-react/effector-react.umd';

import {NAV_LINKS} from '~/shared/constants/nav-links';
import {ROUTES} from '~/shared/constants/routes-links';
import {$menu, toggleMenu} from '~/shared/store/menu';
import {modalApi} from '~/shared/store/modal';

import style from '../../styles/header.module.css';

import {Icon} from '~/components/icon/icon';
import {Logo} from '~/components/logo/logo';
import {SearchDrawer} from '~/components/search-drawer/search-drawer';

export const Header = () => {
  const {pathname} = useRouter();

  const { $menuModel, toggleMenuFn} = useUnit({
    $menuModel: $menu,
    toggleMenuFn: toggleMenu,
  });

  return (
    <div className={cc([style.header, 'app-container h-[78px]'])}>
      <button
        className="h-[12px] w-[38px] transition-all hover:opacity-75"
        onClick={() => toggleMenuFn()}
      >
        <div
          className={cc([
            style.burgerMenu,
            {[style.burgerMenuActive]: $menuModel},
          ])}
        />
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

        <Icon
          className={style.search}
          name="user"
          onClick={() => modalApi.show('auth')}
        />
      </nav>
    </div>
  );
};