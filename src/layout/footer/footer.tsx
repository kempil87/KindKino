import Link from 'next/link';

import { ROUTES } from '~/shared/constants/routes-links';

import { Divider } from '~/components/divider/divider';
import { Icon } from '~/components/icon/icon';
import { Logo } from '~/components/logo/logo';

const CURRENT_YEAR = new Date().getFullYear();

export const Footer = () => (
  <div className='app-container z-50 w-full rounded-t-xl bg-dark py-[3rem] custom-shadow'>
    <div className='flex flex-col'>
      <div className='grid grid-cols-5 gap-5 children:bg-light_dark'>
        {Array.from({ length: 5 }).map((e, index) => (
          <a
            key={index}
            className='group w-full flex-col space-y-2 rounded-xl p-3.5 shadow-md transition-all flex-center children:text-grey'
            href='https://vk.com'
            rel='noreferrer'
            target='_blank'
          >
            <Icon
              className='transition-all group-hover:text-white/70'
              name='vk'
              size={24}
            />
            <span className='text-center text-[10px] font-medium uppercase transition-all group-hover:text-white/70 max-lg:hidden'>
              Вконтакте
            </span>
          </a>
        ))}
      </div>

      <Divider className='!my-10' />

      <div className='flex justify-between max-md:flex-col'>
        <div className='flex flex-col space-y-3 '>
          <span>© 2022-{CURRENT_YEAR}, КиндКино.</span>
          <span className='text-sm opacity-75'>
            Видеосервис КиндКино. Все права защищены. <br /> Проект может
            содержать информацию, не предназначенную для несовершеннолетних.
          </span>
        </div>

        <div className='flex items-center gap-4'>
          <Logo className='!static !transform-none max-lg:!hidden' />

          <div className='flex items-end gap-2 max-md:my-3'>
            <Link
              className='whitespace-nowrap transition-all hover:opacity-75'
              href={ROUTES.about}
            >
              О проекте
            </Link>
            <Link
              className='whitespace-nowrap transition-all hover:opacity-75'
              href={ROUTES.contacts}
            >
              Контакты
            </Link>
          </div>
        </div>
      </div>

      <Logo className='!static mx-auto mt-4 !transform-none lg:!hidden' />
    </div>
  </div>
);
