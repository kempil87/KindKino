import { createApi, createStore } from 'effector';

import { Film } from '~/shared/types/film/film';

export const $filmList = createStore<Film[]>([]);

export const filmListApi = createApi($filmList, {
  reset: () => [],
  set: (state, payload: Film[]) => payload,
  update: (state, payload: Film[]) => [...state, ...payload],
});

export const $filmListLoading = createStore<boolean>(true);

export const filmListLoadingApi = createApi($filmListLoading, {
  off: () => false,
  on: () => true,
});
