import {useState} from 'react';

import {useFormContext} from 'react-hook-form';

import {RULES} from '~/shared/constants/rules';
import {showAlert} from '~/shared/utils/show-alert';

import {FormProps} from '~/components/auth-modal/auth-modal';
import {Button} from '~/components/button/button';
import {Input} from '~/components/input/input';
import {OtpInput} from '~/components/otp-input/otp-input';

interface Props {
    returnAuthFields: () => void
}

export const ResetPasswordContainer = ({returnAuthFields}: Props) => {
  const {handleSubmit, getValues} = useFormContext();
  const [codeInputsVisible, setCodeInputsVisible] = useState(false);

  const getCode = () => {
    setCodeInputsVisible(true);
  };

  const sendCode = () => {
    returnAuthFields();
    showAlert({message: 'Пароль успешно восстановлен!'});
  };

  if (codeInputsVisible) {
    return (
      <form autoComplete='off' className="space-y-3 w-[600px]">
        <div className='text-sm text-white/70 my-6'>
              Отправили код вам на почту
          {getValues('email') && <span className='text-base text-white pl-1'>{getValues('email')}</span>} ,
              проверьте входящие письма.
        </div>
        <OtpInput<FormProps> formClassName='my-4' name='code' onReachEnd={sendCode}/>
      </form>
    );
  }

  return (
    <form autoComplete='off' className="space-y-3 w-[600px]">
      <Input<FormProps>
        label="Почта"
        name="email"
        placeholder="Почта"
        rules={RULES.email}
      />

      <Input<FormProps>
        label="Придумайте новый пароль"
        name="password"
        placeholder="Пароль"
        rules={RULES.password}
        // type='password'
      />

      <Input<FormProps>
        label="Повторите новый пароль"
        name="password_repeat"
        placeholder="Новый пароль еще раз"
        rules={RULES.password_repeat}
        // type='password'
      />

      <Button
        className="!mt-6 w-full"
        onClick={handleSubmit(getCode)}
      >
          Восстановить пароль
      </Button>
    </form>
  );
};
