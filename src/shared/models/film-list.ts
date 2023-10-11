import {createEffect, createEvent, createStore, sample} from 'effector';

import { Film } from '~/shared/types/film/film';

export const setFilmsList = createEvent<Film[]>();
export const addNotOffer = createEvent<number>();
export const updateFilmList = createEvent<Film[]>();
export const resetFilmList = createEvent();

export const $filmList = createStore<Film[]>([])
  .on(addNotOffer,(state, payload) => state.filter(el => el.kinopoiskId !== payload))
  .on(setFilmsList,(_, payload) => payload)
  .on(updateFilmList,(state, payload) => [...state,...payload])
  .reset(resetFilmList);

const addNotOfferFx = createEffect(() => {
  // Cookies.remove('profile');
});

sample({
  source: addNotOffer,
  target: [addNotOfferFx],
});
