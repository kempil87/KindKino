import { apiRequest } from '~/shared/api';
import {
  ApiFilms,
  ApiFilmsAll,
  ApiFilmView,
} from '~/shared/types/api/film/film';

export const fetchFilms = {
  all: (params?: ApiFilmsAll["req"]): ApiFilmsAll["res"] =>
    apiRequest({ params, url: '/films' }),
  top: (params?: ApiFilms["req"]): ApiFilms["res"] =>
    apiRequest({ params, url: "/films/top" }),
  view: (params: ApiFilmView["req"]): ApiFilmView["res"] =>
    apiRequest({ url: `/films/${params?.id}` }),
};
