import { PropsWithChildren } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { ROUTES } from '~/shared/constants/routes-links';
import { FilmStaff } from '~/shared/types/staff/staff';

import { Icon } from '~/components/icon/icon';
import { Tooltip } from '~/components/tooltip/tooltip';

export const PersonPopover = ({
  staffId,
  description,
  posterUrl,
  professionText,
  nameRu,
  children,
}: PropsWithChildren<FilmStaff>) => (
  <div className='group/person relative'>
    {children}

    <Link
      className='group/person-link invisible absolute top-8 z-50 flex min-w-[300px] space-x-4 rounded-xl bg-dark  opacity-0 transition-all duration-500 custom-shadow group-hover/person:visible group-hover/person:opacity-100'
      href={ROUTES.staff(String(staffId))}
    >
      <Image
        alt='person'
        className='my-4 ml-4 rounded-xl'
        height={110}
        src={posterUrl}
        width={70}
      />

      <div className='relative flex w-full flex-col overflow-hidden py-4 pr-4 font-medium capitalize'>
        <Icon
          className='absolute -bottom-2.5 -right-2.5 text-grey/40 transition-all group-hover/person-link:text-white/90'
          name='masks'
          size={100}
        />

        <div className='flex w-full justify-between'>
          <span>{description || nameRu}</span>

          <Tooltip position='bottom_left' text='Сохранить'>
            <Icon
              className='h-fit translate-y-1 cursor-pointer transition-all hover:text-primary'
              name='star'
              size={20}
            />
          </Tooltip>
        </div>
        <div className='mt-1 text-sm font-normal text-white/60'>
          {professionText.slice(0, -1)}
        </div>
      </div>
    </Link>
  </div>
);
