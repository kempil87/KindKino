import dayjs from 'dayjs';

import { apiRequest } from '~/shared/api';
import {
  ApiFilmFacts,
  ApiFilms,
  ApiFilmsAll,
  ApiFilmSimilary,
  ApiFilmsPremiers,
  ApiFilmSSequels,
  ApiFilmView,
} from '~/shared/types/api/film/film';

export const fetchFilms = {
  all: (params?: ApiFilmsAll['req']): ApiFilmsAll['res'] =>
    apiRequest({ params, url: '/films' }),

  facts: (params: ApiFilmView['req']): ApiFilmFacts['res'] =>
    apiRequest({ url: `/films/${params?.id}/facts` }),

  premieres: (): ApiFilmsPremiers['res'] =>
    apiRequest({
      params: {
        month: dayjs().locale('en').format('MMMM').toUpperCase(),
        year: dayjs().year(),
      },
      url: '/films/premieres',
    }),

  prequels: (params: ApiFilmSSequels['req']): ApiFilmSSequels['res'] =>
    apiRequest({
      url: `/films/${params?.id}/sequels_and_prequels`,
      v2_1: true,
    }),

  similary: (params: ApiFilmSimilary['req']): ApiFilmSimilary['res'] =>
    apiRequest({ url: `/films/${params?.id}/similars` }),

  top: (params?: ApiFilms['req']): ApiFilms['res'] =>
    apiRequest({ params, url: '/films/top' }),

  view: (params: ApiFilmView['req']): ApiFilmView['res'] =>
    apiRequest({ url: `/films/${params?.id}` }),
};
