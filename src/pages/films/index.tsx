/* eslint-disable effector/mandatory-scope-binding,react-hooks/exhaustive-deps */
import {useEffect, useState} from 'react';

import cc from 'classcat';
import {useUnit} from 'effector-react/scope';
import {FormProvider, useForm} from 'react-hook-form';
import Skeleton from 'react-loading-skeleton';

import {fetchFilms} from '~/shared/api/films/films';
import {useQueriesData} from '~/shared/hooks/use-queries-data/use-queries-data';
import {useUrlParams} from '~/shared/hooks/use-url-params/use-url-params';
import {
  $filmList, updateFilmList,
} from '~/shared/models/film-list';
import {$selectStore, resetSelect, updateSelect} from '~/shared/models/select';
import {ApiFilmsAll} from '~/shared/types/api/film/film';
import {FilterCountry, FilterGenre} from '~/shared/types/api/filter/filter';
import {
  prepareSelectCountries,
  prepareSelectGenres,
} from '~/shared/utils/prepare-select-data';

import {Breadcrumbs} from '~/components/breadcrumbs/breadcrumbs';
import {Button} from '~/components/button/button';
import {FilmCard} from '~/components/film-card/film-card';
import {Select, SelectOption} from '~/components/select/select';
import {MainLayout} from '~/layout/main-layout/main-layout';

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
    handleUpdateSelect,
    handleResetSelect,
    selectStoreModel,
    updateFilmListFn,
    filmList,
  } = useUnit({
    filmList: $filmList,
    handleResetSelect: resetSelect,
    handleUpdateSelect: updateSelect,
    selectStoreModel: $selectStore,
    updateFilmListFn: updateFilmList,
  });
  const {updateUrlParams, queryParams, resetUrl} = useUrlParams();

  const {filters} = useQueriesData();

  const methods = useForm<FormProps>();

  const resetButtonVisible = Object.values(methods.getValues()).some(Boolean);

  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadButtonLoading, setLoadButtonIsLoading] = useState(false);

  const filtersUpdate = async (name: string, options: SelectOption[]) => {
    const values = options.map((i) => i.value);

    await updateUrlParams([{name, value: values.join(', ')}]);
    handleUpdateSelect({name, value: values[0]});
  };

  const fetchParams: ApiFilmsAll['req'] = {
    // countries: selectStoreModel['countries'],
    // genres: selectStoreModel['genres'],
    order: 'NUM_VOTE',
    page,
    type: 'FILM'
  };

  const getFilms = async () => {
    const {items} = await fetchFilms.all(fetchParams);

    updateFilmListFn(items);
    setIsLoading(false);
  };

  const getMore = async () => {
    setLoadButtonIsLoading(true);
    setPage((p) => p + 1);

    const {items} = await fetchFilms.all({...fetchParams, page: page + 1});

    updateFilmListFn(items);
    setLoadButtonIsLoading(false);
    setIsLoading(false);
  };

  const resetFilters = async () => {
    await resetUrl();
    methods.reset();
    handleResetSelect();
  };

  useEffect(() => {
    getFilms();
  }, [selectStoreModel]);

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

      countries && methods.setValue('countries', countries);
      genres && methods.setValue('genres', genres);
    }
  }, [queryParams, filters, methods]);

  return (
    <MainLayout>
      <FormProvider {...methods}>
        <div className="app-container mb-6 mt-3 space-y-6">
          <Breadcrumbs breadcrumbs={[{label: 'Фильмы'}]}/>

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
                  'invisible opacity-0',
                  {'!visible !opacity-100': resetButtonVisible},
                ])}
                onClick={resetFilters}
              >
                  Сбросить фильтры
              </Button>
            </div>
            <div className="grid w-full grid-cols-6 gap-8">
              {isLoading ? (
                Array.from({length: 16}).map((_, key) => (
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
                ))
              ) : (
                filmList.map((el) => <FilmCard {...el} key={el.kinopoiskId}/>)
              )}
            </div>
            {!isLoading && (
              <Button
                disabled={isLoadButtonLoading}
                onClick={getMore}
              >
                {isLoadButtonLoading ? 'Грузим еще фильмы' : 'Показать еще'}
              </Button>
            )}
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
