/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Link from 'next/link';

import cc from 'classcat';
import dayjs from 'dayjs';
import Skeleton from 'react-loading-skeleton';

import { DATE_FORMAT_FULL } from '~/shared/constants/formats';
import { ROUTES } from '~/shared/constants/routes-links';
import { useHome } from '~/shared/hooks/pages/use-home';

import { Icon } from '~/components/icon/icon';

export const MainSlider = () => {
  const { sliderRef, premieresFilms, activeSlide, onNext, onPrev } = useHome();

  if (premieresFilms.isLoading) {
    return (
      <div className='grid w-full grid-cols-3 gap-3'>
        <Skeleton
          baseColor='#16171DFF'
          borderRadius={16}
          className='aspect-[4/1] min-h-[530px] -translate-x-1/3 max-lg:min-h-[330px] max-md:min-h-[230px] max-sm:-translate-x-1/2'
          highlightColor='#101011'
        />
        <Skeleton
          baseColor='#16171DFF'
          borderRadius={16}
          className='aspect-[4/1] min-h-[530px] scale-110 scale-x-150 max-lg:min-h-[330px] max-md:min-h-[230px] max-sm:scale-x-[1.85]'
          highlightColor='#101011'
        />
        <Skeleton
          baseColor='#16171DFF'
          borderRadius={16}
          className='aspect-[4/1] min-h-[530px] translate-x-1/3 max-lg:min-h-[330px] max-md:min-h-[230px] max-sm:translate-x-1/2'
          highlightColor='#101011'
        />
      </div>
    );
  }

  return (
    <div className='group/slider h-full w-full'>
      <div ref={sliderRef} className='keen-slider w-full rounded-2xl'>
        {premieresFilms.data?.items.map(
          ({ nameRu, filmId, premiereRu, posterUrl }, index) => {
            const isActive = index === activeSlide;

            return (
              <Link
                key={index}
                className='keen-slider__slide relative h-[530px]'
                href={ROUTES.film(String(filmId))}
              >
                <div
                  className={cc([
                    'animated relative flex h-full flex-col justify-end rounded-2xl bg-cover bg-no-repeat',
                    {
                      'scale-90 after:absolute after:inset-0 after:bg-black/30':
                        !isActive,
                    },
                  ])}
                  style={{
                    backgroundImage: `url(${posterUrl})`,
                  }}
                >
                  <div className='m-6 flex flex-col font-medium'>
                    <span className='pb-2 !text-5xl'>{nameRu}</span>
                    <span>
                      В тюрьме для смертников появляется заключенный с
                      божественным даром. Мистическая драма по роману Стивена
                      Кинга
                    </span>
                    <span className='primary-gradient ml-auto flex w-fit rounded-2xl px-4 py-2'>
                      {dayjs(premiereRu).format(DATE_FORMAT_FULL)}
                    </span>
                  </div>
                </div>
              </Link>
            );
          },
        )}
      </div>

      <button
        className='animated group left-14 z-50 h-24 rounded-md bg-white/20 px-2 opacity-0 backdrop-blur pos-abs-y group-hover/slider:opacity-100'
        onClick={onPrev}
      >
        <Icon
          className='animated text-gray-50 group-hover:scale-110 group-active:scale-75'
          name='arrowLeft'
          size={36}
        />
      </button>

      <button
        className='animated group right-14 z-50 h-24 rounded-md bg-white/20 px-2 opacity-0 backdrop-blur pos-abs-y group-hover/slider:opacity-100'
        onClick={onNext}
      >
        <Icon
          className='animated rotate-180 text-gray-50 group-hover:scale-110 group-active:scale-75'
          name='arrowLeft'
          size={36}
        />
      </button>
    </div>
  );
};
