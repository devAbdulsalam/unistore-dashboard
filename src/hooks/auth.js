import { LocalStorage } from './LocalStorage';
export const getUserData = () => {
  return LocalStorage.get('user');
};

export const setUserData = (user) => {
  LocalStorage.set('user', user);
};
export const clearUserData = () => {
  localStorage.remove('user');
};

export const getRefreshToken = () => {
  return LocalStorage.get('user')?.refreshToken;
};

export const getAccessToken = () => {
  return (
    LocalStorage.get('user')?.accessToken || LocalStorage.get('user')?.token
  );
};

export const updateAccessToken = (token, refreshToken) => {
  const user = LocalStorage.get('user');
  user.refreshToken = refreshToken;
  user.accessToken = token;
  user.token = token;
  LocalStorage.set('user', user);
};

export const isAuthenticated = () => {
  const accessToken = getAccessToken();
  if (!accessToken) return false;
  return true;
};
