import { MainLayout } from '~/layout/main-layout/main-layout';

export default function Error() {
  return (
    <MainLayout classNameContent='flex-center'>
      <div className='mt-12 text-center text-4xl font-medium capitalize'>
        ошибка <br />
        <span className='text-5xl text-primary'>404</span>
      </div>
    </MainLayout>
  );
}
