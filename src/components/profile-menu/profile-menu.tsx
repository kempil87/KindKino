import Link from 'next/link';

import cc from 'classcat';
import {useUnit} from 'effector-react/scope';

import {ROUTES} from '~/shared/constants/routes-links';
import {logout} from '~/shared/models/auth';
import {$profile} from '~/shared/models/profile';

import styles from '../../styles/profile-menu.module.css';

import {Icon} from '~/components/icon/icon';

export const ProfileMenu = () => {
  const { $profileModel,logoutFn} = useUnit({
    $profileModel: $profile,
    logoutFn:logout,
  });

  if (!$profileModel) return null;

  return (
    <div className='group relative'>
      <div className={styles.text}>
        {$profileModel.email}
      </div>

      <div className='absolute flex translate-y-4 min-w-fit group-hover:translate-y-0 flex-col space-y-2.5 top-full mt-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all left-0 right-0 bg-dark rounded p-3'>
        <div className={cc([styles.text,'text-sm text-center font-medium'])}>
           PREMIUM
        </div>

        <div className="my-1 h-px w-full bg-gradient-to-r from-[#3f414b00] via-[#3F414B] to-[#3f414b00]" />

        <Link className='space-x-3 font-medium flex items-center hover:text-primary transition-all' href={ROUTES.favorites}>
          <span>
            Избранное
          </span>
          <Icon name='heart' size={20} />
        </Link>

        <div className="my-1 h-px w-full bg-gradient-to-r from-[#3f414b00] via-[#3F414B] to-[#3f414b00]" />

        <button className='space-x-3 font-medium flex items-center hover:text-primary transition-all' onClick={logoutFn}>
          <span>
            Выйти
          </span>
          <Icon name='logout' size={20} />
        </button>
      </div>
    </div>
  );
};
