import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Box } from '@material-ui/core';
import { alpha, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import AuthWrapper from 'modules/Components/Auth/AuthWrapper';
import CmtImage from '@coremat/CmtImage';
import IntlMessages from '@jumbo/utils/IntlMessages';
import { NotificationLoader } from '@jumbo/components/ContentLoader';
import { useAuth } from 'authentication';
import Logo from '@jumbo/components/AppLayout/partials/Logo';
import { firebaseCloudMessaging } from 'helpers/firebaseHelper';
import { v4 as uuidv4 } from 'uuid';

const useStyles = makeStyles((theme) => ({
  authThumb: {
    backgroundColor: alpha(theme.palette.primary.main, 0.12),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '50%',
      order: 2,
    },
  },
  visualAuth: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 20,
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '100%',
      order: 2,
    },
  },
  authContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 30,
    width: '100%',
    height: 520,
    [theme.breakpoints.up('md')]: {
      width: (props) => (props.variant === 'default' ? '50%' : '100%'),
      order: 1,
    },
    [theme.breakpoints.up('xl')]: {
      padding: 50,
    },
  },
  titleRoot: {
    marginBottom: 14,
    color: theme.palette.text.primary,
  },
  textFieldRoot: {
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: alpha(theme.palette.common.dark, 0.12),
    },
  },
  formcontrolLabelRoot: {
    '& .MuiFormControlLabel-label': {
      [theme.breakpoints.down('xs')]: {
        fontSize: 12,
      },
    },
  },
}));

const SignIn = ({ variant = 'default', wrapperVariant = 'default' }) => {
  const classes = useStyles({ variant });
  const { isLoading, error, consoleLoginWithEmail } = useAuth();
  const [location, setLocation] = useState();
  const [deviceId, setDeviceId] = useState();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRememberMeChecked, setIsRememberMeChecked] = useState(false);
  const [isLoginDisabled, setIsLoginDisabled] = useState(false);

  useEffect(async () => {
    getCurrentUserLocation();
    await generateFCMToken();
  }, []);

  useEffect(() => {
    if (location && deviceId && email && password) {
      setIsLoginDisabled(false);
    } else {
      setIsLoginDisabled(true);
    }
  }, [location, deviceId, email, password]);

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

  const onSubmit = () => {
    consoleLoginWithEmail(
      {
        email,
        password,
        location,
        deviceId,
        devicetype: 'WEB',
      },
      isRememberMeChecked,
    );
  };

  return (
    <>
      <Head>
        <title>Hyppe-Console</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <AuthWrapper variant={wrapperVariant}>
        {variant === 'default' ? (
          <Box className={classes.authThumb}>
            <CmtImage src="/images/auth/login-img.png" />
          </Box>
        ) : (
          <Box className={classes.visualAuth}>
            <CmtImage src="/images/auth/logo-visual.png" width="35%" />
            <CmtImage src="/images/auth/visual-login.png" width="75%" />
          </Box>
        )}
        <Box className={classes.authContent}>
          <Box mb={7}>
            <Logo />
          </Box>
          <Typography component="div" variant="h1" className={classes.titleRoot}>
            Login
          </Typography>
          <form>
            <Box mb={2}>
              <TextField
                label={<IntlMessages id="appModule.email" />}
                fullWidth
                onChange={(event) => setEmail(event.target.value?.toLowerCase())}
                defaultValue={email}
                margin="normal"
                variant="outlined"
                className={classes.textFieldRoot}
              />
            </Box>
            <Box mb={2}>
              <TextField
                type="password"
                label={<IntlMessages id="appModule.password" />}
                fullWidth
                onChange={(event) => setPassword(event.target.value)}
                defaultValue={password}
                margin="normal"
                variant="outlined"
                className={classes.textFieldRoot}
              />
            </Box>
            <Box display="flex" alignItems="center" justifyContent="space-between" mb={5}>
              <FormControlLabel
                className={classes.formcontrolLabelRoot}
                control={<Checkbox checked={isRememberMeChecked} onChange={(_, value) => setIsRememberMeChecked(value)} />}
                label="Remember me"
              />
            </Box>
            <Box display="flex" alignItems="center" justifyContent="space-between" mb={5}>
              <Button onClick={onSubmit} disabled={isLoginDisabled} variant="contained" color="primary">
                {/* <IntlMessages id="appModule.signIn" /> */}
                Masuk
              </Button>
            </Box>
          </form>
          <NotificationLoader loading={isLoading} error={error} />
        </Box>
      </AuthWrapper>
    </>
  );
};

SignIn.propTypes = {
  variant: PropTypes.string,
  wrapperVariant: PropTypes.string,
};

SignIn.defaultProps = {
  variant: 'default',
  wrapperVariant: 'default',
};

export default SignIn;
