import { useState } from 'react';
import { SOCKET_IO_URL } from './config';
import { io } from 'socket.io-client';
import { premiumSubscribe, premiumConfirm } from './AuthApi';
import { authApi } from 'api/user';

export const useProvideAuth = () => {
  const { useLoginMutation } = authApi;
  const [login] = useLoginMutation();
  const [authUser, setAuthUser] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const clientWs = io(SOCKET_IO_URL, {
    transports: ['websocket'],
    reconnect: true,
    autoConnect: false,
    reconnectionDelay: 10000,
    withCredentials: true,
    rejectUnauthorized: true,
  });

  const fetchClientWs = (user) => {
    console.log(clientWs);
    clientWs.auth = { 'x-auth-token': user.token, 'x-auth-user': user.email };

    clientWs.on('connect', function (socket) {
      console.log(socket);
      console.log('Connected!');
    });

    clientWs.on('disconnect', function (socket) {
      console.log('disconnect!');
    });

    clientWs.on('event_notif', function (data) {
      console.log(data);
    });

    clientWs.connect();
  };

  // Start rewritten code
  const fetchStart = () => {
    setLoading(true);
    setError('');
  };

  const fetchSuccess = () => {
    setLoading(false);
    setError('');
  };

  const fetchError = (error) => {
    setLoading(false);
    setError(error);
  };

  const loadAuth = () => {
    const appsAuth = JSON.parse(localStorage.getItem('user'));
    return appsAuth;
  };

  const saveAuth = (data) => {
    localStorage.setItem('user', JSON.stringify(data));
    setAuthUser(data);
  };

  const removeAuth = () => {
    localStorage.removeItem('user');
    setAuthUser(null);
  };

  const userLogin = (user) => {
    fetchStart();
    login(user)
      .unwrap()
      .then((result) => {
        fetchSuccess();
        saveAuth(result.data);
      })
      .catch((error) => {
        fetchError(error.message);
        removeAuth();
      });
  };
  // End rewritten code

  const userSignup = (user, callbackFun) => {
    try {
      fetchStart();
      setTimeout(() => {
        fetchSuccess();
        //localStorage.setItem('user', JSON.stringify({ ...user, name: 'Admin' }));
        //setAuthUser({ ...user, name: 'Admin' });
        if (callbackFun) callbackFun();
      }, 300);
    } catch (error) {
      fetchError(error.message);
    }
  };

  const userPremiumSubscribe = (user, callbackFun) => {
    fetchStart();
    premiumSubscribe(user)
      .then(({ data }) => {
        if (data && data.response_code == 202) {
          fetchSuccess();
          if (callbackFun) callbackFun(data.data);
        } else {
          fetchError(data.error);
        }
      })
      .catch(function (error) {
        removeAuth();
        fetchError(error.message);
      });
  };

  const userPremiumConfirm = (user, callbackFun) => {
    fetchStart();
    premiumConfirm(user)
      .then(({ data }) => {
        if (data && data.response_code == 202) {
          saveAuth(data.data);
          fetchClientWs(data.data);
          fetchSuccess();
          if (callbackFun) callbackFun();
        } else {
          fetchError(data.error);
        }
      })
      .catch(function (error) {
        console.log(error);
        fetchError(error.message);
      });
  };

  const sendPasswordResetEmail = (email, callbackFun) => {
    try {
      fetchStart();
      setTimeout(() => {
        fetchSuccess();
        if (callbackFun) callbackFun();
      }, 300);
    } catch (error) {
      fetchError(error.message);
    }
  };

  const confirmPasswordReset = (code, password, callbackFun) => {
    try {
      fetchStart();
      setTimeout(() => {
        fetchSuccess();
        if (callbackFun) callbackFun();
      }, 300);
    } catch (error) {
      fetchError(error.message);
    }
  };

  const renderSocialMediaLogin = () => null;

  const userSignOut = (callbackFun) => {
    try {
      fetchStart();
      setTimeout(() => {
        fetchSuccess();
        removeAuth();
        if (callbackFun) callbackFun();
      }, 300);
    } catch (error) {
      fetchError(error.message);
    }
  };

  const getAuthUser = () => {
    try {
      fetchStart();
      setAuthUser(loadAuth());
      fetchSuccess();
    } catch (error) {
      fetchError(error.message);
    }
  };

  return {
    isLoading,
    authUser,
    error,
    setError,
    setAuthUser,
    getAuthUser,
    userLogin,
    userSignup,
    userSignOut,
    userPremiumSubscribe,
    userPremiumConfirm,
    renderSocialMediaLogin,
    sendPasswordResetEmail,
    confirmPasswordReset,
  };
};
