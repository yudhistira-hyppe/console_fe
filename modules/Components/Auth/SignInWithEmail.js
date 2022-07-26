import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useAuth } from 'authentication';
import {
  Box,
  Button,
  Typography,
  FormControlLabel,
  Checkbox,
  InputAdornment,
  OutlinedInput,
  IconButton,
  FormControl,
  InputLabel,
} from '@material-ui/core';
import { ArrowBack, Visibility, VisibilityOff } from '@material-ui/icons';
import { alpha, makeStyles } from '@material-ui/core/styles';
import IntlMessages from '@jumbo/utils/IntlMessages';
import Logo from '@jumbo/components/AppLayout/partials/Logo';

const useStyles = makeStyles((theme) => ({
  authThumb: {
    backgroundColor: alpha('#8B8B8B', 0.12),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '50%',
      order: 2,
    },
    '& img': {
      maxHeight: '367px',
    },
  },
  authThumbText: {
    textAlign: 'center',
    color: '#353535',
    '& .title': {
      fontSize: '16px',
    },
    '& img': {
      margin: '2px 0 4px 0',
    },
    '& .hashtag': {
      fontSize: '14px',
    },
  },
  authContent: {
    padding: 30,
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: (props) => (props.variant === 'default' ? '50%' : '100%'),
      order: 1,
    },
    [theme.breakpoints.up('xl')]: {
      padding: 50,
    },
  },
  backButton: {
    marginLeft: '-4px',
    marginBottom: '16px',
    padding: 0,
    textTransform: 'capitalize',
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

const SignInWithEmail = ({ variant = 'default', location, deviceId, onHandleClickBackToLogin }) => {
  const classes = useStyles({ variant });
  const { userLoginWithEmail } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isLoginDisabled, setIsLoginDisabled] = useState(true);
  const [isRememberMeChecked, setIsRememberMeChecked] = useState(false);

  useEffect(() => {
    if (email && password) {
      setIsLoginDisabled(false);
    } else {
      setIsLoginDisabled(true);
    }
  }, [email, password]);

  const onSubmit = () => {
    userLoginWithEmail(
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
      <Box className={classes.authContent}>
        <Button onClick={onHandleClickBackToLogin} className={classes.backButton}>
          <ArrowBack /> Kembali
        </Button>
        <Box mb={7}>
          <Logo />
        </Box>
        <Typography component="div" variant="h1" className={classes.titleRoot}>
          Login
        </Typography>
        <form>
          <Box mb={2}>
            <FormControl fullWidth margin="normal" variant="outlined">
              <InputLabel htmlFor="email">
                <IntlMessages id="appModule.email" />
              </InputLabel>
              <OutlinedInput
                id="email"
                type="text"
                label={<IntlMessages id="appModule.email" />}
                onChange={(event) => setEmail(event.target.value)}
                defaultValue={email}
                className={classes.textFieldRoot}
              />
            </FormControl>
          </Box>
          <Box mb={2}>
            <FormControl fullWidth margin="normal" variant="outlined">
              <InputLabel htmlFor="password">
                <IntlMessages id="appModule.password" />
              </InputLabel>
              <OutlinedInput
                id="password"
                type={isShowPassword ? 'text' : 'password'}
                label={<IntlMessages id="appModule.password" />}
                onChange={(event) => setPassword(event.target.value)}
                defaultValue={password}
                className={classes.textFieldRoot}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton onClick={() => setIsShowPassword(!isShowPassword)} edge="end">
                      {isShowPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Box>
          <Box display="flex" alignItems="center" justifyContent="space-between" mb={5}>
            <FormControlLabel
              className={classes.formcontrolLabelRoot}
              control={<Checkbox checked={isRememberMeChecked} onChange={(_, value) => setIsRememberMeChecked(value)} />}
              label="Remember me"
            />
            {/* <Box component="p" fontSize={{ xs: 12, sm: 16 }}>
              <Link href="/forgot-password">
                <a>
                  <IntlMessages id="appModule.forgotPassword" />
                </a>
              </Link>
            </Box> */}
          </Box>
          <Box display="flex" alignItems="center" justifyContent="space-between" mb={5}>
            <Button onClick={onSubmit} disabled={isLoginDisabled} variant="contained" color="primary">
              <IntlMessages id="appModule.signIn" />
            </Button>
            {/* <Box component="p" fontSize={{ xs: 12, sm: 16 }}>
              <Link href="/premium-subscribe">
                <a>
                  <IntlMessages id="subscribe.premium.title" />
                </a>
              </Link>
            </Box> */}
          </Box>
        </form>
      </Box>
      <Box className={classes.authThumb}>
        <div className={classes.authThumbText}>
          <p className="title">From</p>
          <img src="/images/hyppe-logo-with-text.svg" alt="Logo Hyppe" />
          <p className="desc">#MonetizeYourIdeas</p>
        </div>
        <img src="/images/auth/signin-with-email.svg" alt="Masuk dengan alamat email" />
      </Box>
    </>
  );
};

SignInWithEmail.propTypes = {
  variant: PropTypes.string,
  location: PropTypes.object,
  deviceId: PropTypes.string,
  onHandleClickBackToLogin: PropTypes.func,
};

SignInWithEmail.defaultProps = {
  variant: 'default',
};

export default SignInWithEmail;
