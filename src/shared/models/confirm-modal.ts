import { createEvent, createStore } from 'effector';

export interface Confirm {
  onConfirm: () => void;
  subtitle: string;
  successButtonText: string;
  title: string;
}

export const showConfirm = createEvent<Confirm>();
export const $confirmModal = createStore<Confirm | null>(null).on(
  showConfirm,
  (_, payload) => payload,
);
