import toast from 'react-hot-toast';

import { ALERT_TYPES } from '../constants/alert-types';

import style from '../../styles/alert.module.css';

import { Icon, IconName } from '~/components/icon/icon';
interface Props {
  message?: string;
  type?: 'error' | 'success' | 'warning' | 'info';
}

export const showAlert = ({ message = '', type = 'success' }: Props) => {
  const { icon, iconColor } = ALERT_TYPES[type];

  toast.custom((t) => (
    <div
      className={`${
        t.visible ? style.animateEnter : style.animateLeave
      } flex w-full max-w-xs rounded-xl border-2 border-primary !bg-dark px-3 py-3 shadow-lg`}
    >
      <div className="flex flex-1">
        <div
          className="primary-gradient flex h-10 w-10 items-center justify-center rounded-full shadow-lg"
          style={{
            boxShadow: `0 10px 15px -3px ${iconColor}80, 0 4px 6px -4px ${iconColor}80`,
          }}
        >
          <Icon
            className="h-6 w-6 text-white"
            name={icon as IconName}
            size={15}
          />
        </div>

        <div className="flex-1 px-4">
          <p className="text-sm text-white/70">{message || ''}</p>
        </div>
      </div>
    </div>
  ));
};
