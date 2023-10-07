import { createEvent, createStore } from 'effector';

export const toggleSearch = createEvent();
export const hideSearch = createEvent();
export const showSearch = createEvent();

export const $search = createStore(false)
  .on(toggleSearch, (state) => !state)
  .on(showSearch, () => true)
  .reset(hideSearch);
