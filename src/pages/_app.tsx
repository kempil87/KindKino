import type { AppProps } from 'next/app';

import { QueryClient } from '@tanstack/query-core';
import { QueryClientProvider } from '@tanstack/react-query';
import dayjs from "dayjs";
import { Toaster } from 'react-hot-toast';

import { AppLoader } from "~/components/app-loader/app-loader";

import './../styles/globals.css';
import 'keen-slider/keen-slider.min.css';
import "react-loading-skeleton/dist/skeleton.css";

import 'dayjs/locale/ru';

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

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />

      <Toaster position="top-right" />
      <AppLoader />
    </QueryClientProvider>
  );
}
