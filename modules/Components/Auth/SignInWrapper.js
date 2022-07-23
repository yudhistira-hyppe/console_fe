import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useAuth } from 'authentication';
import { v4 as uuidv4 } from 'uuid';
import AuthWrapper from './AuthWrapper';
import SignIn from './SignIn';
import SignInWithEmail from './SignInWithEmail';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';
import { firebaseCloudMessaging } from 'helpers/firebaseHelper';
import { NotificationLoader } from '@jumbo/components/ContentLoader';

const SignInWrapper = ({ variant = 'default', wrapperVariant = 'default' }) => {
  const { isLoading, error, getResultLoginWithGoogle, userLoginWithSocmed } = useAuth();
  const [isLoginWithEmail, setIsLoginWithEmail] = useState(false);
  const [location, setLocation] = useState();
  const [deviceId, setDeviceId] = useState();
  const [isPageLoading, setIsPageLoading] = useState(true);

  useEffect(async () => {
    getCurrentUserLocation();
    await generateFCMToken();
  }, []);

  useEffect(async () => {
    if (location && deviceId) {
      const result = await getResultLoginWithGoogle();
      if (result) {
        userLoginWithSocmed({
          email: result.user.email,
          socmedSource: 'GMAIL',
          deviceId,
          langIso: 'en',
          devicetype: 'WEB',
        });
        return;
      }
      setIsPageLoading(false);
    }
  }, [location, deviceId]);

  const generateFCMToken = async () => {
    await Notification.requestPermission()
      .then(async () => {
        await firebaseCloudMessaging
          .getFCMToken()
          .then((token) => {
            setDeviceId(token);
          })
          .catch(() => {
            setDeviceId(uuidv4());
          });
      })
      .catch(() => {
        setDeviceId(uuidv4());
      });
  };

  const getCurrentUserLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({ latitude: position.coords.latitude, longitude: position.coords.longitude });
      },
      () => {
        setLocation({ latitude: '0', longitude: '0' });
      },
    );
  };

  const onHandleClickSignInWithEmail = () => {
    setIsLoginWithEmail(true);
  };

  const onHandleClickBackToLogin = () => {
    setIsLoginWithEmail(false);
  };

  return (
    <>
      <AuthWrapper variant={wrapperVariant}>
        {isLoginWithEmail ? (
          <SignInWithEmail
            variant={variant}
            location={location}
            deviceId={deviceId}
            onHandleClickBackToLogin={onHandleClickBackToLogin}
          />
        ) : (
          <SignIn variant={variant} onHandleClickSignInWithEmail={onHandleClickSignInWithEmail} />
        )}
        {isPageLoading && <PageLoader />}
        <NotificationLoader loading={isLoading} error={error} />
      </AuthWrapper>
    </>
  );
};

SignInWrapper.propTypes = {
  variant: PropTypes.string,
  wrapperVariant: PropTypes.string,
};

SignInWrapper.defaultProps = {
  variant: 'default',
  wrapperVariant: 'default',
};

export default SignInWrapper;
