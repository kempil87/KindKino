import { RegisterOptions } from "react-hook-form";

enum Rules {
  auth = 'auth',
}

enum RulesFields {
  email = 'email',
  password = 'password',
}

export const RULES: Record<Rules, Record<RulesFields, RegisterOptions>> = {
  auth: {
    email: {
      required: "Необходимо заполнить Почта",
    },
    password: {
      required: "Необходимо заполнить Пароль",
    },
  },
};
