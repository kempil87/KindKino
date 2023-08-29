import React, { useEffect, useState } from 'react';

import cc from "classcat";
import { useUnit } from "effector-react";
import { FormProvider, useForm } from "react-hook-form";
import Skeleton from "react-loading-skeleton";

import { Breadcrumbs } from "~/components/breadcrumbs/breadcrumbs";
import { Button } from '~/components/button/button';
import { FilmCard } from "~/components/film-card/film-card";
import { Select, SelectOption } from "~/components/select/select";

import { MainLayout } from "~/layout/MainLayout/main-layout";
import { fetchFilms } from '~/shared/api/films/films';
import {
  prepareSelectCountries,
  prepareSelectGenres,
} from '~/shared/helpers/prepare-select-data';
import { useQueriesData } from "~/shared/hooks/use-queries-data/use-queries-data";
import { useUrlParams } from '~/shared/hooks/use-url-params/use-url-params';
import {
  $filmList,
  $filmListLoading,
  filmListApi,
  filmListLoadingApi,
} from "~/shared/store/film-list";
import { $selectStore, resetSelect, updateSelect } from '~/shared/store/select';
import { FilterCountry, FilterGenre } from '~/shared/types/api/filter/filter';

interface FormProps {
  countries: SelectOption[];
  genres: SelectOption[];
}

const getDefaultGenresValues = (list: FilterGenre[], find: string) => {
  const result: FilterGenre[] = [];

  if (list && !list.length && !find) return [];

  list.map((el) => {
    if (find?.split(', ').includes(String(el.id))) {
      result.push(el);
    }
  });

  return prepareSelectGenres(result);
};

const getDefaultCountriesValues = (list: FilterCountry[], find: string) => {
  const result: FilterCountry[] = [];

  if (list && !list.length && !find) return [];

  list.map((el) => {
    if (find?.split(', ').includes(String(el.id))) {
      result.push(el);
    }
  });

  return prepareSelectCountries(result);
};

export default function Page() {
  const {
    filmListLoading,
    handleUpdateSelect,
    handleResetSelect,
    selectStore,
    filmList,
  } = useUnit({
    filmList: $filmList,
    filmListLoading: $filmListLoading,
    handleResetSelect: resetSelect,
    handleUpdateSelect: updateSelect,
    selectStore: $selectStore,
  });
  const { updateUrlParams, queryParams, resetUrl } = useUrlParams();

  const { filters } = useQueriesData();

  const methods = useForm<FormProps>();

  const resetButtonVisible = !!Object.keys(selectStore).length;

  const [page, setPage] = useState(1);

  const filtersUpdate = async (name: string, options: SelectOption[]) => {
    const values = options.map((i) => i.value);

    await updateUrlParams([{ name, value: values.join(', ') }]);
    handleUpdateSelect({ name, value: values[0] });
  };

  const getFilms = async () => {
    const { items } = await fetchFilms.all({
      countries: selectStore['countries'],
      genres: selectStore['genres'],
      order: 'NUM_VOTE',
      type: "FILM",
    });

    filmListApi.set(items);
    filmListLoadingApi.off();
  };

  const getMore = async () => {
    const { items } = await fetchFilms.all({
      countries: selectStore['countries'],
      genres: selectStore['genres'],
      order: "NUM_VOTE",
      page: page + 1,
      type: 'FILM',
    });

    setPage((p) => p + 1);

    filmListApi.update(items);
  };

  const resetFilters = async () => {
    await resetUrl();
    methods.reset();
    handleResetSelect();
  };

  useEffect(() => {
    getFilms();
  }, [selectStore]);

  useEffect(() => {
    if (queryParams.genres && queryParams.countries) {
      const countries = getDefaultCountriesValues(
        filters?.countries || [],
        queryParams.countries as string
      );
      const genres = getDefaultGenresValues(
        filters?.genres || [],
        queryParams.genres as string
      );

      methods.setValue('countries', countries);
      methods.setValue('genres', genres);
    }
  }, [queryParams, filters, methods]);

  return (
    <MainLayout>
      <FormProvider {...methods}>
        <div className="app-container mb-6 mt-3 space-y-6">
          <Breadcrumbs breadcrumbs={[{ label: 'Фильмы' }]} />

          <h3 className="text-[34px] font-medium">Фильмы смотреть онлайн</h3>

          <div className="m flex flex-col gap-8">
            <div className="flex w-full items-center justify-between">
              <div className="grid w-full grid-cols-4 gap-3">
                <Select
                  multiple
                  handleChange={filtersUpdate}
                  name="countries"
                  options={prepareSelectCountries(filters?.countries) || []}
                  placeholder="Страна"
                />

                <Select
                  multiple
                  handleChange={filtersUpdate}
                  name="genres"
                  options={prepareSelectGenres(filters?.genres) || []}
                  placeholder="Жанр"
                />
              </div>

              <Button
                className={cc([
                  "invisible opacity-0",
                  { "!visible !opacity-100": resetButtonVisible },
                ])}
                onClick={resetFilters}
              >
                Сбросить фильтры
              </Button>
            </div>
            <div className="grid w-full grid-cols-6 gap-8">
              {filmListLoading ? (
                <>
                  {Array.from({ length: 16 }).map((_, key) => (
                    <div key={key} className=" h-full gap-1">
                      <Skeleton
                        baseColor="#16171DFF"
                        borderRadius={16}
                        containerClassName="flex-1 !h-[130px] h-full"
                        height={330}
                        highlightColor="#101011"
                      />

                      <Skeleton
                        baseColor="#16171DFF"
                        borderRadius={8}
                        height={24}
                        highlightColor="#101011"
                      />

                      <Skeleton
                        baseColor="#16171DFF"
                        borderRadius={8}
                        containerClassName="m-auto flex mt-1 justify-center  w-full"
                        height={20}
                        highlightColor="#101011"
                        width="120px"
                      />
                    </div>
                  ))}
                </>
              ) : (
                <>
                  {filmList.map((el) => (
                    <FilmCard {...el} key={el.kinopoiskId} />
                  ))}
                </>
              )}
            </div>
            <Button onClick={getMore}>Показать еще</Button>
          </div>
        </div>
      </FormProvider>
    </MainLayout>
  );
}

// export async function getServerSideProps(ctx: GetServerSidePropsContext) {
//   try {
//     const { genres, countries } = ctx.query;
//     const films = await fetchFilms.all({
//       countries: countries as string,
//       genres: genres as string,
//     });
//
//     return {
//       props: {
//         films,
//       },
//     };
//   } catch {
//     return {
//       redirect: {
//         destination: '/500',
//         permanent: false,
//       },
//     };
//   }
// }
