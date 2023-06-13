import { useEffect } from "react";

import cc from 'classcat';
import { useStore } from 'effector-react';
import { FormProvider, useForm } from 'react-hook-form';

import { Breadcrumbs } from '~/components/breadcrumbs/breadcrumbs';
import { Button } from "~/components/button/button";
import { FilmCard } from '~/components/film-card/film-card';
import { Select, ValueProps } from '~/components/select/select';

import { MainLayout } from '~/layout/MainLayout/main-layout';
import { fetchFilms } from "~/shared/api/films/films";
import {
  prepareSelectCountries,
  prepareSelectGenres,
} from "~/shared/helpers/prepare-select-data";
import { useQueriesData } from '~/shared/hooks/use-queries-data/use-queries-data';
import { useUrlParams } from "~/shared/hooks/use-url-params/use-url-params";
import {
  $filmList,
  $filmListLoading,
  filmListApi,
  filmListLoadingApi,
} from '~/shared/store/film-list';
import { $selectStore, resetSelect, updateSelect } from '~/shared/store/select';

export default function Page() {
  const methods = useForm();
  const selectStore = useStore($selectStore);
  const filmListLoading = useStore($filmListLoading);
  const filmList = useStore($filmList);
  const { updateUrlParams, queryParams, resetUrl } = useUrlParams();
  const { filters } = useQueriesData();
  const resetButtonVisible = !!Object.keys(selectStore).length;

  const filtersUpdate = async ({ name, value }: ValueProps) => {
    await updateUrlParams([{ name, value }]);
    updateSelect({ name, value });
  };

  const getFilms = async () => {
    const { items } = await fetchFilms.all({
      countries: selectStore["countries"],
      genres: selectStore["genres"],
      order: "NUM_VOTE",
      type: 'FILM',
    });

    filmListApi.set(items);
    filmListLoadingApi.off();
  };

  const getMore = async () => {
    const { items } = await fetchFilms.all({
      countries: selectStore["countries"],
      genres: selectStore["genres"],
      order: 'NUM_VOTE',
      page: Number(queryParams["page"]) + 1,
      type: "FILM",
    });

    await updateUrlParams([
      { name: 'page', value: Number(queryParams['page']) + 1 },
    ]);

    filmListApi.update(items);
  };

  const resetFilters = async () => {
    await resetUrl();
    methods.reset();
    resetSelect();
  };

  useEffect(() => {
    getFilms();
    updateUrlParams([{ name: "page", value: 1 }]);
  }, [selectStore]);

  if (filmListLoading) return <div>...Load</div>;

  return (
    <MainLayout>
      <FormProvider {...methods}>
        <div className="app-container mb-6 mt-3 space-y-6">
          <Breadcrumbs breadcrumbs={[{ label: "Фильмы" }]} />

          <h3 className="text-[34px] font-medium">Фильмы смотреть онлайн</h3>

          <div className="m flex flex-col gap-8">
            <div className="flex w-full items-center justify-between">
              <div className="grid w-full grid-cols-4 gap-3">
                <Select
                  name="countries"
                  options={prepareSelectCountries(filters?.countries)}
                  placeholder="Страна"
                  onChange={filtersUpdate}
                />

                <Select
                  name="genres"
                  options={prepareSelectGenres(filters?.genres)}
                  placeholder="Жанр"
                  onChange={filtersUpdate}
                />
              </div>

              <Button
                className={cc([
                  'invisible opacity-0',
                  { '!visible !opacity-100': resetButtonVisible },
                ])}
                onClick={resetFilters}
              >
                Сбросить фильтры
              </Button>
            </div>

            <div className="grid w-full grid-cols-6 gap-8">
              {filmList.map((el) => (
                <FilmCard {...el} key={el.kinopoiskId} />
              ))}
            </div>

            <Button onClick={getMore}>Показать еще</Button>
          </div>
        </div>
      </FormProvider>
    </MainLayout>
  );
}
