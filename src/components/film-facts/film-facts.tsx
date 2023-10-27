import { useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import cc from 'classcat';
import { AnimatePresence, motion } from 'framer-motion';

import { fetchFilms } from '~/shared/api/films/films';
import { FilmFactsResponse } from '~/shared/types/film/film';

import { Button } from '~/components/button/button';
import { Icon } from '~/components/icon/icon';
import { Title } from '~/components/title/title';

interface FilmFacts {
  id?: number;
}

const filterByType = (
  list: FilmFactsResponse['items'],
  type: 'BLOOPER' | 'FACT',
) => list.filter((el) => el.type === type);

export const FilmFacts = ({ id }: FilmFacts) => {
  const [showAllFacts, setShowAllFacts] = useState(false);
  const [showAllBlooper, setShowAllBlooper] = useState(false);
  const [warningsSpoilers, setWarningsSpoilers] = useState<string[]>([]);

  const { data: factsList } = useQuery({
    enabled: !!id,
    queryFn: () => fetchFilms.facts({ id: String(id) }),
    queryKey: ['film-facts-list', id],
  });

  const hideSpoilerWarning = (id: string) => {
    if (warningsSpoilers.includes(id)) return;

    setWarningsSpoilers((p) => [...p, id]);
  };

  if (!factsList?.items.length) return null;

  const prepareFacts = () => {
    if (showAllFacts) {
      return filterByType(factsList?.items, 'FACT');
    }
    if (factsList.total >= 8) {
      return filterByType(factsList?.items.slice(0, 8), 'FACT');
    }
  };

  const prepareBlooper = () => {
    if (showAllBlooper) {
      return filterByType(factsList?.items, 'BLOOPER');
    }
    if (factsList.total >= 8) {
      return filterByType(factsList?.items.slice(0, 8), 'BLOOPER');
    }
  };

  return (
    <div>
      {!!prepareFacts()?.length && (
        <>
          <Title>Знаете ли вы, что…</Title>
          <div className='mt-4 flex flex-col rounded-xl bg-dark p-4'>
            <div className='grid grid-cols-4 gap-4'>
              {prepareFacts()
                ?.slice(0, 8)
                ?.map((el) => (
                  <div
                    key={el.text}
                    className='relative h-full overflow-hidden rounded-xl bg-light_dark p-3'
                  >
                    <div
                      className='relative z-10 text-white/80'
                      dangerouslySetInnerHTML={{ __html: el.text }}
                    />

                    <div className='z-0 pos-abs'>
                      <Icon
                        className='rotate-45 text-grey/40'
                        name='camera'
                        size={230}
                      />
                    </div>
                  </div>
                ))}
            </div>

            <AnimatePresence>
              {showAllFacts && (
                <motion.div
                  animate={{ height: '100%', opacity: 1 }}
                  className='mt-4 grid w-full grid-cols-4 gap-4'
                  exit={{ height: 0, opacity: 0 }}
                  initial={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {prepareFacts()
                    ?.slice(8)
                    ?.map((el) => (
                      <div
                        key={el.text}
                        className='relative h-full overflow-hidden rounded-xl bg-light_dark p-3'
                      >
                        <div
                          className='relative z-10 text-white/80'
                          dangerouslySetInnerHTML={{ __html: el.text }}
                        />

                        <div className='z-0 pos-abs'>
                          <Icon
                            className='rotate-45 text-grey/40'
                            name='camera'
                            size={230}
                          />
                        </div>
                      </div>
                    ))}
                </motion.div>
              )}
            </AnimatePresence>

            {filterByType(factsList?.items, 'FACT')?.length > 8 && (
              <Button
                className='mt-4'
                view='light'
                onClick={() => setShowAllFacts(!showAllFacts)}
              >
                <span className='mr-1'>
                  {showAllFacts ? 'Свернуть все' : 'Показать все'}
                </span>
                <div
                  className={cc([
                    'animated flex-center',
                    { '-rotate-180': showAllFacts },
                  ])}
                >
                  <Icon name='downAngle' size={22} />
                </div>
              </Button>
            )}
          </div>
        </>
      )}

      {!!prepareBlooper()?.length && (
        <>
          <Title className='mt-4'>Ошибки в фильме</Title>
          <div className='mt-4 flex flex-col rounded-xl bg-dark p-4'>
            <div className='grid grid-cols-4 gap-4'>
              {prepareBlooper()?.map((el) => {
                const visibleWarning =
                  !warningsSpoilers.includes(el.text) && el.spoiler;

                return (
                  <button
                    key={el.text}
                    className='relative h-full w-full overflow-hidden rounded-xl bg-light_dark p-3'
                    onClick={() => hideSpoilerWarning(el.text)}
                  >
                    <div
                      dangerouslySetInnerHTML={{ __html: el.text }}
                      className={cc([
                        'relative z-10 text-center text-white/80 transition-all',
                        { blur: visibleWarning },
                      ])}
                    />

                    <div
                      className={cc([
                        'whitespace-nowrap text-lg font-medium transition-all pos-abs',
                        { 'invisible opacity-0': !visibleWarning },
                      ])}
                    >
                      Осторожно спойлер
                    </div>

                    <div className='z-0 pos-abs'>
                      <Icon
                        className='rotate-12 text-grey/40'
                        name='error'
                        size={230}
                      />
                    </div>
                  </button>
                );
              })}
            </div>

            {filterByType(factsList?.items, 'BLOOPER')?.length > 8 && (
              <Button
                className='mt-4'
                view='light'
                onClick={() => setShowAllBlooper(!showAllBlooper)}
              >
                {showAllBlooper ? 'Свернуть все' : 'Показать все'}

                <Icon
                  className='ml-1 translate-y-0.5'
                  name='downAngle'
                  size={22}
                />
              </Button>
            )}
          </div>
        </>
      )}
    </div>
  );
};
