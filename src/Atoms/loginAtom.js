import { atom } from 'recoil';

export const isLoginState = atom({
  key: 'isLoginState',
  default: false,
});

export const userDataState = atom({
  key: 'userDataState',
  default: null,
});