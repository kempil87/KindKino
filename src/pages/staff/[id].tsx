import { useRouter } from 'next/router';

import { useQuery } from '@tanstack/react-query';
import cc from 'classcat';

import { fetchStaff } from '~/shared/api/staff/staff';

import styles from '../../styles/staff.module.css';

import { AppLoader } from '~/components/app-loader/app-loader';
import {Breadcrumbs} from '~/components/breadcrumbs/breadcrumbs';
import {MainLayout} from '~/layout/main-layout/main-layout';
export default function Page() {
  const {query: { id }} = useRouter();

  const { isLoading, data } = useQuery({
    enabled:!!id,
    queryFn: () => fetchStaff.view({ id: id as string }),
    queryKey: ['staff-view', id]
  });

  const breadcrumbs = [{label: data?.nameRu || ''}];

  if (isLoading) return <AppLoader />;

  return (
    <MainLayout {...data?.nameRu && {headProps:{title: data?.nameRu}}}>
      <div className='fixed inset-0'>
        <div
          className={cc([styles.staffBg,'w-full h-full bg-no-repeat bg-center'])}
          style={{backgroundImage: 'url(https://thumbs.dfs.ivi.ru/storage31/contents/7/1/37d0e3517b97fd21903d3d038d93c7.jpg/1920x1080/?q=85)'}}
        >
          <div className='py-[78px] app-container flex flex-col h-full flex-1 justify-between'>
            <Breadcrumbs breadcrumbs={breadcrumbs} />

            <div className="flex-center mb-6 flex-col">
              <h5 className='text-5xl font-extrabold'>{data?.nameRu}</h5>
              <h5 className='text-3xl font-bold text-white/60'>{data?.nameEn}</h5>
            </div>
          </div>
        </div>
      </div>

      {/*  <div className='flex flex-col w-full'>*/}
      {/*    <span>{data?.nameRu}</span>*/}
      {/*    /!*<div className="my-1 h-px w-full bg-gradient-to-r from-[#3f414b00] via-[#3F414B] to-[#3f414b00]" />*!/*/}
      {/*    <span>{data?.nameEn}</span>*/}
      {/*    <span>{data?.birthplace}</span>*/}
      {/*    <div className='flex space-x-3'>*/}
      {/*      <span className="uppercase">*/}
      {/*        {dayjs(data?.birthday).format(DATE_FORMAT_FULL)}*/}
      {/*      </span>*/}
      {/*      <span>({data?.age})</span>*/}
      {/*    </div>*/}

      {/*  </div>*/}
      {/*</div>*/}

      {/*<div className="flex flex-col my-4">*/}
      {/*  <div className="flex flex-col space-y-2">*/}
      {/*    {data?.facts.map((i) => (*/}
      {/*      <span key={i}>{i}</span>*/}
      {/*    ))}*/}
      {/*  </div>*/}

    </MainLayout>
  );
}
