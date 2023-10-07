import {useEffect} from 'react';

import {useUnit} from 'effector-react/scope';
import Cookies from 'js-cookie';

import {$auth, login} from '~/shared/models/auth';
import {ProfileProps, updateProfile} from '~/shared/models/profile';

export const useAuthorized = () => {
  const {authTokeModel,loginFn, updateProfileFn} = useUnit({
    authTokeModel:$auth,
    loginFn: login,
    updateProfileFn: updateProfile
  });

  useEffect(() => {
    const cookies = Cookies.get();

    if (cookies.authToken) {
      loginFn(cookies.authToken);
      updateProfileFn(JSON.parse(cookies.profile) as unknown as ProfileProps);
    }
  },[loginFn, updateProfileFn]);

  return !!authTokeModel.authToken;
};
