import { MainLayout } from '~/layout/main-layout/main-layout';
export default function Favorites() {
  return (
    <MainLayout
      classNameContent='app-container flex-center'
      headProps={{ title: 'Избранное' }}
    >
      <div className='mt-12 text-center text-xl font-medium'>
        Здесь будут фильмы добавленные в Избранное (Страница в разработке)
      </div>
    </MainLayout>
  );
}
