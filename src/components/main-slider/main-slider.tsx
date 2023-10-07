import React, {Fragment} from 'react';
import Link from 'next/link';

import Skeleton from 'react-loading-skeleton';

import {ROUTES} from '~/shared/constants/routes-links';
import {useHome} from '~/shared/hooks/pages/use-home';

import {Icon} from '~/components/icon/icon';

export const MainSlider = () => {
  const {sliderRef, filmsQuery, onNext, onPrev} = useHome();

  if (filmsQuery.isLoading) {
    return (
      <div className="w-full rounded-2xl">
        <Skeleton
          baseColor="#16171DFF"
          borderRadius={16}
          height={530}
          highlightColor="#101011"
        />
      </div>
    );
  }

  return (
    <Fragment>
      <div ref={sliderRef} className="keen-slider w-full rounded-2xl">
        {filmsQuery.data?.films.map(({nameRu, rating, filmId}, index) => (
          <Link
            key={index}
            className="keen-slider__slide relative h-[530px] bg-cover bg-no-repeat"
            href={ROUTES.film(String(filmId))}
          >
            <img
              className='absolute inset-0 h-full w-full brightness-75 -z-10'
              src='https://htv-vsc.kion.ru:32122/CPS/images/universal/film/poster/202307/20230717/57/2023071714322794416d.jpg?x=2700&y=953&ar=ignore%201.5x,%20https://htv-vsc.kion.ru:32122/CPS/images/universal/film/poster/202307/20230717/57/2023071714322794416d.jpg?x=3600&y=1270&ar=ignore%202x,%20https://htv-vsc.kion.ru:32122/CPS/images/universal/film/poster/202307/20230717/57/2023071714322794416d.jpg?x=5400&y=1905&ar=ignore%203x'
            />
            <div className=" flex h-full flex-1 items-end justify-between p-7">
              <div className="flex flex-col">
                <span className="text-[34px] font-[400]">{nameRu}</span>

                <span className="text-base opacity-75">
                  В тюрьме для смертников появляется заключенный с божественным
                  даром. Мистическая драма по роману Стивена Кинга
                </span>
              </div>
              <span
                className="primary-gradient flex py-2 px-4 items-center justify-center rounded-2xl text-[20px] font-[400]">
                {rating} IMDb
              </span>
            </div>
          </Link>
        ))}
      </div>

      <button className='pos-abs-y z-50 group left-14 opacity-50 transition-all hover:opacity-100'
        onClick={onPrev}>
        <Icon
          className='group-hover:scale-110 group-active:scale-75 transition-all'
          name="arrowLeft"
          size={36}
        />
      </button>

      <button className='pos-abs-y right-14 group z-50 opacity-50 transition-all hover:opacity-100'
        onClick={onNext}>
        <Icon
          className="rotate-180 group-hover:scale-110 transition-all group-active:scale-75"
          name="arrowLeft"
          size={36}
        />
      </button>
    </Fragment>
  );
};
