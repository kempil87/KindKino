import { useRouter } from 'next/router';

import { ValueProps } from '~/components/select/select';

export type Props = ValueProps;

export const useUrlParams = () => {
  const { pathname, query, push } = useRouter();

  const updateUrlParams = async (params: Props[]) => {
    for (const { name, value } of params) {
      await push({
        pathname,
        query: { ...query, [name]: value },
      });
    }
  };

  const resetUrl = async () => {
    await push({ pathname });
  };

  return { queryParams: query, resetUrl, updateUrlParams };
};
