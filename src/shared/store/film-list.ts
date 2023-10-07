import { createEvent, createStore} from 'effector';

import { Film } from '~/shared/types/film/film';

export const updateFilmList = createEvent<Film[]>();
export const resetFilmList = createEvent();
export const $filmList = createStore<Film[]>([])
  .on(updateFilmList,(state, payload) => [...state,...payload])
  .reset(resetFilmList);
