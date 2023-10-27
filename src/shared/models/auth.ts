import { createEffect, createEvent, createStore, sample } from 'effector';
import Cookies from 'js-cookie';

import { resetProfile } from '~/shared/models/profile';

export interface AuthStore {
  authToken: string | null;
}

export const login = createEvent<string>();
export const logout = createEvent();

export const $auth = createStore<AuthStore>({
  authToken: null,
})
  .on(login, (state, token) => ({ ...state, authToken: token }))
  .reset(logout);

const setTokenCookieFx = createEffect((token: string) => {
  Cookies.set('authToken', token);
});

const removeTokenCookieFx = createEffect(() => {
  Cookies.remove('authToken');
});

sample({
  source: logout,
  target: [removeTokenCookieFx, resetProfile],
});

sample({
  source: login,
  target: setTokenCookieFx,
});
