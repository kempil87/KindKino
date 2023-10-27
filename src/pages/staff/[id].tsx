import { useRouter } from 'next/router';

import { useQuery } from '@tanstack/react-query';

import { fetchStaff } from '~/shared/api/staff/staff';

import styles from '../../styles/staff.module.css';

import { AppLoader } from '~/components/app-loader/app-loader';
import { Breadcrumbs } from '~/components/breadcrumbs/breadcrumbs';
import { MainLayout } from '~/layout/main-layout/main-layout';

export default function Page() {
  const {
    query: { id },
  } = useRouter();

  const { isLoading, data } = useQuery({
    enabled: !!id,
    queryFn: () => fetchStaff.view({ id: id as string }),
    queryKey: ['staff-view', id],
  });

  console.log(data);

  const breadcrumbs = [{ label: data?.nameRu || '' }];

  if (isLoading) return <AppLoader />;

  return (
    <MainLayout
      classNameContent='app-container'
      {...(data?.nameRu && { headProps: { title: data?.nameRu } })}
    >
      <Breadcrumbs breadcrumbs={breadcrumbs} />

      <div className={styles.staffBg}>
        <div className='flex'>
          <img className={styles.staffImage} src={data?.posterUrl} />
          {data?.nameRu}
        </div>
      </div>
    </MainLayout>
  );
}
