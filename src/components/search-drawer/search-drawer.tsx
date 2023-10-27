/* eslint-disable @typescript-eslint/ban-ts-comment,@next/next/no-img-element */
import { useRef, useState } from 'react';
import Link from 'next/link';

import cc from 'classcat';
import { FormProvider, useForm } from 'react-hook-form';
import { useOutsideClick } from 'rooks';

import { fetchFilms } from '~/shared/api/films/films';
import { ROUTES } from '~/shared/constants/routes-links';
import { RULES } from '~/shared/constants/rules';
import { Film } from '~/shared/types/film/film';

import style from '~/styles/header.module.css';

import { Icon } from '~/components/icon/icon';
import { Input } from '~/components/input/input';

interface SearchProps {
  search: string;
}

export const SearchDrawer = () => {
  const methods = useForm<SearchProps>({ reValidateMode: 'onChange' });
  const [isVisible, setIsVisible] = useState(false);
  const [filmsList, setFilmsList] = useState<Film[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const drawerRef = useRef<HTMLDivElement>(null);
  const validField = methods.formState.isValid;

  const onHide = () => {
    setIsVisible(false);
  };

  const showDrawer = () => {
    setIsVisible(true);
  };

  const onSearch = async ({ search: keyword }: SearchProps) => {
    if (!keyword) {
      setFilmsList([]);

      return;
    }
    if (!validField) return;

    setIsLoading(true);
    const { items } = await fetchFilms.all({ keyword });

    items.length && setFilmsList(items);
    setIsLoading(false);
  };

  useOutsideClick(drawerRef, onHide);

  return (
    <>
      <button className={style.headerButton} onClick={showDrawer}>
        <Icon className={style.search} name='search' />
      </button>

      <div
        ref={drawerRef}
        className={cc([
          'fixed bottom-0 right-0 top-0 z-[500] h-screen w-[25vw] rounded-l-2xl bg-dark p-6 transition-all duration-300 custom-shadow',
          { 'translate-x-full': !isVisible },
        ])}
      >
        <h3 className='mb-3 text-2xl font-medium'>
          Найди любимые фильмы или серилы
        </h3>

        <FormProvider {...methods}>
          <Input<SearchProps>
            className='h-10 w-full rounded-md border  border-primary bg-white/60 placeholder:text-white/80'
            //@ts-ignore
            handleChange={methods.handleSubmit(onSearch)}
            maxLength={50}
            name='search'
            placeholder='Фильмы, сериалы, актеры'
            rules={RULES.search}
          />
        </FormProvider>

        {isLoading ? (
          <div className='mt-32 flex-center'>
            <Icon className='animate-pulse text-grey' name='search' size={40} />
          </div>
        ) : (
          <div className='my-5 max-h-[calc(100vh-200px)] space-y-5 overflow-y-auto'>
            {!filmsList.length && methods.watch('search') && validField && (
              <span className='text-center text-xl font-bold text-grey'>
                Ничего не найдено : (
              </span>
            )}

            {filmsList.map((el, index) => (
              <>
                {!!index && (
                  <div className='my-1 h-px w-full bg-gradient-to-r from-[#3f414b00] via-[#3F414B] to-[#3f414b00]' />
                )}
                <Link
                  key={el.filmId}
                  className='flex items-center space-x-3 rounded-xl transition-all hover:opacity-75'
                  href={ROUTES.film(String(el.kinopoiskId))}
                >
                  <img
                    alt='banner'
                    className='max-h-[70px] min-h-[70px] min-w-[70px] max-w-[70px] rounded-xl object-cover'
                    src={el.posterUrl}
                  />

                  <div className='flex flex-col'>
                    <span className='line-clamp-2 pr-2 text-lg font-medium'>
                      {el.nameRu}
                    </span>
                    <span className='break-words text-sm font-medium text-grey'>
                      {el.year}
                    </span>
                  </div>
                </Link>
              </>
            ))}
          </div>
        )}

        <button
          className={cc([
            'group -left-10 transition-all duration-300 size-fit pos-abs-y',
            { 'invisible opacity-0': !isVisible },
          ])}
          onClick={onHide}
        >
          <Icon
            className='transition-all duration-500 group-hover:rotate-180'
            name='close'
            size={25}
          />
        </button>
      </div>
    </>
  );
};
