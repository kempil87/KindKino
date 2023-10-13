/* eslint-disable @next/next/no-img-element */
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useQuery } from '@tanstack/react-query';
import cc from 'classcat';

import { fetchFilms } from '~/shared/api/films/films';
import { fetchStaff } from '~/shared/api/staff/staff';
import { ROUTES } from '~/shared/constants/routes-links';
import { convertTime } from '~/shared/utils/convert-time';
import { uppercaseFirstLetter } from '~/shared/utils/uppercase-first-letter';

import { AppLoader } from '~/components/app-loader/app-loader';
import { Breadcrumbs } from '~/components/breadcrumbs/breadcrumbs';
import {FilmCard} from '~/components/film-card/film-card';
import {PersonPopover} from '~/components/person-popover/person-popover';
import {Title} from '~/components/title/title';
import {MainLayout} from '~/layout/main-layout/main-layout';

const FilmFactsDynamic = dynamic(
  () =>
    import('~/components/film-facts/film-facts').then(
      (res) => res.FilmFacts,
    ),{
    ssr:false
  },
);

export default function Page() {
  const {query: { id }} = useRouter();

  const filmQuery = useQuery({
    enabled: !!id,
    queryFn: () => fetchFilms.view({ id: id as string }),
    queryKey: ['film-view', id],
  });

  const filmStaffQuery = useQuery({
    enabled: !!filmQuery.data?.kinopoiskId,
    queryFn: () => fetchStaff.film({ filmId: filmQuery.data?.kinopoiskId }),
    queryKey: ['film-staff', filmQuery.data?.kinopoiskId],
  });

  const filmSimilariesQuery = useQuery({
    enabled: !!filmQuery.data?.kinopoiskId,
    queryFn: () => fetchFilms.similary({ id: String(filmQuery.data?.kinopoiskId)}),
    queryKey: ['film-similaries-list', filmQuery.data?.kinopoiskId],
  });

  const filmPrequelsQuery = useQuery({
    enabled: !!filmQuery.data?.kinopoiskId,
    queryFn: () => fetchFilms.prequels({ id: String(filmQuery.data?.kinopoiskId) }),
    queryKey: ['film-prequels-list', filmQuery.data?.kinopoiskId],
  });

  const directors = filmStaffQuery.data?.filter(
    (i) => i.professionKey === 'DIRECTOR'
  );
  const actors = filmStaffQuery.data
    ?.filter((i) => i.professionKey === 'ACTOR')
    .slice(0, 6);

  const breadcrumbs = [
    { label: 'Фильмы', path: ROUTES.films },
    { label: `${filmQuery.data?.nameRu} (${filmQuery.data?.year})` },
  ];

  if (filmQuery.isLoading) return <AppLoader />;

  return (
    <MainLayout headProps={{ title: filmQuery.data?.nameRu || '' }}>
      <img
        alt='banner'
        className="app-container fixed right-0 top-0 z-[30] h-screen object-cover blur-md"
        src={filmQuery.data?.posterUrl}
      />

      <div className="app-container relative z-[40] my-6">
        <Breadcrumbs breadcrumbs={breadcrumbs} />

        <div className="my-6 flex gap-[40px]">
          <div className="relative">
            <img
              alt='banner'
              className="h-[420px] rounded-2xl object-cover shadow"
              src={filmQuery.data?.posterUrl}
            />

            {filmQuery.data?.ratingAgeLimits && (
              <div className="primary-gradient absolute right-5 top-5 rounded-md p-2">
                {filmQuery.data?.ratingAgeLimits.replace('age', '')}+
              </div>
            )}
          </div>

          <div className="">
            <div className="flex  space-x-2">
              {filmQuery.data?.ratingImdb && (
                <div className="flex items-center gap-3">
                  <div className="rounded-md bg-white px-2.5 py-0.5 font-medium text-black">
                    {filmQuery.data?.ratingImdb}
                  </div>
                  <span className="text-sm font-normal">Imdb</span>
                </div>
              )}
              {filmQuery.data?.ratingKinopoisk && (
                <div className="flex items-center gap-3">
                  <div className="rounded-md bg-white px-2.5 py-0.5 font-medium text-black">
                    {filmQuery.data?.ratingKinopoisk}
                  </div>
                  <span className="text-sm font-normal">Кинопоиск</span>
                </div>
              )}
            </div>
            <h2 className="my-6 text-[34px]">
              {filmQuery.data?.nameRu} ({filmQuery.data?.year})
            </h2>
            <div className="flex items-center gap-5">
              <div className="w-20 text-white/60">Качество</div>
              <span>FullHD</span>
            </div>
            <div className="my-2 h-px w-full bg-gradient-to-r from-[#3f414b00] via-[#3F414B] to-[#3f414b00]" />
            <div className="flex items-center gap-5">
              <div className="w-20 text-white/60">Время</div>
              <span>
                {filmQuery.data?.filmLength} мин/
                {convertTime(Number(filmQuery.data?.filmLength))} ч
              </span>
            </div>
            <div className="my-2 h-px w-full bg-gradient-to-r from-[#3f414b00] via-[#3F414B] to-[#3f414b00]" />
            <div className="flex items-center gap-5">
              <div className="w-20 text-white/60">Год</div>
              <span>{filmQuery.data?.year}</span>
            </div>

            <div className="my-2 h-px w-full bg-gradient-to-r from-[#3f414b00] via-[#3F414B] to-[#3f414b00]" />

            <div className="flex items-center gap-5">
              <div className="w-20 text-white/60">Режиссёр</div>
              <div className="flex space-x-1">
                {directors?.map((person, index, array) => (
                  <PersonPopover key={person.staffId} {...person}>
                    <Link
                      className="underline-offset-3 whitespace-nowrap underline transition-all hover:text-primary"
                      href={ROUTES.staff(String(person.staffId))}
                    >
                      {person.nameRu} {array.length !== index + 1 && ', '}
                    </Link>
                  </PersonPopover>
                ))}
              </div>
            </div>

            <div className="my-2 h-px w-full bg-gradient-to-r from-[#3f414b00] via-[#3F414B] to-[#3f414b00]" />

            <div className="flex items-center gap-5">
              <div className="w-20 text-white/60">Актёры</div>
              <div className="flex space-x-1">
                {actors?.map((person, index, array) => (
                  <PersonPopover key={person.staffId} {...person}>
                    <Link
                      className="underline-offset-3 whitespace-nowrap underline transition-all hover:text-primary"
                      href={ROUTES.staff(String(person.staffId))}
                    >
                      {person.nameRu} {array.length !== index + 1 && ', '}
                    </Link>
                  </PersonPopover>
                ))}
              </div>
            </div>

            <div className="my-2 h-px w-full bg-gradient-to-r from-[#3f414b00] via-[#3F414B] to-[#3f414b00]" />

            <div className="flex items-center gap-5">
              <div className="w-20 text-white/60">Страны</div>
              <span>
                {filmQuery.data?.countries.map((i) => i.country).join(', ')}
              </span>
            </div>

            <div className="my-2 h-px w-full bg-gradient-to-r from-[#3f414b00] via-[#3F414B] to-[#3f414b00]" />

            <div className="flex items-center gap-5">
              <div className="w-20 text-white/60">Жанры</div>
              <span>
                {filmQuery.data?.genres
                  .map((i) => uppercaseFirstLetter(i.genre))
                  .join(', ')}
              </span>
            </div>

            <div className="my-2 h-px w-full bg-gradient-to-r from-[#3f414b00] via-[#3F414B] to-[#3f414b00]" />
          </div>
        </div>

        <Title>Описание</Title>

        <p className='mt-2 text-base'>{filmQuery.data?.description}</p>

        <div className={cc(['flex flex-col space-y-4',{'my-4': !!filmSimilariesQuery.data?.items.length}])}>
          {!!filmSimilariesQuery.data?.items.length && <Title>Похожие на {filmQuery.data?.nameRu} ({filmQuery.data?.year}) фильмы</Title>}

          {!filmSimilariesQuery.isLoading && filmSimilariesQuery.data && (
            <div className='grid grid-cols-6 gap-6'>
              {filmSimilariesQuery.data?.items.slice(0,6).map(el => (
                <FilmCard key={el.filmId} {...el} />
              ))}
            </div>
          )}
        </div>

        <div className={cc(['flex flex-col space-y-4',{'my-4':!!filmPrequelsQuery.data?.length}])}>
          {!!filmPrequelsQuery.data?.length && <Title>Сиквелы и привеклы</Title>}

          {!filmPrequelsQuery.isLoading && filmPrequelsQuery.data && (
            <div className='grid grid-cols-6 gap-6'>
              {filmPrequelsQuery.data.slice(0,6).map(el => (
                <FilmCard key={el.filmId} {...el} />
              ))}
            </div>
          )}
        </div>

        <FilmFactsDynamic id={filmQuery.data?.filmId || filmQuery.data?.kinopoiskId} />
      </div>
    </MainLayout>
  );
}
