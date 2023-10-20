import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { wrapper } from 'redux/store';
import AppWrapper from '@jumbo/components/AppWrapper';
import 'typeface-lato';
import 'react-perfect-scrollbar/dist/css/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import 'react-notifications/lib/notifications.css';
import 'prismjs/themes/prism-okaidia.css';
import 'primeflex/primeflex.css';

import AppContextProvider from '../@jumbo/components/contextProvider/AppContextProvider';
import { AuthProvider } from '../authentication';
import { firebaseApp } from 'helpers/firebaseHelper';
import { getMessaging, onMessage } from 'firebase/messaging';
import { useDispatch, useSelector } from 'react-redux';
import { setNotification } from 'redux/actions/Profiles';
import { Stack } from '@mui/material';
import { Typography } from '@material-ui/core';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { toast, Toaster } from 'react-hot-toast';
import { Info } from '@material-ui/icons';
import { clearParams } from 'redux/slice/filterParams';

const MainApp = (props) => {
  const { Component, pageProps } = props;
  const [blur, setBlur] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const dataParams = useSelector((state) => state.filterParams.value);

  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/firebase-messaging-sw.js')
        .then(function (registration) {
          console.log('Registration successful, scope is:', registration.scope);
        })
        .catch(function (err) {
          console.log('Service worker registration failed, error:', err);
        });
    }
  }, []);

  useEffect(() => {
    const isSupported = () => 'Notification' in window && 'serviceWorker' in navigator && 'PushManager' in window;

    if (isSupported()) {
      if (Notification.permission === 'granted') {
        const message = getMessaging(firebaseApp);
        onMessage(message, (payload) => dispatch(setNotification(payload)));
      }
    } else {
      toast('Browser ini tidak memiliki akses notifikasi', {
        id: 'non-support',
        icon: <Info />,
      });
    }
  });

  useEffect(async () => {
    fetch('https://static.ads-twitter.com/uwt.js', { method: 'head', mode: 'no-cors' })
      .then(() => {
        setBlur(false);
      })
      .catch(() => {
        setBlur(true);
      });
  }, []);

  useEffect(() => {
    if (!router.pathname?.includes(dataParams?.pathname)) {
      dispatch(clearParams({}));
    }
  }, [router]);

  return (
    <React.Fragment>
      <Head>
        <title>Hyppe-Console</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <AuthProvider>
        <AppContextProvider>
          <AppWrapper>
            <Toaster />
            {blur && Cookies.get('user') ? (
              <Stack
                height="100vh"
                alignItems="center"
                justifyContent="center"
                spacing={2}
                position="absolute"
                top={router.pathname.includes('on-boarding') ? 0 : -120}
                left={0}
                zIndex={100}
                width="100%"
                style={{ background: '#ffffffa6' }}>
                <img src="/images/non-active.png" alt="Visual Non Active" />
                <Typography style={{ fontWeight: 'bold', fontSize: 20, width: '50%', textAlign: 'center' }}>
                  Matikan Ads Block Terlebih Dahulu Untuk Melanjutkan Explorasi Dashboard!
                </Typography>
              </Stack>
            ) : (
              <Component {...pageProps} />
            )}
          </AppWrapper>
        </AppContextProvider>
      </AuthProvider>
    </React.Fragment>
  );
};

MainApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};

export default wrapper.withRedux(MainApp);
