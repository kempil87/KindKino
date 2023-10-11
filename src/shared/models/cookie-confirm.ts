import {createEvent, createStore} from 'effector';

export const hideConfirm = createEvent();
export const $cookieConfirm = createStore<boolean>(true)
  .on(hideConfirm ,() => false);
