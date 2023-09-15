import { useState } from 'react';
import { premiumSubscribe, premiumConfirm } from './AuthApi';
import { authApi } from 'api/user';
import { auth as firebaseAuth } from 'helpers/firebaseHelper';
import { getRedirectResult, GoogleAuthProvider, signInWithRedirect } from 'firebase/auth';
import { createCookies, deleteAllCookies, getAllCookies } from 'helpers/cookiesHelper';
import { useGetUserAccessMutation } from 'api/user/auth';
import Cookies from 'js-cookie';
import router from 'next/router';
import { toast } from 'react-hot-toast';

export const useProvideAuth = () => {
  // Start rewritten code
  const { useLoginMutation, useLoginWithSocmedMutation, useLogoutMutation } = authApi;
  const [login] = useLoginMutation();
  const [loginWithSocmed] = useLoginWithSocmedMutation();
  const [logout] = useLogoutMutation();
  const [authUser, setAuthUser] = useState();
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [userAccess] = useGetUserAccessMutation();

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

  const saveAuth = () => {
    setAuthUser(getAllCookies());
  };

  const setUserAccess = (id) => {
    userAccess(id).then((res) => {
      localStorage.setItem('access', JSON.stringify(res?.data?.data));
    });
  };

  const removeAuth = () => {
    deleteAllCookies();
    setAuthUser(null);
    localStorage.removeItem('access');
  };

  const getAuthUser = () => {
    try {
      fetchStart();
      setAuthUser(getAllCookies());
      fetchSuccess();
    } catch (error) {
      fetchError(error.message);
    }
  };

  const consoleLoginWithEmail = (user, isRememberUser) => {
    fetchStart();
    login(user).then((result) => {
      if (result?.data) {
        if (result?.data?.data?.roles?.includes('ROLE_ADMIN')) {
          onHandleSuccessLogin(user, result?.data, isRememberUser);
          return toast.success('Login Berhasil', { id: 'signin' });
        } else {
          fetchError('Akun yang digunakan tidak memiliki akses!');
          return toast.error('Akun yang digunakan tidak memiliki akses!', { id: 'signin' });
        }
      } else {
        fetchError(result?.error?.data?.messages?.info?.join(' '));
        return toast.error(result?.error?.data?.messages?.info?.join(' '), {
          id: 'signin',
        });
      }
    });
  };

  const getResultLoginWithGoogle = async () => {
    let resultLoginWithGoogle;
    await getRedirectResult(firebaseAuth)
      .then((result) => {
        if (result) {
          resultLoginWithGoogle = result;
        }
      })
      .catch(() => fetchError('Terjadi kesalahan pada sistem, silahkan coba lagi.'));
    return resultLoginWithGoogle;
  };

  const userLoginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    fetchStart();
    await signInWithRedirect(firebaseAuth, provider).catch(() =>
      fetchError('Terjadi kesalahan pada sistem, silahkan coba lagi.'),
    );
  };

  const userLoginWithSocmed = (user) => {
    fetchStart();
    loginWithSocmed(user)
      .unwrap()
      .then((result) => {
        onHandleSuccessLogin(user, result, true);
      })
      .catch((error) => {
        removeAuth();
        fetchError(error?.data?.messages?.info?.join(' '));
      });
  };

  const userLoginWithEmail = (user, isRememberUser) => {
    fetchStart();
    login(user)
      .unwrap()
      .then((result) => {
        onHandleSuccessLogin(user, result, isRememberUser);
      })
      .catch((error) => {
        removeAuth();
        fetchError(error?.data?.messages?.info?.join(' '));
      });
  };

  const userSignOut = (user) => {
    fetchStart();
    logout(user)
      .unwrap()
      .then(() => {
        removeAuth();
        fetchSuccess();
        return toast.success('Logout Berhasil', { id: 'signout' });
      })
      .catch((error) => {
        fetchError(error?.data?.messages?.info?.join(' '));
        return toast.error(error?.data?.messages?.info?.join(' '), { id: 'signout' });
      });
  };

  const onHandleSuccessLogin = (user, { data }, isRememberUser) => {
    const expirationHour = isRememberUser ? 144 : 24;
    const keyAndValueCookies = {
      token: { value: data.token, expirationHour: expirationHour },
      refreshToken: { value: data.refreshToken, expirationHour: expirationHour },
      user: {
        value: {
          id: data.iduser,
          email: data.email,
          fullName: data.fullName,
          roles: data.roles,
          avatar: data.avatar,
          deviceId: user.deviceId,
        },
        expirationHour: expirationHour,
      },
    };
    createCookies(keyAndValueCookies);
    fetchSuccess();
    saveAuth();
    setUserAccess(data?.iduser);
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
          // saveAuth(data.data);
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

  return {
    isLoading,
    authUser,
    error,
    setError,
    setAuthUser,
    getAuthUser,
    consoleLoginWithEmail,
    getResultLoginWithGoogle,
    userLoginWithGoogle,
    userLoginWithSocmed,
    userLoginWithEmail,
    userSignup,
    userSignOut,
    userPremiumSubscribe,
    userPremiumConfirm,
    renderSocialMediaLogin,
    sendPasswordResetEmail,
    confirmPasswordReset,
  };
};
