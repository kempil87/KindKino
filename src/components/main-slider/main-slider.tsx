import React, { Fragment } from 'react';
import Link from 'next/link';

import { Icon } from "~/components/icon/icon";

import { ROUTES } from '~/shared/constants/routes-links';
import { useHome } from "~/shared/hooks/pages/use-home";

export const MainSlider = () => {
  const { sliderRef, filmsQuery, onNext, onPrev } = useHome();

  if (filmsQuery.isLoading) return <div>...Load</div>;

  return (
    <Fragment>
      <div ref={sliderRef} className="keen-slider  w-full rounded-2xl">
        {filmsQuery.data?.films.map(({ nameRu, rating, filmId }, index) => (
          <Link
            key={index}
            className="keen-slider__slide h-[440px] bg-cover bg-no-repeat"
            href={ROUTES.film(String(filmId))}
            style={{
              backgroundImage:
                "url(https://thumbs.dfs.ivi.ru/storage3/contents/e/6/cb15fcedd18ea98b32a568d927be97.jpg/1216x524/?q=85)",
            }}
          >
            <div className=" flex h-full flex-1 items-end justify-between p-7">
              <div className="flex flex-col">
                <span className="text-[34px] font-[400]">{nameRu}</span>

                <span className="text-base opacity-75">
                  В тюрьме для смертников появляется заключенный с божественным
                  даром. Мистическая драма по роману Стивена Кинга
                </span>
              </div>
              <span className="primary-gradient flex h-12 w-16 items-center justify-center rounded-2xl text-[20px] font-[400]">
                {rating}
              </span>
            </div>
          </Link>
        ))}
      </div>

      <Icon
        className="absolute left-14 top-1/2 z-50 -translate-y-1/2 cursor-pointer opacity-50 transition-all hover:scale-110 hover:opacity-100"
        name="arrowLeft"
        size={36}
        onClick={onPrev}
      />
      <Icon
        className="absolute right-14 top-1/2 z-50 -translate-y-1/2 rotate-180 cursor-pointer opacity-50 transition-all hover:scale-110 hover:opacity-100"
        name="arrowLeft"
        size={36}
        onClick={onNext}
      />
    </Fragment>
  );
};
