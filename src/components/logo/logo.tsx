import React, {Fragment, HTMLProps} from 'react';
import Link from 'next/link';

import cc from 'classcat';

import style from '~/styles/header.module.css';
interface Props extends HTMLProps<HTMLLinkElement> {
  path?: string;
}
export const Logo = ({ path, className }: Props) => {
  const renderContent = () => (
    <Fragment>
      <div className={style.logoLeft}>Кинд</div>
      <div className={style.logoRight}>Кино</div>
    </Fragment>
  );

  if (!path) {
    return (
      <div className={cc([style.logo, className, '!cursor-default'])}>
        {renderContent()}
      </div>
    );
  }

  return (
    <Link
      className={cc([style.logo, className])}
      href={path}
    >
      {renderContent()}
    </Link>
  );
};
