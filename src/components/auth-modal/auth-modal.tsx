import React from 'react';

import {
  FormProvider,
  useForm,
} from 'react-hook-form';

import { RULES } from '~/shared/constants/rules';

import { Button } from '~/components/button/button';
import { Input } from '~/components/input/input';
import { Modal } from '~/components/modal/modal';

interface FormProps {
  email: string;
  password: string;
}
export const AuthModal = () => {
  const methods = useForm<FormProps>();

  const auth = (data: FormProps) => {
    console.log(data);
  };

  const onClose = () => {
    methods.reset();
  };

  return (
    <FormProvider {...methods}>
      <Modal name="auth" title="Авторизация" onClose={onClose}>
        <div className="space-y-3 w-[600px]">
          <Input<FormProps>
            label="Почта"
            name="email"
            placeholder="Почта"
            rules={RULES.email}
          />

          <Input<FormProps>
            label="Пароль"
            name="password"
            placeholder="Пароль"
            rules={RULES.password}
          />

          <Button
            className="!mt-6 w-full"
            onClick={methods.handleSubmit(auth)}
          >
            Войти
          </Button>
        </div>
      </Modal>
    </FormProvider>
  );
};
