import dayjs from 'dayjs';

import { DATE_FORMAT_FULL } from '~/shared/constants/formats';

export const prepareDate = (date: number, format?: string) => {
  const fm = format || DATE_FORMAT_FULL;

  return dayjs(date * 1000).format(fm);
};
