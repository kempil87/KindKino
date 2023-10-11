import React from 'react';
import Link from 'next/link';

import {useQuery} from '@tanstack/react-query';
import {useKeenSlider} from 'keen-slider/react';
import Skeleton from 'react-loading-skeleton';

import {fetchFilms} from '~/shared/api/films/films';
import {ROUTES} from '~/shared/constants/routes-links';

import {FilmCard} from '~/components/film-card/film-card';
import {Icon} from '~/components/icon/icon';
import {MainSlider} from '~/components/main-slider/main-slider';
import {Title} from '~/components/title/title';
import {MainLayout} from '~/layout/main-layout/main-layout';

export default function Home() {
  const [sliderRef, instanceRef] = useKeenSlider({
    slides: {perView: 6, spacing: 12}
  });

  const {data: awaitListFilms, isLoading} = useQuery({
    queryFn: () => fetchFilms.top({type: 'TOP_AWAIT_FILMS'}),
    queryKey: ['top-await-list']
  });

  return (
    <MainLayout>
      <div className="app-container relative my-8 flex w-full justify-center">
        <MainSlider/>
      </div>

      <div className="app-container relative my-14">
        <Title className='mb-6' path={ROUTES.films}>Топ ожидающих фильмов</Title>

        <div ref={sliderRef} className='keen-slider'>
          {isLoading ? (
            <div className='grid w-full grid-cols-6 gap-6 children:w-full'>
              {Array.from({length: 6}).map((_, index) => (
                <Skeleton
                  key={index}
                  baseColor="#16171DFF"
                  borderRadius={16}
                  height={330}
                  highlightColor="#101011"
                />
              ))}
            </div>
          ) : awaitListFilms?.films.map((el,index,array) => (
            <>
              <div key={el.filmId} className='keen-slider__slide'>
                <FilmCard {...el} />
              </div>
              {array.length === index + 1 && (
                <Link
                  className='keen-slider__slide'
                  href={ROUTES.films}
                >
                  <div className='group h-full flex-center w-full rounded-xl bg-dark flex-1 transition-all font-medium primary-gradient'>
                    <span className='group-hover:scale-125 transition-all'>Смотреть все</span>
                  </div>
                </Link>
              )}
            </>
          ))}
        </div>

        <button className='pos-abs-y z-50 group left-14 opacity-50 transition-all hover:opacity-100' onClick={() => instanceRef.current?.prev()}>
          <Icon
            className='group-hover:scale-110 group-active:scale-75 transition-all'
            name="arrowLeft"
            size={21}
          />
        </button>

        <button className='pos-abs-y right-14 group z-50 opacity-50 transition-all hover:opacity-100' onClick={() => instanceRef.current?.next()}>
          <Icon
            className="rotate-180 group-hover:scale-110 transition-all group-active:scale-75"
            name="arrowLeft"
            size={21}
          />
        </button>
      </div>

    </MainLayout>
  );
}
