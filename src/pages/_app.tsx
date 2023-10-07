import {useMemo} from 'react';
import type { AppProps } from 'next/app';

import { QueryClient } from '@tanstack/query-core';
import { QueryClientProvider } from '@tanstack/react-query';
import dayjs from 'dayjs';
import {fork, Scope, serialize} from 'effector';
import {Provider} from 'effector-react/scope';
import { Toaster } from 'react-hot-toast';

import './../styles/globals.css';

import 'dayjs/locale/ru';
import { AppLoader } from '~/components/app-loader/app-loader';

dayjs.locale('ru-RU');

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: Number.POSITIVE_INFINITY,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: Number.POSITIVE_INFINITY,
    },
  },
});

let clientScope: Scope;

export default function App({ Component, pageProps }: AppProps) {

  const scope = useMemo(
    () =>
      fork({
        values: {
          ...(clientScope && serialize(clientScope)),
          ...pageProps?.initialState,
        },
      }),
    [pageProps?.initialState],
  );

  if (typeof window !== 'undefined') {
    clientScope = scope;
  }

  return (
    <Provider value={scope}>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />

        <Toaster position="top-right" />
        <AppLoader />
      </QueryClientProvider>
    </Provider>
  );
}
