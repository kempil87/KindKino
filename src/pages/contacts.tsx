import dynamic from 'next/dynamic';

import {Breadcrumbs} from '~/components/breadcrumbs/breadcrumbs';
import {Title} from '~/components/title/title';
import {MainLayout} from '~/layout/main-layout/main-layout';

const MapViewDynamic = dynamic(
  () =>
    import('~/components/map/map-view').then(
      (res) => res.MapView,
    ),
  {
    ssr: false,
  },
);

export default function Contacts() {
  return (
    <MainLayout headProps={{title:'Контакты'}}>
      <section className='app-container'>
        <Breadcrumbs breadcrumbs={[{label:'Контакты'}]}/>

        <Title className='mt-6'>Контакты</Title>

        <div className="flex flex-col">
          <span className='my-6'>
          По вопросам сотрудничества напишите нам на
            <a className='text-white/30 hover:text-white transition-all cursor-pointer'> partners@kindkino.ru</a>
          </span>
          <span>
          По вопросам работы приложения и подписок напишите на почту
            <a className='text-white/30 hover:text-white transition-all cursor-pointer'> support@kindkino.ru</a>
          </span>
        </div>
      </section>

      <section className='relative'>
        <div className='pos-abs-x text-4xl uppercase -top-20 z-50'>
            Наш офис
        </div>
        <div className='pos-abs-x text-xl uppercase -top-7 z-50'>
            МОСКВА, Ленинградский пр-т. 36
        </div>
        <MapViewDynamic />
      </section>
    </MainLayout>
  );
}
