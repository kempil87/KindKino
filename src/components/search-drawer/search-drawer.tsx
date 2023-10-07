/* eslint-disable @typescript-eslint/ban-ts-comment */
import {useRef, useState} from 'react';
import Link from 'next/link';

import cc from 'classcat';
import {FormProvider, useForm} from 'react-hook-form';
import {useOutsideClick} from 'rooks';

import {fetchFilms} from '~/shared/api/films/films';
import {ROUTES} from '~/shared/constants/routes-links';
import {RULES} from '~/shared/constants/rules';
import {Film} from '~/shared/types/film/film';

import style from '~/styles/header.module.css';

import {Icon} from '~/components/icon/icon';
import {Input} from '~/components/input/input';

interface SearchProps {
    search: string
}

export const SearchDrawer = () => {
  const methods = useForm<SearchProps>({reValidateMode: 'onChange'});
  const [isVisible, setIsVisible] = useState(false);
  const [filmsList, setFilmsList] = useState<Film[]>([]);

  const drawerRef = useRef<HTMLDivElement>(null);

  const onHide = () => {
    setIsVisible(false);
  };

  const showDrawer = () => {
    setIsVisible(true);
  };

  const onSearch = async ({search: keyword}: SearchProps) => {
    if (!keyword) {
      setFilmsList([]);
    }
    if (!methods.formState.isValid) return;

    const {items} = await fetchFilms.all({keyword});

    items.length && setFilmsList(items);
  };

  useOutsideClick(drawerRef, onHide);

  return (
    <>
      <Icon
        className={style.search}
        name='search'
        onClick={showDrawer}
      />

      <div
        ref={drawerRef}
        className={cc(['fixed top-0 right-0 w-[25vw] bottom-0 z-[500] h-screen bg-dark p-6 transition-all', {'translate-x-full': !isVisible}])}
      >
        <h3 className='text-2xl font-medium mb-3'>Найди любимые фильмы, серилы или актеров</h3>

        <FormProvider {...methods}>
          <Input<SearchProps>
            className='rounded-md bg-white/60 w-full h-10  placeholder:text-white/80 border-primary border'
            //@ts-ignore
            handleChange={methods.handleSubmit(onSearch)}
            maxLength={50}
            name='search'
            placeholder="Фильмы, сериалы, актеры"
            rules={RULES.search}
          />
        </FormProvider>

        <div className='my-5 overflow-y-auto max-h-[calc(100vh-200px)] space-y-5'>
          {filmsList.map((el,index) => (
            <>
              {!!index && <div className="my-1 h-px w-full bg-gradient-to-r from-[#3f414b00] via-[#3F414B] to-[#3f414b00]" />}
              <Link key={el.filmId} className='flex items-center space-x-2.5 rounded-xl  hover:shadow' href={ROUTES.film(String(el.filmId))}>
                <img className='size-16 rounded-xl object-cover' src={el.posterUrl}/>

                <div className="flex flex-col">
                  <span className='font-medium text-lg break-words'>
                    {el.nameRu}
                  </span>
                  <span className='font-medium text-grey text-sm break-words'>
                    {el.year}
                  </span>
                </div>
              </Link>
            </>
          ))}
        </div>

        {isVisible && (
          <button className='pos-abs-y -left-10 group size-fit' onClick={onHide}>
            <Icon className='group-hover:rotate-180 transition-all' name='close' size={25}/>
          </button>
        )}
      </div>
    </>

  );
};
