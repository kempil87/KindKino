import React from "react";

import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from 'react-hook-form';

import { Button } from "~/components/button/button";
import { Input } from '~/components/input/input';
import { Modal } from '~/components/modal/modal';

import { RULES } from '~/shared/constants/rules';

interface FormProps {
  email: string;
  password: string;
}
export const AuthModal = () => {
  const methods = useForm();

  const auth = (data: FormProps) => {
    console.log(data);
  };

  const onClose = () => {
    methods.reset();
  };

  return (
    <FormProvider {...methods}>
      <Modal name="auth" title="Авторизация" onClose={onClose}>
        <div className="w-[600px] space-y-3">
          <Input<FormProps>
            label="Почта"
            name="email"
            placeholder="Почта"
            rules={RULES.auth.email}
          />

          <Input<FormProps>
            label="Пароль"
            name="password"
            placeholder="Пароль"
            rules={RULES.auth.password}
          />

          <Button
            className="!mt-6 w-full"
            onClick={methods.handleSubmit(auth as SubmitHandler<FieldValues>)}
          >
            Войти
          </Button>
        </div>
      </Modal>
    </FormProvider>
  );
};
