import {useId} from 'react';

import {useUnit} from 'effector-react/scope';
import {
  FormProvider,
  useForm,
} from 'react-hook-form';

import {RULES} from '~/shared/constants/rules';
import {login} from '~/shared/models/auth';
import {hideModal} from '~/shared/models/modal';
import {updateProfile} from '~/shared/models/profile';
import {showAlert} from '~/shared/utils/show-alert';

import {Button} from '~/components/button/button';
import {Input} from '~/components/input/input';
import {Modal} from '~/components/modal/modal';

interface FormProps {
    email: string;
    password: string;
}

export const AuthModal = () => {
  const id = useId();
  const methods = useForm<FormProps>({
    defaultValues:{email:'testkindkino@mail.ru'}
  });
  const {loginFn, updateProfileFn,hideModalFn} = useUnit({
    hideModalFn: hideModal,
    loginFn: login,
    updateProfileFn: updateProfile
  });

  const auth = ({email}: FormProps) => {
    loginFn(String(Math.floor(Date.now() / 1000)));
    updateProfileFn({email, id});
    showAlert({message:'Успешно авторизованы!'});

    onClose();
  };

  const onClose = () => {
    methods.reset();
    hideModalFn();
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
