import {RegisterOptions} from 'react-hook-form';

type RulesFields = 'password' | 'email' | 'search'
export const RULES: Record<RulesFields, RegisterOptions> = {
  email: {
    pattern: {
      message: 'Введите корректную почту',
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    required: 'Необходимо заполнить «Почта».',
  },
  password: {
    minLength: {
      message: 'Пароль должен содержать минимум 8 символов',
      value: 8,
    },
    pattern: {
      message: 'Пароль не должен содержать пробелы',
      value: /^\S+$/,
    },
    required: {
      message: 'Необходимо заполнить «Пароль».',
      value: true,
    },
  },
  search: {
    minLength: {message:'Введите 3 и более символа',value:3}
  }
};
