import {PropsWithChildren} from 'react';
import Image from 'next/image';
import Link from 'next/link';

import {ROUTES} from '~/shared/constants/routes-links';
import {FilmStaff} from '~/shared/types/staff/staff';

import {Icon} from '~/components/icon/icon';
import {Tooltip} from '~/components/tooltip/tooltip';

export const PersonPopover = ({staffId,description,posterUrl,professionText,nameRu,children}: PropsWithChildren<FilmStaff>) => (
  <div className='relative group/person'>
    {children}

    <Link className='absolute bg-dark group/person-link z-50 min-w-[300px] shadow top-8 opacity-0 group-hover/person:opacity-100  rounded-xl flex space-x-4 invisible group-hover/person:visible transition-all' href={ROUTES.staff(String(staffId))}>
      <Image alt='person' className='rounded-xl my-4 ml-4' height={110} src={posterUrl} width={70} />

      <div className='flex py-4 pr-4 flex-col relative overflow-hidden w-full font-medium capitalize'>
        <Icon className='absolute group-hover/person-link:text-white/90 transition-all text-grey/40 -right-2.5 -bottom-2.5' name='masks' size={100} />

        <div className='w-full flex justify-between'>
          <span>{description || nameRu}</span>

          <Tooltip position='bottom_left' text='Сохранить'>
            <Icon className='translate-y-1 h-fit hover:text-primary transition-all cursor-pointer' name='star' size={20} />
          </Tooltip>
        </div>
        <div className='text-white/60 text-sm mt-1 font-normal'>{professionText.slice(0,-1)}</div>
      </div>
    </Link>
  </div>
);
