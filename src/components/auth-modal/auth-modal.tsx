import { useId, useState } from 'react';

import cc from 'classcat';
import { useUnit } from 'effector-react/scope';
import { FormProvider, useForm } from 'react-hook-form';

import { RULES } from '~/shared/constants/rules';
import { login } from '~/shared/models/auth';
import { hideModal } from '~/shared/models/modal';
import { updateProfile } from '~/shared/models/profile';
import { showAlert } from '~/shared/utils/show-alert';

import { ResetPasswordContainer } from '~/components/auth-modal/elems/reset-password-container';
import { Button } from '~/components/button/button';
import { Icon } from '~/components/icon/icon';
import { Input } from '~/components/input/input';
import { Modal } from '~/components/modal/modal';

export interface FormProps {
  code: string;
  email: string;
  password: string;
  password_repeat: string;
}

export const AuthModal = () => {
  const id = useId();
  const methods = useForm<FormProps>();
  const [authType, setAuthType] = useState(true);
  const [resetPasswordVisible, setResetPasswordVisible] = useState(false);

  const { loginFn, updateProfileFn, hideModalFn } = useUnit({
    hideModalFn: hideModal,
    loginFn: login,
    updateProfileFn: updateProfile,
  });

  const auth = ({ email }: FormProps) => {
    loginFn(String(Math.floor(Date.now() / 1000)));
    updateProfileFn({ email, id });
    showAlert({ message: 'Успешно авторизованы!' });

    onClose();
  };

  const registration = ({ password_repeat, password }: FormProps) => {
    if (password !== password_repeat) {
      methods.setError('password_repeat', { message: 'Пароли не совпадают' });

      return;
    }

    showAlert({ message: 'Успешно зарегистрированы!' });

    methods.reset();
    setAuthType(true);
  };

  const changeType = (type: boolean) => {
    setAuthType(type);
    methods.clearErrors();
  };

  const onClose = () => {
    methods.reset();
    hideModalFn();
  };

  const returnAuthFields = () => {
    setAuthType(true);
    setResetPasswordVisible(false);
    methods.reset();
  };

  return (
    <FormProvider {...methods}>
      <Modal name='auth' onClose={onClose}>
        {resetPasswordVisible ? (
          <div className='flex items-center space-x-4 text-2xl font-normal transition-all'>
            <button
              className='group'
              onClick={() => setResetPasswordVisible(false)}
            >
              <Icon
                className='animated group-hover:-translate-x-3'
                name='arrow_long'
                size={21}
              />
            </button>

            <span>Восстановление пароля</span>
          </div>
        ) : (
          <div className='mb-4 flex h-8 items-end space-x-4'>
            <button
              className={cc([
                'text-2xl font-normal transition-all',
                { 'text-lg text-white/70': !authType },
              ])}
              onClick={() => changeType(true)}
            >
              Авторизация
            </button>

            <button
              className={cc([
                'text-2xl font-normal transition-all',
                { 'text-lg text-white/70': authType },
              ])}
              onClick={() => changeType(false)}
            >
              Регистрация
            </button>
          </div>
        )}

        {!resetPasswordVisible &&
          (authType ? (
            <form autoComplete='off' className='w-[600px] space-y-3'>
              <Input<FormProps>
                label='Почта'
                name='email'
                placeholder='Почта'
                rules={RULES.email}
              />

              <Input<FormProps>
                isPassword
                label='Пароль'
                name='password'
                placeholder='Пароль'
                rules={RULES.password}
              />

              <button
                className='text-sm text-white/70 transition-all hover:text-white'
                onClick={() => setResetPasswordVisible(true)}
              >
                Не помню пароль
              </button>

              <Button
                className='!mt-6 w-full'
                onClick={methods.handleSubmit(auth)}
              >
                Войти
              </Button>
            </form>
          ) : (
            <form autoComplete='off' className='w-[600px] space-y-3'>
              <Input<FormProps>
                label='Почта'
                name='email'
                placeholder='Почта'
                rules={RULES.email}
              />

              <Input<FormProps>
                label='Придумайте пароль'
                name='password'
                placeholder='Пароль'
                rules={RULES.password}
                // type='password'
              />

              <Input<FormProps>
                label='Повторите пароль'
                name='password_repeat'
                placeholder='Пароль еще раз'
                rules={RULES.password_repeat}
                // type='password'
              />

              <Button
                className='!mt-6 w-full'
                onClick={methods.handleSubmit(registration)}
              >
                Зарегистрироваться
              </Button>
            </form>
          ))}

        {resetPasswordVisible && (
          <ResetPasswordContainer returnAuthFields={returnAuthFields} />
        )}
      </Modal>
    </FormProvider>
  );
};
