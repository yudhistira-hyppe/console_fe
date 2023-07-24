import React, { cloneElement, isValidElement } from 'react';
import { List } from '@material-ui/core';
import Link from 'next/link';
import makeStyles from '@material-ui/core/styles/makeStyles';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { useAuth } from 'authentication';

const useStyles = makeStyles((theme) => ({
  navMenuLink: {
    display: 'flex',
    alignItems: 'center',
    color: '#FFFFFF',
    fontFamily: 'Lato',
    opacity: 0.4,
    height: '100%',
    transition: 'all .2s ease-in',
    '&:hover, &:focus': {
      opacity: 0.8,
    },
    '&.active': {
      opacity: 1,
      fontWeight: 'bold',
      color: '#FFFFFF',
      '& .Cmt-icon-root': {
        color: '#FFFFFF',
      },
      '&:hover, &:focus': {
        '& .Cmt-icon-root': {
          color: theme.palette.horizontalNav.textActiveColor,
        },
      },
    },
  },
  navMenuLinkChild: {
    display: 'flex',
    alignItems: 'center',
    color: '#3F3F3F',
    fontFamily: 'Lato',
    height: '100%',
    padding: '9px 15px',
    transition: 'all .2s ease-in',
    fontWeight: 'bold',
    '&:hover': {
      color: theme.palette.horizontalNav.textActiveColor,
    },
    '&.active': {
      color: theme.palette.horizontalNav.textActiveColor,
      backgroundColor: theme.palette.horizontalNav.menuActiveBgColor,
      '& .Cmt-icon-root': {
        color: theme.palette.horizontalNav.textActiveColor,
      },
      '&:hover, &:focus': {
        '& .Cmt-icon-root': {
          color: theme.palette.horizontalNav.textActiveColor,
        },
      },
    },
  },
  iconRoot: {
    margin: '0 12px 0 10px',
    fontSize: 20,
  },
}));

const NavMenuItem = (props) => {
  const { authUser } = useAuth();
  const { name, icon, link, handleClick, className, children, isChild } = props;
  const classes = useStyles();
  const router = useRouter();
  const path = router.pathname.split('/');

  const renderIcon = () => {
    if (icon && isValidElement(icon)) {
      return cloneElement(icon, {
        className: clsx(classes.iconRoot, 'Cmt-icon-root'),
      });
    }

    return null;
  };

  // please dont remove the code

  // const PREMIUM_ROUTES = [
  //   '/ads',
  //   '/adsGuideline',
  //   '/aboutAds',
  //   '/ads/details',
  //   '/ads/create',
  //   '/voucher/buy',
  //   '/transaction',
  // ];
  // const [upgradeUser, { isSuccess, isLoading, isError }] = useUpgradeUserMutation();
  // const handleUpgradePremium = (e) => {
  //   if (!authUser.user?.roles.includes('ROLE_PREMIUM')) {
  //     if (PREMIUM_ROUTES.includes(link)) {
  //       e.preventDefault();
  //       Swal.fire({
  //         title: 'Anda harus upgrade premium untuk melihat ini, apakah ingin upgrade premium?',
  //         showDenyButton: true,
  //         showCancelButton: true,
  //         confirmButtonText: 'Upgrade',
  //         denyButtonText: `Don't save`,
  //         cancelButtonText: 'Batalkan',
  //       }).then((result) => {
  //         console.log('resultssss:', result);
  //         if (result.isConfirmed) {
  //           upgradeUser({ email: 'freeman27@getnada.com', roles: 'ROLE_PREMIUM' });
  //           Swal.fire('Akun anda sudah Premium!', '', 'success');
  //           localStorage.removeItem('user');
  //           setTimeout(() => {
  //             window.location.reload();
  //           }, '2000');
  //         } else if (result.isDismissed) {
  //           Swal.fire('Anda harus menjadi akun Premium untuk melihat halaman tersebut', '', 'info').then((result) => {
  //             if (result.isConfirmed) {
  //               setTimeout(() => {
  //                 window.location.reload();
  //               }, '200');
  //             }
  //           });
  //         }
  //       });
  //     }
  //   }
  // };

  return (
    <List component="div" disablePadding onClick={handleClick}>
      <Link href={link}>
        <a
          // onClick={handleUpgradePremium}
          className={clsx(isChild ? classes.navMenuLinkChild : classes.navMenuLink, {
            active: link === `/${path[1]}` || link === router.pathname,
          })}>
          {/* Display an icon if any */}
          {renderIcon()}
          <span className={clsx(classes.navText, 'Cmt-nav-text')}>{name}</span>
        </a>
      </Link>
    </List>
  );
};

export default NavMenuItem;
