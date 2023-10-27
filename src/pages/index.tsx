import React from 'react';

import { useQuery } from '@tanstack/react-query';

import { fetchFilms } from '~/shared/api/films/films';
import { Film } from '~/shared/types/film/film';

import { MainSlider } from '~/components/main-slider/main-slider';
import { Slider } from '~/components/slider/slider';
import { MainLayout } from '~/layout/main-layout/main-layout';

export default function Home() {
  const { data: awaitListFilms, isLoading } = useQuery({
    queryFn: () => fetchFilms.top({ type: 'TOP_AWAIT_FILMS' }),
    queryKey: ['top-await-list'],
  });

  return (
    <MainLayout>
      <div className='relative my-16 flex w-full justify-center'>
        <MainSlider />
      </div>

      <div className='app-container'>
        <Slider<Film>
          data={awaitListFilms?.films}
          isLoading={isLoading}
          title={
            <div>
              По подписке <span className='premium-text'>PREMIUM</span>
            </div>
          }
        />

        <Slider<Film>
          data={awaitListFilms?.films}
          isLoading={isLoading}
          title='Самое популярное сегодня'
        />

        <Slider<Film>
          data={awaitListFilms?.films}
          isLoading={isLoading}
          title='Топ ожидающих фильмов'
        />
      </div>
    </MainLayout>
  );
}
