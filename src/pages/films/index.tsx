/* eslint-disable effector/mandatory-scope-binding,react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';

import cc from 'classcat';
import { useUnit } from 'effector-react/scope';
import { FormProvider, useForm } from 'react-hook-form';
import Skeleton from 'react-loading-skeleton';

import { fetchFilms } from '~/shared/api/films/films';
import { useQueriesData } from '~/shared/hooks/use-queries-data/use-queries-data';
import { useUrlParams } from '~/shared/hooks/use-url-params/use-url-params';
import {
  $filmList,
  setFilmsList,
  updateFilmList,
} from '~/shared/models/film-list';
import {
  $selectStore,
  resetSelect,
  updateSelect,
} from '~/shared/models/select';
import { ApiFilmsAll } from '~/shared/types/api/film/film';
import { FilterProps } from '~/shared/types/api/filter/filter';
import { createYearOptions } from '~/shared/utils/create-year-options';
import {
  prepareSelectCountries,
  prepareSelectGenres,
} from '~/shared/utils/prepare-select-data';
import { uppercaseFirstLetter } from '~/shared/utils/uppercase-first-letter';

import { Breadcrumbs } from '~/components/breadcrumbs/breadcrumbs';
import { Button } from '~/components/button/button';
import { FilmCard } from '~/components/film-card/film-card';
import { Select, SelectOption } from '~/components/select/select';
import { MainLayout } from '~/layout/main-layout/main-layout';

interface FormProps {
  countries: SelectOption[];
  genres: SelectOption[];
  year: SelectOption[];
}

const getDefaultLabel = (
  name: string,
  value: string,
  filters: FilterProps,
): string => {
  switch (name) {
    case 'year': {
      return value;
    }

    case 'genres': {
      return uppercaseFirstLetter(
        filters.genres.find((el) => el.id === +value)?.genre || '',
      );
    }

    default: {
      return uppercaseFirstLetter(
        filters.countries.find((el) => el.id === +value)?.country || '',
      );
    }
  }
};

export default function Page() {
  const {
    handleUpdateSelect,
    handleResetSelect,
    selectStoreModel,
    updateFilmListFn,
    setFilmsListFn,
    filmList,
  } = useUnit({
    filmList: $filmList,
    handleResetSelect: resetSelect,
    handleUpdateSelect: updateSelect,
    selectStoreModel: $selectStore,
    setFilmsListFn: setFilmsList,
    updateFilmListFn: updateFilmList,
  });

  const { updateUrlParams, queryParams, resetUrl } = useUrlParams();

  const { filters } = useQueriesData();

  const methods = useForm<FormProps>();

  const resetButtonVisible = Object.values(queryParams).some(Boolean);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadButtonLoading, setLoadButtonIsLoading] = useState(false);

  const filtersUpdate = async (name: string, options: SelectOption[]) => {
    const values = options.map((i) => i.value);

    await updateUrlParams([{ name, value: values.join('') }]);

    handleUpdateSelect({ name, value: values.join('') });
  };

  const fetchParams: ApiFilmsAll['req'] = {
    order: 'NUM_VOTE',
    page,
    type: 'FILM',
  };

  if (selectStoreModel) {
    fetchParams.countries = selectStoreModel['countries'];
    fetchParams.genres = selectStoreModel['genres'];
    fetchParams.yearFrom = selectStoreModel['year'];
    fetchParams.yearTo = selectStoreModel['year'];
  }

  const getFilms = async () => {
    const { items, totalPages } = await fetchFilms.all(fetchParams);

    setTotalPages(totalPages);
    setFilmsListFn(items);
    setIsLoading(false);
  };

  const getMore = async () => {
    setLoadButtonIsLoading(true);
    setPage((p) => p + 1);

    const { items } = await fetchFilms.all({ ...fetchParams, page: page + 1 });

    updateFilmListFn(items);
    setLoadButtonIsLoading(false);
    setIsLoading(false);
  };

  const resetFilters = async () => {
    setPage(1);
    await resetUrl();
    methods.reset();
    handleResetSelect();
  };

  const renderContent = () => {
    if (isLoading) {
      return Array.from({ length: 16 }).map((_, key) => (
        <div key={key} className=' h-full gap-1'>
          <Skeleton
            baseColor='#16171DFF'
            borderRadius={16}
            containerClassName='flex-1 !h-[130px] h-full'
            height={330}
            highlightColor='#101011'
          />

          <Skeleton
            baseColor='#16171DFF'
            borderRadius={8}
            height={24}
            highlightColor='#101011'
          />

          <Skeleton
            baseColor='#16171DFF'
            borderRadius={8}
            containerClassName='m-auto flex mt-1 justify-center  w-full'
            height={20}
            highlightColor='#101011'
            width='120px'
          />
        </div>
      ));
    }

    return filmList.map((el) => (
      <FilmCard eyeVisible {...el} key={el.kinopoiskId} />
    ));
  };

  useEffect(() => {
    getFilms();
  }, [selectStoreModel]);

  useEffect(() => {
    const hasSearchParams = !!Object.values(queryParams).length;

    if (!hasSearchParams) {
      resetFilters();

      return;
    }

    if (hasSearchParams && filters) {
      for (const [name, value] of Object.entries(queryParams)) {
        handleUpdateSelect({ name, value: value as string });
        methods.setValue(name as keyof FormProps, [
          {
            label: getDefaultLabel(name, value as string, filters),
            value: Number(value),
          },
        ]);
      }
    }
  }, [queryParams, filters]);

  return (
    <MainLayout headProps={{ title: 'Фильмы' }}>
      <FormProvider {...methods}>
        <div className='app-container mb-6 mt-3 space-y-6'>
          <Breadcrumbs breadcrumbs={[{ label: 'Фильмы' }]} />

          <h3 className='text-[34px] font-medium'>Фильмы смотреть онлайн</h3>

          <div className='m flex flex-col gap-8'>
            <div className='flex w-full items-center justify-between'>
              <div className='grid w-full grid-cols-4 gap-3'>
                <Select
                  // multiple
                  handleChange={filtersUpdate}
                  name='countries'
                  options={prepareSelectCountries(filters?.countries) || []}
                  placeholder='Страна'
                />

                <Select
                  handleChange={filtersUpdate}
                  name='genres'
                  options={prepareSelectGenres(filters?.genres) || []}
                  placeholder='Жанр'
                />

                <Select
                  handleChange={filtersUpdate}
                  name='year'
                  options={createYearOptions()}
                  placeholder='Год'
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
            <div className='grid w-full grid-cols-6 gap-8'>
              {renderContent()}
            </div>

            {!isLoading && totalPages !== page && (
              <Button disabled={isLoadButtonLoading} onClick={getMore}>
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
