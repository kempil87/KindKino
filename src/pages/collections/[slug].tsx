import { useRouter } from 'next/router';

import { MainLayout } from '~/layout/main-layout/main-layout';

export default function Page() {
  const slug = (useRouter().query.slug as string) || '';

  return (
    <MainLayout classNameContent='app-container'>
      <div>{slug}</div>
    </MainLayout>
  );
}
