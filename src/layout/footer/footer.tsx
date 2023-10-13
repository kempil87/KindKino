import Link from 'next/link';

import {ROUTES} from '~/shared/constants/routes-links';

import {Icon} from '~/components/icon/icon';
import {Logo} from '~/components/logo/logo';

const CURRENT_YEAR = new Date().getFullYear();

export const Footer = () => (
  <div className="app-container z-50 w-full bg-dark py-[3rem] rounded-t-xl">
    <div className="flex flex-col">
      <div className="grid grid-cols-5 gap-5 children:bg-light_dark">
        <a className='w-full shadow-md p-3.5 flex-center flex-col space-y-2 rounded-xl group children:text-grey transition-all' href='https://vk.com' rel="noreferrer" target='_blank'>
          <Icon className='group-hover:text-white/70 transition-all' name='vk' size={24}/>
          <span className='font-medium text-center group-hover:text-white/70 transition-all uppercase text-[10px]'>Вконтакте</span>
        </a>
        <a className='w-full shadow-md p-3.5 flex-center flex-col space-y-2 rounded-xl group children:text-grey transition-all' href='https://vk.com' rel="noreferrer" target='_blank'>
          <Icon className='group-hover:text-white transition-all' name='vk' size={24}/>
          <span className='font-medium text-center group-hover:text-white transition-all uppercase text-[10px]'>Вконтакте</span>
        </a>
        <a className='w-full shadow-md p-3.5 flex-center flex-col space-y-2 rounded-xl group children:text-grey transition-all' href='https://vk.com' rel="noreferrer" target='_blank'>
          <Icon className='group-hover:text-white transition-all' name='vk' size={24}/>
          <span className='font-medium text-center group-hover:text-white transition-all uppercase text-[10px]'>Вконтакте</span>
        </a>
        <a className='w-full shadow-md p-3.5 flex-center flex-col space-y-2 rounded-xl group children:text-grey transition-all' href='https://vk.com' rel="noreferrer" target='_blank'>
          <Icon className='group-hover:text-white transition-all' name='vk' size={24}/>
          <span className='font-medium text-center group-hover:text-white transition-all uppercase text-[10px]'>Вконтакте</span>
        </a>
        <a className='w-full shadow-md p-3.5 flex-center flex-col space-y-2 rounded-xl group children:text-grey transition-all' href='https://vk.com' rel="noreferrer" target='_blank'>
          <Icon className='group-hover:text-white transition-all' name='vk' size={24}/>
          <span className='font-medium text-center group-hover:text-white transition-all uppercase text-[10px]'>Вконтакте</span>
        </a>
      </div>

      <div className="my-6 h-px w-full bg-gradient-to-r from-[#3f414b00] via-[#3F414B] to-[#3f414b00]" />

      <div className="flex justify-between">
        <div className="flex flex-col space-y-3 ">
          <span>© 2022-{CURRENT_YEAR}, КиндКино.</span>
          <span className="text-sm opacity-75">
         Видеосервис КиндКино. Все права защищены. <br/> Проект может содержать информацию, не предназначенную для
          несовершеннолетних.
          </span>
        </div>

        <div className="flex items-center space-x-4">
          <Logo className='!static !transform-none' />

          <div className='flex flex-col space-y-2 items-end'>
            <Link className='hover:opacity-75 transition-all' href={ROUTES.about}>О проекте</Link>
            <Link className='hover:opacity-75 transition-all' href={ROUTES.contacts}>Контакты</Link>
          </div>
        </div>
      </div>
    </div>
  </div>
);
