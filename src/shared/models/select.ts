import { createEvent, createStore } from 'effector';

export const updateSelect = createEvent<Record<string, string>>();
export const resetSelect = createEvent();

export const $selectStore = createStore<Record<string, string> | null>(null)
  .on(updateSelect, (state, { name, value }) => ({
    ...state,
    [name]: value,
  }))
  .reset(resetSelect);
