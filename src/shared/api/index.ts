import Router from 'next/router';

import axios, { AxiosError, type AxiosRequestConfig } from 'axios';

import { ROUTES } from '~/shared/constants/routes-links';
import { showAlert } from '~/shared/utils/show-alert';

import { appConfig } from '../../../app-config';

interface ApiRequestProps extends AxiosRequestConfig {
  v1?: boolean;
  v2_1?: boolean;
}

export const apiRequest = async ({
  v1 = false,
  v2_1 = false,
  ...options
}: ApiRequestProps) => {
  try {
    if (Router.pathname === '/404') return;

    const urlBase = () => {
      if (v1) return 'BASE_URL_V1';
      if (v2_1) return 'BASE_URL_V2_1';

      return 'BASE_URL';
    };

    const response = await axios.request({
      baseURL: appConfig[urlBase()],
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': appConfig.key,
      },
      ...options,
    });

    return response.data;
  } catch (error) {
    const { message } = error as AxiosError;

    if (message && message.split(' ').pop() === '402') {
      await Router.push(ROUTES.error);
    }

    /** Alert оборачиватеся в !env.prod **/
    showAlert({ message, type: 'error' });
  }
};
