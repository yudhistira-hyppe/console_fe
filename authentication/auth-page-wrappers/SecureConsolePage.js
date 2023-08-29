import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from 'authentication';
import { Stack } from '@mui/material';
import { Typography } from '@material-ui/core';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';
import { consoleNav } from '@jumbo/components/AppLayout/partials/menus';
import { isEmpty } from 'lodash';
import { toast } from 'react-hot-toast';

const SecureConsolePage = ({ children }) => {
  const router = useRouter();
  const { authUser, getAuthUser, isLoading } = useAuth();
  const [isRenderChildren, setIsRenderChildren] = useState(false);
  const [loadingValidate, setLoadingValidate] = useState(true);

  const handleMenu = () => {
    const access = localStorage.getItem('access') ? JSON.parse(localStorage.getItem('access')) : [];
    const accessModule = access.map((item) => item.nameModule);

    if (isEmpty(authUser)) {
      if (router.pathname.includes('signin')) {
        setIsRenderChildren(true);
        setLoadingValidate(false);
      } else if (consoleNav.map((item) => item.link).includes(router.pathname)) {
        setIsRenderChildren(false);
        setLoadingValidate(true);
      } else {
        setIsRenderChildren(false);
        setLoadingValidate(true);
      }
    } else {
      if (router.pathname.includes('signin')) {
        setIsRenderChildren(true);
        setLoadingValidate(false);
      } else if (
        router.pathname === '/' &&
        authUser &&
        (accessModule.includes('dashboard_active_user') ||
          accessModule.includes('dashboard_total_post') ||
          accessModule.includes('dashboard_total_income') ||
          accessModule.includes('dashboard_voucher') ||
          accessModule.includes('dashboard_activity') ||
          accessModule.includes('dashboard_status_ownership'))
      ) {
        setIsRenderChildren(true);
        setLoadingValidate(false);
      } else if (router.pathname === '/profile-console' && authUser) {
        setIsRenderChildren(true);
        setLoadingValidate(false);
      } else if (
        router.pathname.includes('help-center') &&
        (accessModule.includes('help_consumer') ||
          accessModule.includes('help_kyc') ||
          accessModule.includes('help_bank') ||
          accessModule.includes('help_konten') ||
          accessModule.includes('help_appeal_konten') ||
          accessModule.includes('help_fingerprint') ||
          accessModule.includes('help_ads') ||
          accessModule.includes('help_appeal_ads') ||
          accessModule.includes('help_users') ||
          accessModule.includes('help_appeal_users'))
      ) {
        setIsRenderChildren(true);
        setLoadingValidate(false);
      } else if (
        router.pathname.includes('ads-center/setting') &&
        (accessModule.includes('ads_setting_dashboard') || accessModule.includes('ads_setting_list'))
      ) {
        setIsRenderChildren(true);
        setLoadingValidate(false);
      } else if (
        router.pathname.includes('ads-center/manage') &&
        (accessModule.includes('ads_manage_dashboard') || accessModule.includes('ads_manage_list'))
      ) {
        setIsRenderChildren(true);
        setLoadingValidate(false);
      } else if (
        router.pathname.includes('boost-center') &&
        (accessModule.includes('boost_statistic') ||
          accessModule.includes('boost_engagement') ||
          accessModule.includes('boost_table'))
      ) {
        setIsRenderChildren(true);
        setLoadingValidate(false);
      } else if (
        router.pathname.includes('database') &&
        (accessModule.includes('database_account') ||
          accessModule.includes('database_content') ||
          accessModule.includes('database_music'))
      ) {
        setIsRenderChildren(true);
        setLoadingValidate(false);
      } else if (
        router.pathname.includes('user-engagement') &&
        (accessModule.includes('engagement_metrik') || accessModule.includes('engagement_trend'))
      ) {
        setIsRenderChildren(true);
        setLoadingValidate(false);
      } else if (
        router.pathname.includes('monetize') &&
        (accessModule.includes('monetize_dashboard') ||
          accessModule.includes('monetize_voucher') ||
          accessModule.includes('monetize_ownership') ||
          accessModule.includes('monetize_buy_sell'))
      ) {
        setIsRenderChildren(true);
        setLoadingValidate(false);
      } else if (
        router.pathname.includes('anggota') &&
        (accessModule.includes('member_users') ||
          accessModule.includes('member_position') ||
          accessModule.includes('member_divistion'))
      ) {
        setIsRenderChildren(true);
        setLoadingValidate(false);
      } else if (
        router.pathname.includes('utilitas') &&
        (accessModule.includes('utilitas_interest') ||
          accessModule.includes('utilitas_setting') ||
          accessModule.includes('utilitas_bank') ||
          accessModule.includes('utilitas_challenge'))
      ) {
        setIsRenderChildren(true);
        setLoadingValidate(false);
      } else if (router.pathname.includes('challenge') && accessModule.includes('challenge')) {
        setIsRenderChildren(true);
        setLoadingValidate(false);
      } else if (
        router.pathname.includes('announcement') &&
        (accessModule.includes('announcement_notif') || accessModule.includes('announcement_banner'))
      ) {
        setIsRenderChildren(true);
        setLoadingValidate(false);
      } else {
        setIsRenderChildren(false);
        setLoadingValidate(false);
      }
    }
  };

  useEffect(() => {
    getAuthUser();
  }, [router]);

  useEffect(() => {
    if (!isLoading) {
      setTimeout(() => {
        if (!authUser && !router.asPath.includes('/signin') && router.asPath !== '/' && !router.asPath.includes('[')) {
          router.push({ pathname: '/signin', query: { redirect: router.asPath } });
          return;
        }
        if (!authUser && !router.pathname.includes('/signin') && router.pathname === '/') {
          router.push('/signin');
          return;
        }
        if (
          authUser &&
          authUser?.user?.roles.includes('ROLE_ADMIN') &&
          router.asPath.includes('/signin') &&
          router.query.redirect
        ) {
          router.push(router.query.redirect);
          return;
        }
        if (
          authUser &&
          authUser?.user?.roles.includes('ROLE_ADMIN') &&
          router.asPath.includes('/signin') &&
          !router.query.redirect
        ) {
          router.push('/');
          return;
        }
        handleMenu();
      }, 200);
    } else {
      handleMenu();
    }
  }, [isLoading, authUser]);

  return !loadingValidate ? (
    isRenderChildren && !loadingValidate ? (
      children
    ) : (
      <>
        <Stack height="100%" alignItems="center" justifyContent="center">
          <Typography style={{ fontWeight: 'bold', fontSize: 20 }}>Kamu tidak memiliki akses ke menu ini!</Typography>
        </Stack>
        {toast.loading('Kembali ke home...', { id: 'hue' })}
        {setTimeout(() => {
          toast.success('Berhasil kembali', { id: 'hue' });
        }, 1200)}
        {setTimeout(() => {
          router.replace('/');
        }, 1000)}
      </>
    )
  ) : (
    <PageLoader />
  );
};

export default SecureConsolePage;
