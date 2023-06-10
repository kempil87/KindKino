import { apiRequest } from '~/shared/api';
import { ApiFilms } from '~/shared/types/api/film-top/film-top';

export const fetchFilms = {
  top: (params?: ApiFilms['req']): ApiFilms['res'] =>
    apiRequest({ params, url: '/films/top' }),
};
