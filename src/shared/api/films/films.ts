import { apiRequest } from '~/shared/api';
import {
  ApiFilms,
  ApiFilmsAll, ApiFilmSimilary, ApiFilmSSequels,
  ApiFilmView,
} from '~/shared/types/api/film/film';

export const fetchFilms = {
  all: (params?: ApiFilmsAll['req']): ApiFilmsAll['res'] =>
    apiRequest({ params, url: '/films' }),

  prequels: (params: ApiFilmSSequels['req']): ApiFilmSSequels['res'] =>
    apiRequest({ url: `/films/${params?.id}/sequels_and_prequels`, v2_1:true }),

  similary: (params: ApiFilmSimilary['req']): ApiFilmSimilary['res'] =>
    apiRequest({ url: `/films/${params?.id}/similars` }),

  top: (params?: ApiFilms['req']): ApiFilms['res'] =>
    apiRequest({ params, url: '/films/top' }),

  view: (params: ApiFilmView['req']): ApiFilmView['res'] =>
    apiRequest({ url: `/films/${params?.id}` }),
};
