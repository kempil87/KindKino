import React, { useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { useQuery } from '@tanstack/react-query';
import cc from "classcat";

import { AppLoader } from '~/components/app-loader/app-loader';
import { Breadcrumbs } from "~/components/breadcrumbs/breadcrumbs";

import { MainLayout } from '~/layout/MainLayout/main-layout';
import { fetchFilms } from '~/shared/api/films/films';
import { fetchStaff } from '~/shared/api/staff/staff';
import { ROUTES } from "~/shared/constants/routes-links";
import { convertTime } from '~/shared/helpers/convert-time';
import { uppercaseFirstLetter } from "~/shared/helpers/uppercase-first-letter";

export default function Page() {
  const {
    query: { id },
  } = useRouter();
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  const filmQuery = useQuery({
    enabled: !!id,
    queryFn: () => fetchFilms.view({ id }),
    queryKey: ["film-view", id],
  });

  const filmStaffQuery = useQuery({
    enabled: !!filmQuery.data?.kinopoiskId,
    queryFn: () => fetchStaff.film({ filmId: filmQuery.data?.kinopoiskId }),
    queryKey: ['film-staff', filmQuery.data?.kinopoiskId],
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

  const toggleDescription = () => {
    if (descriptionRef.current) {
      descriptionRef.current.classList.toggle('line-clamp-3');
    }
  };

  if (filmQuery.isLoading) return <AppLoader />;

  return (
    <MainLayout headProps={{ title: filmQuery.data?.nameRu || '' }}>
      <img
        className="app-container fixed right-0 top-0 z-[30] h-screen  object-cover blur-md brightness-75"
        src={filmQuery.data?.posterUrl}
      />

      <div className="app-container relative z-[40] my-6">
        <Breadcrumbs breadcrumbs={breadcrumbs} />

        <div className="my-6 flex gap-[40px]">
          <div className="relative">
            <img
              className="h-[420px] rounded-2xl object-cover shadow"
              src={filmQuery.data?.posterUrl}
            />

            <div className="primary-gradient absolute right-5 top-5 rounded-md p-2">
              {filmQuery.data?.ratingAgeLimits.replace('age', '')}+
            </div>
          </div>

          <div className="">
            <div className="flex  space-x-2">
              <div className="flex items-center gap-3">
                <div className="rounded-md bg-white px-2.5 py-0.5 font-medium text-black">
                  {filmQuery.data?.ratingImdb}
                </div>
                <span className="text-sm font-normal">Imdb</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="rounded-md bg-white px-2.5 py-0.5 font-medium text-black">
                  {filmQuery.data?.ratingKinopoisk}
                </div>
                <span className="text-sm font-normal">Кинопоиск</span>
              </div>
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
                {directors?.map(({ nameRu, staffId }, index, array) => (
                  <Link
                    key={staffId}
                    className="underline-offset-3 whitespace-nowrap underline transition-all hover:text-primary"
                    href={ROUTES.staff(staffId)}
                  >
                    {nameRu} {array.length !== index + 1 && ', '}
                  </Link>
                ))}
              </div>
            </div>

            <div className="my-2 h-px w-full bg-gradient-to-r from-[#3f414b00] via-[#3F414B] to-[#3f414b00]" />

            <div className="flex items-center gap-5">
              <div className="w-20 text-white/60">Актёры</div>
              <div className="flex space-x-1">
                {actors?.map(({ nameRu, staffId }, index, array) => (
                  <Link
                    key={staffId}
                    className="underline-offset-3 whitespace-nowrap underline transition-all hover:text-primary"
                    href={ROUTES.staff(staffId)}
                  >
                    {nameRu} {array.length !== index + 1 && ", "}
                  </Link>
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

        <h2 className="my-4 text-[26px]">Описание</h2>

        <p
          ref={descriptionRef}
          className={cc(['line-clamp-3 text-base transition-all'])}
        >
          {filmQuery.data?.description}
        </p>
        <button
          className="mt-1 transition-all hover:text-primary"
          onClick={toggleDescription}
        >
          Показать полностью
        </button>
      </div>
    </MainLayout>
  );
}
