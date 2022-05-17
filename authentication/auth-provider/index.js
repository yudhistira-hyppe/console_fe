//MODIFIED HYPPE
import { useEffect, useState } from 'react';
import { SOCKET_IO_URL } from './config';
import { io } from 'socket.io-client';
import { instance, login, premiumSubscribe, premiumConfirm } from './AuthApi';

export const useProvideAuth = () => {
  const [loadingAuthUser, setLoadingAuthUser] = useState(true);
  const [authUser, setAuthUser] = useState(null);
  const [isLoading, setLoading] = useState(false);
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

  const callback = (message) => {
    // called when the client receives a STOMP message from the server
    message.ack();
    if (message.body) {
      alert('got message with body ' + message.body);
    } else {
      alert('got empty message');
    }
  };

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

  const loadAuth = (data) => {
    const appsAuth = JSON.parse(localStorage.getItem('user'));
    return appsAuth;
  };

  const saveAuth = (data) => {
    setAuthUser(data);
    instance.defaults.headers.common['x-auth-token'] = data.token;
    localStorage.setItem('user', JSON.stringify(data));
  };

  const removeAuth = () => {
    setAuthUser(false);
    localStorage.removeItem('user');
    instance.defaults.headers.common['x-auth-token'] = '';
  };

  const userLogin = (user, callbackFun) => {
    fetchStart();
    login(user)
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
        removeAuth();
        fetchError(error.message);
      });
  };

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
        console.log(error)
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
      setTimeout(() => {
        fetchSuccess();
        setAuthUser(loadAuth());
      }, 300);
    } catch (error) {
      fetchError(error.message);
    }
  };

  // Subscribe to user on mount
  // Because this sets state in the callback it will cause any ...
  // ... component that utilizes this hook to re-render with the ...
  // ... latest auth object.

  useEffect(() => {
    setTimeout(() => {
      fetchSuccess();

      setLoadingAuthUser(false);
    }, 300);
  }, []);

  // Return the user object and auth methods
  return {
    loadingAuthUser,
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
