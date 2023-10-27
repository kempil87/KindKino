import { Fragment } from 'react';
import Link from 'next/link';

import { ROUTES } from '~/shared/constants/routes-links';

import { Icon } from '~/components/icon/icon';

export type BreadcrumbProps = { label: string; path?: string };

interface Props {
  breadcrumbs: BreadcrumbProps[];
}
export const Breadcrumbs = ({ breadcrumbs }: Props) => {
  const initialLink = { label: 'Главная', path: ROUTES.home };

  return (
    <ul className='flex items-center'>
      {[initialLink, ...breadcrumbs].map(({ path, label }, index) => {
        if (!path)
          return (
            <span key={index} className='opacity-75'>
              {label}
            </span>
          );

        return (
          <Fragment key={index}>
            <li>
              <Link className='transition-all hover:text-primary' href={path}>
                {label}
              </Link>
            </li>
            <Icon className='mx-2.5' name='arrowLeft' size={11} />
          </Fragment>
        );
      })}
    </ul>
  );
};
