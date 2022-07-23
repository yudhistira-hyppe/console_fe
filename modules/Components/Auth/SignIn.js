import React from 'react';
import PropTypes from 'prop-types';
import { useAuth } from 'authentication';
import { alpha, makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';
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
  titleRoot: {
    marginBottom: 14,
    color: '#3F3F3F',
  },
  descRoot: {
    marginBottom: 24,
    color: 'rgba(63, 63, 63, 0.6)',
  },
  button: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '2px solid #EDEDED',
    borderRadius: '4px',
    backgroundColor: '#FFF',
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: 'rgba(0, 0, 0, 0.04)',
    },
    '& img': {
      height: '48px',
      padding: '12px',
    },
    '& p': {
      width: '100%',
      height: '48px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderLeft: '2px solid #EDEDED',
      color: '#737373',
      fontSize: '16px',
    },
  },
  divider: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    position: 'relative',
    borderTop: '1px solid #C1C1C1',
    margin: '24px 0',
    '& p': {
      backgroundColor: '#FFF',
      position: 'absolute',
      fontSize: '16px',
      height: '24px',
      padding: '0 24px',
      top: '-12.5px',
    },
  },
}));

const SignIn = ({ variant = 'default', onHandleClickSignInWithEmail }) => {
  const classes = useStyles({ variant });
  const { userLoginWithGoogle } = useAuth();

  return (
    <>
      <Box className={classes.authContent}>
        <Box mb={7}>
          <Logo />
        </Box>
        <Typography component="div" variant="h1" className={classes.titleRoot}>
          Selamat Datang Di Hyppe Business
        </Typography>
        <Typography component="div" variant="h4" className={classes.descRoot}>
          Mulai kembangkan bisnismu dan buat kontenmu dilihat banyak orang
        </Typography>
        <button className={classes.button} onClick={userLoginWithGoogle}>
          <img src="/images/icons/google.svg" alt="Masuk dengan akun Google" />
          <p>Masuk dengan akun Google</p>
        </button>
        <div className={classes.divider}>
          <p>Atau Masuk Dengan</p>
        </div>
        <button className={classes.button} onClick={onHandleClickSignInWithEmail}>
          <img src="/images/icons/user.svg" alt="Masuk dengan alamat Email" />
          <p>Masuk dengan alamat Email lainnya</p>
        </button>
      </Box>
      <Box className={classes.authThumb}>
        <div className={classes.authThumbText}>
          <p className="title">From</p>
          <img src="/images/hyppe-logo-with-text.svg" alt="Logo Hyppe" />
          <p className="desc">#MonetizeYourIdeas</p>
        </div>
        <img src="/images/auth/signin.svg" alt="Masuk dengan alamat email" />
      </Box>
    </>
  );
};

SignIn.propTypes = {
  variant: PropTypes.string,
  onHandleClickSignInWithEmail: PropTypes.func,
};

SignIn.defaultProps = {
  variant: 'default',
};

export default SignIn;
