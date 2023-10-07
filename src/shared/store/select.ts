import { createEvent, createStore } from 'effector';

import { ValueProps } from '~/components/select/select';

export const updateSelect = createEvent<ValueProps>();
export const resetSelect = createEvent();

export const $selectStore = createStore<ValueProps>({name:'',value: ''})
  .on(updateSelect, (state, { name, value }) => ({
    ...state,
    [name]: value,
  }))
  .reset(resetSelect);
