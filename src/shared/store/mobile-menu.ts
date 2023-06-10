import { createEvent, createStore } from 'effector';

export const toggleSearch = createEvent();

export const $search = createStore(false).on(toggleSearch, (state) => !state);
