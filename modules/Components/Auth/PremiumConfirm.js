//MODIFIED HYPPE
import React, { useState, useEffect } from 'react';
import { alpha, makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { Button } from '@material-ui/core';
import IntlMessages from '../../../@jumbo/utils/IntlMessages';
import CmtAdvCardContent from '../../../@coremat/CmtAdvCard/CmtAdvCardContent';
import CmtCard from '../../../@coremat/CmtCard';
import { useRouter } from 'next/router';
import { useAuth } from '../../../authentication';

const cardLogo = '/images/dashboard/Friend-icon.svg';
const useStyles = makeStyles((theme) => ({
  authWrap: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    padding: 20,
    [theme.breakpoints.up('sm')]: {
      padding: 40,
    },
    '&:before': {
      content: '""',
      position: 'absolute',
      left: 0,
      top: 0,
      zIndex: 1,
      width: '100%',
      height: '100%',
      backgroundColor: (props) => (props.variant === 'bgColor' ? alpha(theme.palette.primary.main, 0.5) : ''),
    },
  },

  revealCard: {
    height: 150,
    color: theme.palette.primary.main,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.up('md')]: {
      paddingLeft: 24,
      paddingRight: 24,
    },
    '& .Cmt-content-head': {
      paddingBottom: 18,
    },
  },
  titleRoot: {
    marginBottom: 26,
  },
  subTitileRoot: {
    fontSize: 14,
    marginTop: 16,
    marginBottom: 16,
    letterSpacing: 0.25,
  },
  textWhite: {
    color: theme.palette.common.white,
    '& $cardLogo': {
      backgroundColor: theme.palette.common.white,
    },
  },
  cardLogo: {
    mask: `URL(${cardLogo})`,
    backgroundColor: theme.palette.primary.main,
    width: 70,
    height: 70,
  },
}));

//variant = 'default', 'standard', 'bgColor'
// eslint-disable-next-line react/prop-types
const PremiumConfirm = ({ variant = 'default', wrapperVariant = 'default', queryParams }) => {
  const classes = useStyles({ variant });
  const { isLoading, error, userPremiumConfirm, authUser } = useAuth();
  const [email, setEmail] = useState('');
  const [otpToken, setOtpToken] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (Object.entries(queryParams).length > 0 && queryParams.constructor === Object) {
      setEmail(queryParams.email);
      setOtpToken(queryParams.otpToken);
    }
  }, [queryParams]);

  const textDyanimicClass = () => {
    if ((showBackground && backgroundStyle !== 'color') || (showOverlay && overlayOpacity > 0.5)) {
      return classes.textWhite;
    }
  };

  const onSubmit = () => {
    userPremiumConfirm({ email, otpToken }, () => {
      router.push('/').then((r) => r);
    });
  };

  return !authUser ? (
    <Box className={classes.authWrap}>
      <CmtCard>
        <CmtAdvCardContent
          title={
            <Box component="div" fontSize={22} mb={1} fontWeight={700} lineHeight={1}>
              <IntlMessages id="subscribe.premium.confirm.title" />
            </Box>
          }
          subTitle={
            <Box component="p" className={ classes.subTitileRoot}>
              <IntlMessages id="subscribe.premium.confirm.body" />
            </Box>
          }
          extraContent={
            <Button variant="contained" color="primary" onClick={onSubmit}>
              <IntlMessages id="appModule.premium.continue" />
            </Button>
          }
          alignCenter
        />
      </CmtCard>
    </Box>
  ):null;
};

export default PremiumConfirm;
