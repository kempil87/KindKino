import React, {MouseEvent, useState} from 'react';
import Link from 'next/link';

import cc from 'classcat';
import {useUnit} from 'effector-react/scope';

import {ROUTES} from '~/shared/constants/routes-links';
import {showAlert} from '~/shared/helpers/show-alert';
import {uppercaseFirstLetter} from '~/shared/helpers/uppercase-first-letter';
import {
  $favorites,
  removeFavorites,
  updateFavorites,
} from '~/shared/store/favorites';
import {Film} from '~/shared/types/film/film';

import imagePlug from '../../../public/images/images.jpeg';

import style from './film-card.module.css';

import {Icon} from '~/components/icon/icon';

export const FilmCard = (props: Film) => {
  const [imageLoading, setImageLoading] = useState(true);
  const {$favoritesModel, updateFavoritesFn, removeFavoritesFn} = useUnit({
    $favoritesModel: $favorites,
    removeFavoritesFn: removeFavorites,
    updateFavoritesFn: updateFavorites
  });

  const isFavorite = $favoritesModel
    .flatMap((i) => [i.kinopoiskId])
    .includes(props.kinopoiskId);

  const handleAddFavorites = (e: MouseEvent) => {
    e.preventDefault();
    const {kinopoiskId, nameRu} = props;

    if (isFavorite) {
      removeFavoritesFn({kinopoiskId});
      showAlert({
        message: `Фильм ${nameRu} успешно удален из избранных!`,
      });

      return;
    }

    updateFavoritesFn({kinopoiskId});
    showAlert({
      message: `Фильм ${nameRu} успешно добавлен в избранное!`,
    });
  };

  const onImageLoad = () => {
    setImageLoading(false);
  };

  return (
    <Link
      className={style.filmCard}
      href={ROUTES.film(String(props.kinopoiskId))}
    >
      <div className='overflow-hidden rounded-2xl'>
        <img
          alt={props.nameRu}
          className={cc(['h-[330px] rounded-2xl object-cover transition-all', {'brightness-50': imageLoading}])}
          src={imageLoading ? imagePlug.src : props.posterUrl}
          onLoad={onImageLoad}
        />
      </div>

      <div
        className="absolute left-3 right-3 top-3 flex justify-between  opacity-0 transition-all"
        id="rating"
      >
        <div className="flex flex-col space-y-2">
          {props.ratingImdb && (
            <div className="flex items-center gap-3">
              <div
                className={cc([
                  {[style.highRate]: +props.ratingImdb > 8},
                  'rounded-md bg-white px-2.5 py-0.5 font-medium text-black',
                ])}
              >
                {props.ratingImdb}
              </div>
              <span className="text-sm font-normal">Imdb</span>
            </div>
          )}

          {props.ratingKinopoisk && (
            <div className="flex items-center gap-3">
              <div
                className={cc([
                  {[style.highRate]: +props.ratingKinopoisk > 8},
                  'rounded-md bg-white px-2.5 py-0.5 font-medium text-black',
                ])}
              >
                {props.ratingKinopoisk}
              </div>
              <span className="text-sm font-normal">Кинопоиск</span>
            </div>
          )}
        </div>

        <Icon
          name="bookmark"
          size={23}
          className={cc([
            {'text-primary': isFavorite},
            'cursor-pointer transition-all hover:text-primary',
          ])}
          onClick={handleAddFavorites}
        />
      </div>

      <div
        className="absolute bottom-[20%] left-3 right-3 space-y-2 opacity-0 transition-all"
        id="genres"
      >
        <div className="flex w-full flex-wrap items-center justify-center gap-2">
          {props.genres.slice(0, 3).map(({genre}) => (
            <div
              key={genre}
              className="primary-gradient rounded-md px-2 py-0.5 text-sm font-normal "
            >
              {uppercaseFirstLetter(genre)}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-3">
        <div className="line-clamp-1 break-all text-center">
          {props.nameRu || props.nameEn}
        </div>
        <p className="text-center text-sm opacity-75">{props.year}</p>
      </div>
    </Link>
  );
};
