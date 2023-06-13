import { queryClient } from '~/pages/_app';
import { FilterProps } from "~/shared/types/api/filter/filter";
import { FilmsResponse } from "~/shared/types/film/film";

export const useQueriesData = () => ({
  filters: queryClient.getQueryData(['filters']) as FilterProps | undefined,
  topList: queryClient.getQueryData(['top-list']) as FilmsResponse,
});
