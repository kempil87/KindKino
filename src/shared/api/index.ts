import axios, { AxiosError, type AxiosRequestConfig } from 'axios';

import { appConfig } from '../../../appConfig';

interface ApiRequestProps extends AxiosRequestConfig {
  v1?: boolean;
}
export const apiRequest = async ({
  v1 = false,
  ...options
}: ApiRequestProps) => {
  try {
    const response = await axios.request({
      baseURL: appConfig[v1 ? 'BASE_URL_V1' : 'BASE_URL'],
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
