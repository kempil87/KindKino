import Link from 'next/link';

import cc from 'classcat';
import { useUnit } from 'effector-react/scope';

import { ROUTES } from '~/shared/constants/routes-links';
import { logout } from '~/shared/models/auth';
import { showModal } from '~/shared/models/modal';
import { $profile } from '~/shared/models/profile';

import styles from '../../styles/profile-menu.module.css';

import { Icon } from '~/components/icon/icon';

export const ProfileMenu = () => {
  const { $profileModel, logoutFn, showModalFn } = useUnit({
    $profileModel: $profile,
    logoutFn: logout,
    showModalFn: showModal,
  });

  const showPreferenceModal = () => showModalFn('preference');

  if (!$profileModel) return null;

  return (
    <div className='group relative'>
      <div className={styles.text}>{$profileModel.email}</div>

      <div className='invisible absolute right-0 top-[calc(100%+20px)] flex min-w-fit translate-y-4 flex-col space-y-2.5 rounded bg-dark p-3 px-6 opacity-0 transition-all custom-shadow group-hover:visible group-hover:translate-y-0 group-hover:opacity-100'>
        <div className={cc([styles.text, 'text-center text-sm font-medium'])}>
          PREMIUM
        </div>

        <div className='my-1 h-px w-full bg-gradient-to-r from-[#3f414b00] via-[#3F414B] to-[#3f414b00]' />

        <button
          className='flex items-center space-x-3 font-medium transition-all hover:text-primary'
          onClick={showPreferenceModal}
        >
          <span>Предпочтения</span>
          <Icon className='rotate-12' name='camera' size={20} />
        </button>

        <div className='my-1 h-px w-full bg-gradient-to-r from-[#3f414b00] via-[#3F414B] to-[#3f414b00]' />

        <Link
          className='flex items-center space-x-3 font-medium transition-all hover:text-primary'
          href={ROUTES.favorites}
        >
          <span>Избранное</span>
          <Icon name='heart' size={20} />
        </Link>

        <div className='my-1 h-px w-full bg-gradient-to-r from-[#3f414b00] via-[#3F414B] to-[#3f414b00]' />

        <button
          className='flex items-center space-x-3 font-medium transition-all hover:text-primary'
          onClick={logoutFn}
        >
          <span>Выйти</span>
          <Icon name='logout' size={20} />
        </button>
      </div>
    </div>
  );
};
