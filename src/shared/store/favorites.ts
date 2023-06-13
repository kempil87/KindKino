import { createEffect, createEvent, createStore, sample } from 'effector';
import Cookies from "js-cookie";

interface Props {
  kinopoiskId: number;
}

export const updateFavorites = createEvent<Props>();
export const removeFavorites = createEvent<Props>();
export const $favorites = createStore<Props[]>(
  JSON.parse(Cookies.get('favorites') || '[]')
)
  .on(updateFavorites, (state, payload) => [...state, payload])
  .on(removeFavorites, (state, { kinopoiskId }) =>
    state.filter((i) => i.kinopoiskId !== kinopoiskId)
  );

export const addFavoriteFx = createEffect((payload: Props) => {
  Cookies.set(
    'favorites',
    JSON.stringify([...JSON.parse(Cookies.get('favorites') || '[]'), payload]),
    { expires: 120 }
  );
});

export const removeFavoriteFx = createEffect(({ kinopoiskId }: Props) => {
  Cookies.set(
    "favorites",
    JSON.stringify(
      [...JSON.parse(Cookies.get("favorites") || "[]")].filter(
        (i) => i.kinopoiskId !== kinopoiskId
      )
    ),
    { expires: 120 }
  );
});

sample({
  source: updateFavorites,
  target: addFavoriteFx,
});
sample({
  source: removeFavorites,
  target: removeFavoriteFx,
});
