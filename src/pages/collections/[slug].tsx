import { useRouter } from 'next/router';

import { MainLayout } from '~/layout/main-layout/main-layout';

export default function Page() {
  const slug = (useRouter().query.slug as string) || '';

  return (
    <MainLayout classNameContent='app-container'>
      <div className='my-6 text-center'>
        Здесь будет подборка фильмов по данной колекции
      </div>
      <div className='my-6'>Страница в разработке</div>
      <div className='my-6'>{slug}</div>
    </MainLayout>
  );
}
