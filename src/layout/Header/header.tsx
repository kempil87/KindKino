import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import cc from "classcat";
import { useStore } from 'effector-react';

import { Icon } from "~/components/icon/icon";
import { Logo } from "~/components/logo/logo";

import style from "../../styles/header.module.css";

import { NAV_LINKS } from "~/shared/constants/nav-links";
import { ROUTES } from "~/shared/constants/routes-links";
import { $menu, toggleMenu } from "~/shared/store/menu";
import { modalApi } from '~/shared/store/modal';
import { $search, hideSearch, showSearch } from '~/shared/store/search';

export const Header = () => {
  const { pathname } = useRouter();
  const searchVisible = useStore($search);
  const menuVisible = useStore($menu);

  return (
    <div className={cc([style.header, 'app-container h-[78px]'])}>
      <div
        className="h-[12px] w-[38px]  cursor-pointer transition-all hover:opacity-75"
        onClick={() => toggleMenu()}
      >
        <div
          className={cc([
            style.burgerMenu,
            { [style.burgerMenuActive]: menuVisible },
          ])}
        />
      </div>

      <Logo path={ROUTES.home} />

      <nav className="flex items-center gap-5">
        {NAV_LINKS.map(({ path, name }) => {
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

        <Icon
          className={style.search}
          name={searchVisible ? "close" : "search"}
          onClick={() => (searchVisible ? hideSearch() : showSearch())}
        />

        <Icon
          className={style.search}
          name="user"
          onClick={() => modalApi.show('auth')}
        />
      </nav>
    </div>
  );
};
