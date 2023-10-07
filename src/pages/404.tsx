import {MainLayout} from '~/layout/main-layout/main-layout';

export default function Error() {
  return (
    <MainLayout classNameContent="app-container flex-center">
      <div className='capitalize text-4xl font-medium mt-12 text-center'>
          ошибка <br/>
        <span className='text-5xl text-primary'>404</span>
      </div>
    </MainLayout>
  );
}
