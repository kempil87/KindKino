import { createApi, createStore } from 'effector';

export type ModalName = 'auth';
export const $modal = createStore<ModalName | null>(null);

export const modalApi = createApi($modal, {
  hide: () => null,
  show: (_, payload: ModalName) => payload,
});
