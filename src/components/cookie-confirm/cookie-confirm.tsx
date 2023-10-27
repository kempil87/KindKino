import { useEffect } from 'react';

import cc from 'classcat';
import { useUnit } from 'effector-react/scope';
import Cookies from 'js-cookie';

import { $cookieConfirm, hideConfirm } from '~/shared/models/cookie-confirm';

import { Button } from '~/components/button/button';

export const CookieConfirm = () => {
  const { $cookieConfirmModel, hideConfirmFn } = useUnit({
    $cookieConfirmModel: $cookieConfirm,
    hideConfirmFn: hideConfirm,
  });

  const agreeCookie = () => {
    hideConfirmFn();

    Cookies.set('agreeCookie', 'true');
  };

  useEffect(() => {
    const cookie = Cookies.get('agreeCookie');

    if (cookie) {
      hideConfirmFn();
    }
  }, [hideConfirmFn]);

  return (
    <div
      className={cc([
        'fixed bottom-10 right-10 z-[999] w-80 rounded-md border-2 border-primary bg-dark px-5 py-4 text-xl font-medium shadow shadow-primary transition-all ',
        { 'translate-y-[500%]': !$cookieConfirmModel },
      ])}
    >
      <span>Мы используем cookie для работы сайта 🍪</span>
      <p className='my-2 text-sm text-grey'>
        Оставаясь на сайте, Вы соглашаетесь с политикой файлов cookie.
      </p>

      <Button className='w-full' view='light' onClick={agreeCookie}>
        Принять
      </Button>
    </div>
  );
};
