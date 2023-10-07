import { Fragment, PropsWithChildren } from 'react';
import Head from 'next/head';

import { useQuery } from '@tanstack/react-query';
import cc from 'classcat';

import { fetchFilters } from '~/shared/api/filters/filters';
import {useAuthorized} from '~/shared/hooks/use-authorized/use-authorized';

import { AuthModal } from '~/components/auth-modal/auth-modal';
import { Footer } from '~/layout/footer/footer';
import { Header } from '~/layout/header/header';
interface Props {
  classNameContent?: string;
  headProps?: {
    title: string;
  };
}
export const MainLayout = ({
  classNameContent,
  children,
  headProps,
}: PropsWithChildren<Props>) => {
  useQuery({ queryFn: () => fetchFilters(), queryKey: ['filters'] });
  useAuthorized();

  return (
    <Fragment>
      <Head>
        <title>{headProps?.title || 'KindKino'}</title>
        <meta content="KindKino" name="KindKino" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <Header />

      <div
        className={cc(['pt-[78px]', classNameContent])}
      >
        {children}
      </div>

      <AuthModal />
      <Footer />
    </Fragment>
  );
};
