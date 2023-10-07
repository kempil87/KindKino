import { createEvent, createStore } from 'effector';

export const toggleMenu = createEvent();
export const hideMenu = createEvent();
export const showMenu = createEvent();

export const $menu = createStore(false)
  .on(toggleMenu, (state) => !state)
  .on(showMenu, () => true)
  .reset(hideMenu);
