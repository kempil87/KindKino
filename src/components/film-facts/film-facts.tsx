import {useState} from 'react';

import {useQuery} from '@tanstack/react-query';
import cc from 'classcat';

import {fetchFilms} from '~/shared/api/films/films';
import {FilmFactsResponse} from '~/shared/types/film/film';

import {Button} from '~/components/button/button';
import {Icon} from '~/components/icon/icon';
import {Title} from '~/components/title/title';

interface FilmFacts {
    id?: number
}

const filterByType = (list: FilmFactsResponse['items'], type: 'BLOOPER' | 'FACT') => list.filter(el => el.type === type);

export const FilmFacts = ({id}: FilmFacts) => {
  const [showAllFacts, setShowAllFacts] = useState(false);
  const [showAllBlooper, setShowAllBlooper] = useState(false);
  const [warningsSpoilers, setWarningsSpoilers] = useState<string[]>([]);

  const {data: factsList} = useQuery({
    enabled: !!id,
    queryFn: () => fetchFilms.facts({id: String(id)}),
    queryKey: ['film-facts-list', id],
  });

  const hideSpoilerWarning = (id:string) => {
    if (warningsSpoilers.includes(id)) return;

    setWarningsSpoilers(p => [...p,id]);
  };

  if (!factsList?.items.length) return null;

  const prepareFacts = () => {
    if (showAllFacts){
      return filterByType(factsList?.items, 'FACT');
    }
    if (factsList.total >= 8) {
      return filterByType(factsList?.items.slice(0,8), 'FACT');
    }
  };

  const prepareBlooper = () => {
    if (showAllBlooper){
      return filterByType(factsList?.items, 'BLOOPER');
    }
    if (factsList.total >= 8) {
      return filterByType(factsList?.items.slice(0,8), 'BLOOPER');
    }
  };

  return (
    <div>
      {!!prepareFacts()?.length && (
        <>
          <Title>Знаете ли вы, что…</Title>
          <div className="flex flex-col bg-dark rounded-xl mt-4 p-4">
            <div className='grid grid-cols-4 gap-4'>
              {prepareFacts()?.map(el => (
                <div key={el.text} className='bg-light_dark relative overflow-hidden h-full p-3 rounded-xl'>
                  <div className='text-white/80 z-10 relative' dangerouslySetInnerHTML={{__html: el.text}}/>

                  <div className='pos-abs z-0'>
                    <Icon className='rotate-45 text-grey/40' name='camera' size={230} />
                  </div>
                </div>
              ))}
            </div>

            {filterByType(factsList?.items, 'FACT')?.length > 8 && (
              <Button className='mt-4 w-fit mx-auto' view='light' onClick={() => setShowAllFacts(!showAllFacts)}>
                {showAllFacts ? 'Свернуть все' : 'Показать все'}

                <Icon className='translate-y-0.5 ml-1' name='downAngle' size={22} />
              </Button>
            )}
          </div>
        </>
      )}

      {!!prepareBlooper()?.length && (
        <>
          <Title className='mt-4'>Ошибки в фильме</Title>
          <div className="flex flex-col bg-dark rounded-xl mt-4 p-4">
            <div className='grid grid-cols-4 gap-4'>
              {prepareBlooper()?.map(el => {
                const visibleWarning = !warningsSpoilers.includes(el.text) && el.spoiler;

                return (
                  <button
                    key={el.text}
                    className='bg-light_dark w-full relative overflow-hidden h-full p-3 rounded-xl'
                    onClick={() => hideSpoilerWarning(el.text)}
                  >
                    <div className={cc(['text-white/80 z-10 text-center transition-all relative',{'blur':visibleWarning}])} dangerouslySetInnerHTML={{__html: el.text}}/>

                    <div className={cc(['pos-abs text-lg whitespace-nowrap transition-all font-medium',{'invisible opacity-0': !visibleWarning}])}>
                        Осторожно спойлер
                    </div>

                    <div className='pos-abs z-0'>
                      <Icon className='rotate-12 text-grey/40' name='error' size={230} />
                    </div>
                  </button>
                );
              })}
            </div>

            {filterByType(factsList?.items, 'BLOOPER')?.length > 8 && (
              <Button className='mt-4 w-fit mx-auto' view='light' onClick={() => setShowAllBlooper(!showAllBlooper)}>
                {showAllBlooper ? 'Свернуть все' : 'Показать все'}

                <Icon className='translate-y-0.5 ml-1' name='downAngle' size={22} />
              </Button>
            )}
          </div>
        </>
      )}
    </div>
  );
};
