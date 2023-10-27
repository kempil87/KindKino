/* eslint-disable @next/next/no-img-element */
import React, { MouseEvent, useState } from 'react';
import Link from 'next/link';

import cc from 'classcat';
import { useUnit } from 'effector-react/scope';

import { ROUTES } from '~/shared/constants/routes-links';
import { useAuthorized } from '~/shared/hooks/use-authorized/use-authorized';
import { showConfirm } from '~/shared/models/confirm-modal';
import {
  $favorites,
  removeFavorites,
  updateFavorites,
} from '~/shared/models/favorites';
import { addNotOffer } from '~/shared/models/film-list';
import { showModal } from '~/shared/models/modal';
import { Film } from '~/shared/types/film/film';
import { showAlert } from '~/shared/utils/show-alert';
import { uppercaseFirstLetter } from '~/shared/utils/uppercase-first-letter';

import imagePlug from '../../../public/images/images.jpeg';

import style from './film-card.module.css';

import { Icon } from '~/components/icon/icon';
import { Tooltip } from '~/components/tooltip/tooltip';

interface Props extends Film {
  eyeVisible?: boolean;
}

export const FilmCard = (props: Props) => {
  const isAuthorized = useAuthorized();
  const [imageLoading, setImageLoading] = useState(true);
  const {
    $favoritesModel,
    showModalFn,
    addNotOfferFn,
    updateFavoritesFn,
    showConfirmFn,
    removeFavoritesFn,
  } = useUnit({
    $favoritesModel: $favorites,
    addNotOfferFn: addNotOffer,
    removeFavoritesFn: removeFavorites,
    showConfirmFn: showConfirm,
    showModalFn: showModal,
    updateFavoritesFn: updateFavorites,
  });

  const isFavorite = $favoritesModel
    .flatMap((i) => [i.kinopoiskId])
    .includes(props.kinopoiskId);

  const onNotOffer = (e: MouseEvent) => {
    e.preventDefault();
    const { kinopoiskId, nameRu } = props;

    const message = `Фильм ${nameRu} заблокирован, убрать заблокированные фильмы можно из меню профиля`;

    if (!isAuthorized) {
      showModalFn('auth');

      return;
    }

    if (isFavorite) {
      showModalFn('confirm');
      showConfirmFn({
        onConfirm: () => {
          addNotOfferFn(kinopoiskId);
          showAlert({ message });
        },
        subtitle: 'Убрать из избранного и больше не предлагать',
        successButtonText: 'Убрать',
        title: 'Фильм добавлен в избранное',
      });

      return;
    }

    addNotOfferFn(kinopoiskId);
    showAlert({ message });
  };

  const handleAddFavorites = (e: MouseEvent) => {
    e.preventDefault();
    if (!isAuthorized) {
      showModalFn('auth');

      return;
    }
    const { kinopoiskId, nameRu } = props;

    if (!kinopoiskId) return;
    if (isFavorite) {
      removeFavoritesFn({ kinopoiskId });
      showAlert({
        message: `Фильм ${nameRu} успешно удален из избранных!`,
      });

      return;
    }

    updateFavoritesFn({ kinopoiskId });
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
      href={ROUTES.film(String(props.kinopoiskId || props.filmId))}
    >
      <div className='overflow-hidden rounded-2xl'>
        <img
          alt={props.nameRu}
          src={imageLoading ? imagePlug.src : props.posterUrl}
          className={cc([
            'h-[330px] w-full rounded-2xl object-cover transition-all',
            { 'brightness-50': imageLoading },
          ])}
          onLoad={onImageLoad}
        />
      </div>

      <div
        className='absolute left-3 right-3 top-3 flex justify-between  opacity-0 transition-all'
        id='rating'
      >
        <div className='flex flex-col space-y-2'>
          {props.ratingImdb && (
            <div className='flex items-center gap-3'>
              <div
                className={cc([
                  { [style.highRate]: +props.ratingImdb > 8 },
                  'rounded-md bg-white px-2.5 py-0.5 font-medium text-black',
                ])}
              >
                {props.ratingImdb}
              </div>
              <span className='text-sm font-normal'>Imdb</span>
            </div>
          )}

          {props.ratingKinopoisk && (
            <div className='flex items-center gap-3'>
              <div
                className={cc([
                  { [style.highRate]: +props.ratingKinopoisk > 8 },
                  'rounded-md bg-white px-2.5 py-0.5 font-medium text-black',
                ])}
              >
                {props.ratingKinopoisk}
              </div>
              <span className='text-sm font-normal'>Кинопоиск</span>
            </div>
          )}
        </div>

        <div className='flex-col space-y-2 flex-center'>
          {props.kinopoiskId && (
            <Tooltip
              text={isFavorite ? 'Убрать из избранного' : 'Буду смотреть'}
            >
              <Icon
                name='bookmark'
                size={23}
                className={cc([
                  { 'text-primary': isFavorite },
                  'cursor-pointer transition-all hover:text-primary',
                ])}
                onClick={handleAddFavorites}
              />
            </Tooltip>
          )}

          {props.eyeVisible && (
            <Tooltip text='Не предлагать такое'>
              <Icon
                name='eye'
                size={20}
                className={cc([
                  'cursor-pointer transition-all hover:text-red-400',
                ])}
                onClick={onNotOffer}
              />
            </Tooltip>
          )}
        </div>
      </div>

      <div
        className='absolute bottom-[20%] left-3 right-3 space-y-2 opacity-0 transition-all'
        id='genres'
      >
        <div className='flex w-full flex-wrap items-center justify-center gap-2'>
          {props.genres &&
            props.genres.slice(0, 3).map(({ genre }) => (
              <div
                key={genre}
                className='primary-gradient rounded-md px-2 py-0.5 text-sm font-normal '
              >
                {uppercaseFirstLetter(genre)}
              </div>
            ))}
        </div>
      </div>

      <div className='mt-3'>
        <div className='line-clamp-1 break-all text-center'>
          {props.nameRu || props.nameEn}
        </div>
        <p className='text-center text-sm opacity-75'>{props.year}</p>
      </div>
    </Link>
  );
};
