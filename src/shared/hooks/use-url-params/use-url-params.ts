import { useRouter } from 'next/router';

import { ValueProps } from '~/components/select/select';

export type Props = ValueProps;
interface TransitionOptions {
  locale?: string | false;
  scroll?: boolean;
  shallow?: boolean;
  unstable_skipClientCache?: boolean;
}
export const useUrlParams = () => {
  const { pathname, query, push } = useRouter();

  const updateUrlParams = async (
    params: Props[],
    pushOptions?: TransitionOptions,
  ) => {
    for (const { name, value } of params) {
      await push(
        {
          pathname,
          query: { ...query, [name]: value },
        },
        undefined,
        pushOptions,
      );
    }
  };

  const resetUrl = async () => {
    await push({ pathname });
  };

  return { queryParams: query, resetUrl, updateUrlParams };
};
