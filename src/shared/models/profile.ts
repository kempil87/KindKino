import { createEffect, createEvent, createStore, sample } from 'effector';
import Cookies from 'js-cookie';

export interface ProfileProps {
  email: string;
  id: string;
}

export type ProfileStore = ProfileProps | null;

export const updateProfile = createEvent<ProfileStore>();

export const resetProfile = createEvent();

export const $profile = createStore<ProfileStore>(null)
  .on(updateProfile, (_, payload) => payload)
  .reset(resetProfile);

const setProfileCookieFx = createEffect((payload: ProfileStore) => {
  Cookies.set('profile', JSON.stringify(payload));
});

const removeProfileCookieFx = createEffect(() => {
  Cookies.remove('profile');
});

sample({
  source: resetProfile,
  target: [removeProfileCookieFx],
});

sample({
  source: updateProfile,
  target: setProfileCookieFx,
});
