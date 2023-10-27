import React, { ReactNode, useEffect } from 'react';
import Link from 'next/link';

import { useKeenSlider } from 'keen-slider/react';
import Skeleton from 'react-loading-skeleton';

import { ROUTES } from '~/shared/constants/routes-links';
import { Film } from '~/shared/types/film/film';

import { FilmCard } from '~/components/film-card/film-card';
import { Icon } from '~/components/icon/icon';
import { Title } from '~/components/title/title';

interface SliderProps<Data> {
  data: Data[] | undefined;
  isLoading?: boolean;
  title?: ReactNode;
  withAll?: boolean;
}

export const Slider = <Data extends Film>({
  data,
  title,
  isLoading,
  withAll = true,
}: SliderProps<Data>) => {
  const [sliderRef, instanceRef] = useKeenSlider({
    slides: { perView: 6, spacing: 12 },
  });

  useEffect(() => {
    instanceRef?.current?.update();
  }, [data, instanceRef]);

  if (!data?.length) return null;

  return (
    <div>
      <div className='relative my-14'>
        <Title className='mb-6' path={ROUTES.films}>
          {title}
        </Title>

        <div ref={sliderRef} className='keen-slider'>
          {isLoading ? (
            <div className='grid w-full grid-cols-6 gap-6 children:w-full'>
              {Array.from({ length: 6 }).map((_, index) => (
                <Skeleton
                  key={index}
                  baseColor='#16171DFF'
                  borderRadius={16}
                  height={330}
                  highlightColor='#101011'
                />
              ))}
            </div>
          ) : (
            data?.map((el, index, array) => (
              <>
                <div key={el.filmId} className='keen-slider__slide'>
                  <FilmCard {...el} />
                </div>
                {array.length === index + 1 && withAll && (
                  <Link className='keen-slider__slide' href={ROUTES.films}>
                    <div className='primary-gradient group h-full w-full flex-1 rounded-xl bg-dark font-medium transition-all flex-center'>
                      <span className='transition-all group-hover:scale-125'>
                        Смотреть все
                      </span>
                    </div>
                  </Link>
                )}
              </>
            ))
          )}
        </div>

        <button
          className='group -left-10 z-50 opacity-50 transition-all pos-abs-y hover:opacity-100'
          onClick={() => instanceRef.current?.prev()}
        >
          <Icon
            className='transition-all group-hover:scale-110 group-active:scale-75'
            name='arrowLeft'
            size={21}
          />
        </button>

        <button
          className='group -right-10 z-50 opacity-50 transition-all pos-abs-y hover:opacity-100'
          onClick={() => instanceRef.current?.next()}
        >
          <Icon
            className='rotate-180 transition-all group-hover:scale-110 group-active:scale-75'
            name='arrowLeft'
            size={21}
          />
        </button>
      </div>
    </div>
  );
};
