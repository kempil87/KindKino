
import {useEffect} from 'react';

import cc from 'classcat';
import {useUnit} from 'effector-react/scope';
import Cookies from 'js-cookie';

import {$cookieConfirm, hideConfirm} from '~/shared/models/cookie-confirm';

import {Button} from '~/components/button/button';

export const CookieConfirm = () => {
  const {$cookieConfirmModel,hideConfirmFn} = useUnit({
    $cookieConfirmModel:$cookieConfirm,
    hideConfirmFn:hideConfirm,
  });

  const agreeCookie = () => {
    hideConfirmFn();

    Cookies.set('agreeCookie','true');
  };

  useEffect(() =>{
    const cookie = Cookies.get('agreeCookie');

    if (cookie) {
      hideConfirmFn();
    }
  },[hideConfirmFn]);

  return (
    <div
      className={cc(['fixed px-5 w-80 transition-all py-4 rounded-md text-xl font-medium bottom-10 border-primary border-2 z-[999] shadow shadow-primary bg-dark right-10 ',
        {'translate-y-[500%]': !$cookieConfirmModel}
      ])}
    >
      <span>Мы используем cookie для работы сайта 🍪</span>
      <p className='text-sm text-grey my-2'>Оставаясь на сайте, Вы соглашаетесь с политикой файлов cookie.</p>

      <Button className='w-full' view='light' onClick={agreeCookie}>Принять</Button>
    </div>
  );
};
