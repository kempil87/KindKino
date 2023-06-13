import React, { Fragment, PropsWithChildren } from "react";
import Head from 'next/head';

import { useQuery } from '@tanstack/react-query';
import cc from "classcat";

import { SearchDrawer } from "~/components/search-drawer/search-drawer";

import { Footer } from "~/layout/Footer/footer";
import { Header } from "~/layout/Header/header";
import { fetchFilters } from '~/shared/api/filters/filters';
import { hideSearch } from '~/shared/store/search';
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
  useQuery({ queryFn: () => fetchFilters(), queryKey: ["filters"] });

  return (
    <Fragment>
      <Head>
        <title>{headProps?.title || 'KindKino'}</title>
        <meta content="KindKino" name="KindKino" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <link href="/favicon.ico" rel="icon" />
      </Head>
      <SearchDrawer />

      <Header />

      <div
        className={cc(["pt-[78px]", classNameContent])}
        onClick={() => hideSearch()}
      >
        {children}
      </div>

      <Footer />
    </Fragment>
  );
};
