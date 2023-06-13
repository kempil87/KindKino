import { useRouter } from 'next/router';

import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";

import { AppLoader } from '~/components/app-loader/app-loader';
import { Breadcrumbs } from '~/components/breadcrumbs/breadcrumbs';

import { MainLayout } from '~/layout/MainLayout/main-layout';
import { fetchStaff } from "~/shared/api/staff/staff";
import { DATE_FORMAT_FULL } from '~/shared/constants/formats';

export default function Page() {
  const {
    query: { id },
  } = useRouter();

  const { isLoading, data } = useQuery({
    queryFn: () => fetchStaff.view({ id }),
    queryKey: ["staff-view", id],
  });

  const breadcrumbs = [
    {
      label: data?.nameRu || '',
    },
  ];

  console.log(data);

  if (isLoading) return <AppLoader />;

  return (
    <MainLayout>
      <div className="app-container">
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        <img
          className="h-96 w-72 rounded-2xl object-cover"
          src={data?.posterUrl}
        />

        <div className="flex flex-col">
          <div className="flex flex-col space-y-2">
            {data?.facts.map((i) => (
              <span key={i}>{i}</span>
            ))}
          </div>
          <span>{data?.birthplace}</span>
          <span className="uppercase">
            {dayjs(data?.birthday).format(DATE_FORMAT_FULL)}
          </span>
          <span>{data?.age}</span>
        </div>
      </div>
    </MainLayout>
  );
}
