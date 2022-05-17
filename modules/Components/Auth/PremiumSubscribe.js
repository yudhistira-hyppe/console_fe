//MODIFIED HYPPE
import React, { useState } from 'react';
import { Box } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { alpha, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AuthWrapper from './AuthWrapper';
import Link from 'next/link';
import CmtImage from '../../../@coremat/CmtImage';
import IntlMessages from '../../../@jumbo/utils/IntlMessages';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import validator from 'validator';
import { useRouter } from 'next/router';
import { NotificationLoader } from '../../../@jumbo/components/ContentLoader';
import { useAuth } from '../../../authentication';

const useStyles = makeStyles((theme) => ({
  authThumb: {
    backgroundColor: alpha(theme.palette.primary.main, 0.12),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    [theme.breakpoints.up('md')]: {
      width: '50%',
      order: 2,
    },
  },
  authContent: {
    padding: 30,
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
  textCapital: {
    textTransform: 'capitalize',
  },
  textAcc: {
    textAlign: 'center',
    '& a': {
      marginLeft: 4,
    },
  },
  alrTextRoot: {
    textAlign: 'center',
    [theme.breakpoints.up('sm')]: {
      textAlign: 'right',
    },
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const PremiumSubscribe = ({ variant = 'default', wrapperVariant = 'default' }) => {
  const classes = useStyles({ variant });
  const { isLoading, error, userPremiumSubscribe } = useAuth();
  const [email, setEmail] = useState('');
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onConfirm = () => {
    userPremiumSubscribe({ email }, () => {
      router.push('/').then((r) => r);
    });
  };

  const onSubmit = () => {
    if (email && validator.isEmail(email)) handleClickOpen();
  };

  const ConfirmationDialog = () => (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description">
      <DialogTitle id="alert-dialog-slide-title">{<IntlMessages id="subscribe.dialog.title" />}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          <IntlMessages id="subscribe.dialog.body" />
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          <IntlMessages id="appModule.premium.disagee" />
        </Button>
        <Button onClick={onConfirm} color="primary">
          <IntlMessages id="appModule.premium.agree" />
        </Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <AuthWrapper variant={wrapperVariant}>
      {variant === 'default' ? (
        <Box className={classes.authThumb}>
          <CmtImage src="/images/auth/sign-up-img.png" />
        </Box>
      ) : null}
      <Box className={classes.authContent}>
        <Box mb={7}>
          <CmtImage src="/images/logo.png" />
        </Box>
        <Typography component="div" variant="h1" className={classes.titleRoot}>
          <IntlMessages id="subscribe.premium.title" />
        </Typography>
        <form>
          <Box mb={2}>
            <TextField
              label={<IntlMessages id="appModule.email" />}
              fullWidth
              onChange={(event) => setEmail(event.target.value)}
              defaultValue={email}
              margin="normal"
              variant="outlined"
              className={classes.textFieldRoot}
            />
          </Box>
          <Box
            display="flex"
            flexDirection={{ xs: 'column', sm: 'row' }}
            alignItems={{ sm: 'center' }}
            justifyContent={{ sm: 'space-between' }}
            mb={3}>
            <Box mb={{ xs: 2, sm: 0 }}>
              <Button onClick={onSubmit} variant="contained" color="primary">
                <IntlMessages id="appModule.premium.subscribe" />
              </Button>
            </Box>
          </Box>

          <Typography className={classes.alrTextRoot}>
            <Link href="/signin">
              <a>
                <IntlMessages id="subscribe.premium.button.back" />
              </a>
            </Link>
          </Typography>
        </form>

        <NotificationLoader loading={isLoading} error={error} />
        <ConfirmationDialog />
      </Box>
    </AuthWrapper>
  );
};

export default PremiumSubscribe;
