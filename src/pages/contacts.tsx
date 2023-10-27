import dynamic from 'next/dynamic';

import { Breadcrumbs } from '~/components/breadcrumbs/breadcrumbs';
import { Title } from '~/components/title/title';
import { MainLayout } from '~/layout/main-layout/main-layout';

const MapViewDynamic = dynamic(
  () => import('~/components/map/map-view').then((res) => res.MapView),
  {
    ssr: false,
  },
);

export default function Contacts() {
  return (
    <MainLayout classNameContent='!px-0' headProps={{ title: 'Контакты' }}>
      <section className='app-container'>
        <Breadcrumbs breadcrumbs={[{ label: 'Контакты' }]} />

        <Title className='mt-6'>Контакты</Title>

        <div className='flex flex-col'>
          <span className='my-6'>
            По вопросам сотрудничества напишите нам на
            <a className='cursor-pointer text-white/30 transition-all hover:text-white'>
              {' '}
              partners@kindkino.ru
            </a>
          </span>
          <span>
            По вопросам работы приложения и подписок напишите на почту
            <a className='cursor-pointer text-white/30 transition-all hover:text-white'>
              {' '}
              support@kindkino.ru
            </a>
          </span>
        </div>
      </section>

      <section className='relative'>
        <div className='-top-20 z-50 text-4xl uppercase pos-abs-x'>
          Наш офис
        </div>
        <div className='-top-7 z-50 text-xl uppercase pos-abs-x'>
          МОСКВА, Ленинградский пр-т. 36
        </div>
        <MapViewDynamic />
      </section>
    </MainLayout>
  );
}
