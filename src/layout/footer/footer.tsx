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
        <a
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
          <span className='text-center text-[10px] font-medium uppercase transition-all group-hover:text-white/70'>
            Вконтакте
          </span>
        </a>
        <a
          className='group w-full flex-col space-y-2 rounded-xl p-3.5 shadow-md transition-all flex-center children:text-grey'
          href='https://vk.com'
          rel='noreferrer'
          target='_blank'
        >
          <Icon
            className='transition-all group-hover:text-white'
            name='vk'
            size={24}
          />
          <span className='text-center text-[10px] font-medium uppercase transition-all group-hover:text-white'>
            Вконтакте
          </span>
        </a>
        <a
          className='group w-full flex-col space-y-2 rounded-xl p-3.5 shadow-md transition-all flex-center children:text-grey'
          href='https://vk.com'
          rel='noreferrer'
          target='_blank'
        >
          <Icon
            className='transition-all group-hover:text-white'
            name='vk'
            size={24}
          />
          <span className='text-center text-[10px] font-medium uppercase transition-all group-hover:text-white'>
            Вконтакте
          </span>
        </a>
        <a
          className='group w-full flex-col space-y-2 rounded-xl p-3.5 shadow-md transition-all flex-center children:text-grey'
          href='https://vk.com'
          rel='noreferrer'
          target='_blank'
        >
          <Icon
            className='transition-all group-hover:text-white'
            name='vk'
            size={24}
          />
          <span className='text-center text-[10px] font-medium uppercase transition-all group-hover:text-white'>
            Вконтакте
          </span>
        </a>
        <a
          className='group w-full flex-col space-y-2 rounded-xl p-3.5 shadow-md transition-all flex-center children:text-grey'
          href='https://vk.com'
          rel='noreferrer'
          target='_blank'
        >
          <Icon
            className='transition-all group-hover:text-white'
            name='vk'
            size={24}
          />
          <span className='text-center text-[10px] font-medium uppercase transition-all group-hover:text-white'>
            Вконтакте
          </span>
        </a>
      </div>

      <Divider className='!my-10' />

      <div className='flex justify-between'>
        <div className='flex flex-col space-y-3 '>
          <span>© 2022-{CURRENT_YEAR}, КиндКино.</span>
          <span className='text-sm opacity-75'>
            Видеосервис КиндКино. Все права защищены. <br /> Проект может
            содержать информацию, не предназначенную для несовершеннолетних.
          </span>
        </div>

        <div className='flex items-center space-x-4'>
          <Logo className='!static !transform-none' />

          <div className='flex flex-col items-end space-y-2'>
            <Link
              className='transition-all hover:opacity-75'
              href={ROUTES.about}
            >
              О проекте
            </Link>
            <Link
              className='transition-all hover:opacity-75'
              href={ROUTES.contacts}
            >
              Контакты
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
);
