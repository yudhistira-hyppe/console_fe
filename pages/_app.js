import React from 'react';
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

const MainApp = (props) => {
  const { Component, pageProps } = props;

  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/firebase-messaging-sw.js');
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>Hyppe-Console</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <AuthProvider>
        <AppContextProvider>
          <AppWrapper>
            <Component {...pageProps} />
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
