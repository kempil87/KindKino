import Link from 'next/link';

import { ROUTES } from '~/shared/constants/routes-links';

import { Button } from '~/components/button/button';
import { MainLayout } from '~/layout/main-layout/main-layout';

export default function Error() {
  return (
    <MainLayout classNameContent='flex-center'>
      <div className='my-12 flex flex-col text-center text-4xl font-medium capitalize'>
        ошибка <br />
        <span className='text-5xl text-primary'>404</span>
        <Link className='mt-6 text-base' href={ROUTES.home}>
          <Button view='light'>На главную</Button>
        </Link>
      </div>
    </MainLayout>
  );
}
