import axios, { AxiosError, type AxiosRequestConfig } from 'axios';

import { appConfig } from '../../../appConfig';

export const apiRequest = async ({ ...options }: AxiosRequestConfig) => {
  try {
    const response = await axios.request({
      baseURL: appConfig.BASE_URL,
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': appConfig.key,
      },
      ...options,
    });

    return response.data;
  } catch (error) {
    const { message } = error as AxiosError;

    console.error(message);
  }
};
