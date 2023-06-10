import React, { Fragment, PropsWithChildren } from 'react';

import cc from 'classcat';

import { Footer } from '~/layout/Footer/Footer';
import { Header } from '~/layout/Header/Header';
interface Props {
  classNameContent?: string;
}
export const MainLayout = ({
  classNameContent,
  children,
}: PropsWithChildren<Props>) => (
  <Fragment>
    <Header />
    <div className={cc('h-full ', classNameContent)}>{children}</div>

    <Footer />
  </Fragment>
);
