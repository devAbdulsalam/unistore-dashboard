/* eslint-disable react/prop-types */
import { createContext, useState, useEffect, useMemo } from 'react';
import { LocalStorage } from '../hooks/LocalStorage';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  getAccessToken,
  getRefreshToken,
  clearUserData,
  updateAccessToken,
} from '../hooks/auth';
const apiUrl = import.meta.env.VITE_API_URL;
const ACCESS_TOKEN_EXPIRES_TIME = 1000 * 60 * 60 * 24; // 5 min

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const localAccessToken = getAccessToken() || null;
  const refreshToken = getRefreshToken() || null;
  const navigate = useNavigate();
  const [isFirstMounted, setIsFirstMounted] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [notification, setNotification] = useState([]);

  const handleLogout = async () => {
    clearUserData();
    // Also remove user's refresh token from server
    await axios.delete(`${apiUrl}/users/logout`, { refreshToken });
    navigate('/login');
  };

  async function updateRefreshtoken() {
    const response = await axios.post(`${apiUrl}/users/refresh-token`, {
      refreshToken,
    });
    if (response.status === 200) {
      const accessToken = response.data.token || response.data.accessToken;
      updateAccessToken(accessToken, response.data.refreshToken);
      const user = await LocalStorage.get('user');
      setUser(user);
    } else {
      // const user = await LocalStorage.get('user');
      // setUser(user);
      console.log(response?.error);
      clearUserData();
      navigate('/login');
      window.location.reload();
    }
    if (isFirstMounted) {
      setIsFirstMounted(false);
    }
  }
  useEffect(() => {
    if (refreshToken) {
      // Check on the first render
      if (isFirstMounted) {
        updateRefreshtoken();
      }

      // Keep checking after a certain time
      const intervalId = setInterval(() => {
        updateRefreshtoken();
      }, ACCESS_TOKEN_EXPIRES_TIME);
      return () => clearInterval(intervalId);
    }
    console.log('no refresh token');
    return undefined;
  }, [localAccessToken]);

  const myToken = useMemo(
    () => ({
      token: localAccessToken,
    }),
    [localAccessToken],
  );
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        myToken,
        selectedProduct,
        setSelectedProduct,
        notification,
        setNotification,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
const AuthContext = createContext();
export default AuthContext;
