import React, { HTMLProps } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import cc from 'classcat';

import style from '~/styles/header.module.css';
interface Props extends HTMLProps<HTMLLinkElement> {
  path?: string;
}
export const Logo = ({ path, className }: Props) => {
  const { pathname } = useRouter();

  return (
    <Link
      className={cc([style.logo, className, { 'cursor-default': !path }])}
      href={path || pathname}
    >
      <div className={style.logoLeft}>Кинд</div>
      <div className={style.logoRight}>Кино</div>
    </Link>
  );
};
