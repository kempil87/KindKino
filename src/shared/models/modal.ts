import { createEvent, createStore } from 'effector';

export type ModalName = 'auth' | 'confirm' | 'preference';

export const showModal = createEvent<ModalName>();
export const hideModal = createEvent();
export const $modal = createStore<ModalName | null>(null)
  .on(showModal, (_, name) => name)
  .reset(hideModal);
