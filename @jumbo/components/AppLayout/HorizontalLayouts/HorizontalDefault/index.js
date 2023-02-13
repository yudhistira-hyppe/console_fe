import React, { useEffect, useState } from 'react';
import clsx from 'clsx';

import Hidden from '@material-ui/core/Hidden';

import CmtHorizontalLayout from '../../../../../@coremat/CmtLayouts/Horizontal';
import CmtHeaderNav from '../../../../../@coremat/CmtLayouts/Horizontal/Header/HeaderNav';
import CmtHeaderTop from '../../../../../@coremat/CmtLayouts/Horizontal/Header/HeaderTop';
import CmtHeaderMain from '../../../../../@coremat/CmtLayouts/Horizontal/Header/HeaderMain';
import HeaderLogin from '../../partials/Header/HeaderLogin';
import HeaderTop from '../../partials/Header/HeaderTop';
import CmtHeader from '../../../../../@coremat/CmtLayouts/Horizontal/Header';
import CmtSidebar from '../../../../../@coremat/CmtLayouts/Horizontal/Sidebar';
import ContentLoader from '../../../ContentLoader';
import CmtContent from '../../../../../@coremat/CmtLayouts/Horizontal/Content';
import SideBar from '../../partials/SideBar';
import CmtFooter from '../../../../../@coremat/CmtLayouts/Horizontal/Footer';
import Footer from '../../partials/Footer';
import { HEADER_TYPE } from '../../../../constants/ThemeOptions';
import defaultContext from '../../../contextProvider/AppContextProvider/defaultContext';
import CmtHorizontal from '../../../../../@coremat/CmtNavigation/Horizontal';
import { horizontalDefaultNavs, consoleNav } from '../../partials/menus';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { useAuth } from 'authentication';
import { Typography } from '@material-ui/core';
import { Skeleton, Stack } from '@mui/material';

const layoutOptions = {
  showFooter: false,
  headerType: HEADER_TYPE.STATIC,
  layoutStyle: defaultContext.layoutType,
};

const HorizontalDefault = ({ className, children }) => {
  const router = useRouter();
  const { isLoading, authUser } = useAuth();
  const [accessModule, setAccessModule] = useState([]);
  const [loadingValidate, setLoadingValidate] = useState(true);

  const handleMenu = () => {
    const access = localStorage.getItem('access') ? JSON.parse(localStorage.getItem('access')) : [];
    const accessModule = access.map((item) => item.nameModule);
    let newMenu = consoleNav;

    if (
      !accessModule.includes('ads_performance') &&
      !accessModule.includes('ads_demografis') &&
      !accessModule.includes('ads_table')
    ) {
      newMenu = newMenu.filter((item) => item.name !== 'Pusat Iklan');
    }
    if (
      !accessModule.includes('boost_statistic') &&
      !accessModule.includes('boost_engagement') &&
      !accessModule.includes('boost_table')
    ) {
      newMenu = newMenu.filter((item) => item.name !== 'Boost Post Center');
    }
    if (
      !accessModule.includes('database_account') &&
      !accessModule.includes('database_content') &&
      !accessModule.includes('database_music')
    ) {
      newMenu = newMenu.filter((item) => item.name !== 'Database');
    }
    if (!accessModule.includes('engagement_metrik') && !accessModule.includes('engagement_trend')) {
      newMenu = newMenu.filter((item) => item.name !== 'Engagement');
    }
    if (
      !accessModule.includes('monetize_dashboard') &&
      !accessModule.includes('monetize_voucher') &&
      !accessModule.includes('monetize_ownership') &&
      !accessModule.includes('monetize_buy_sell')
    ) {
      newMenu = newMenu.filter((item) => item.name !== 'Monetisasi');
    }
    if (
      !accessModule.includes('help_consumer') &&
      !accessModule.includes('help_kyc') &&
      !accessModule.includes('help_bank') &&
      !accessModule.includes('help_konten') &&
      !accessModule.includes('help_appeal_konten') &&
      !accessModule.includes('help_fingerprint') &&
      !accessModule.includes('help_ads') &&
      !accessModule.includes('help_appeal_ads') &&
      !accessModule.includes('help_users') &&
      !accessModule.includes('help_appeal_users')
    ) {
      newMenu = newMenu.filter((item) => item.name !== 'Pusat Bantuan');
    }
    if (
      !accessModule.includes('dashboard_active_user') &&
      !accessModule.includes('dashboard_total_post') &&
      !accessModule.includes('dashboard_total_income') &&
      !accessModule.includes('dashboard_voucher') &&
      !accessModule.includes('dashboard_activity') &&
      !accessModule.includes('dashboard_status_ownership')
    ) {
      newMenu = newMenu.filter((item) => item.name !== 'Beranda');
    }
    if (
      !accessModule.includes('member_users') &&
      !accessModule.includes('member_position') &&
      !accessModule.includes('member_divistion')
    ) {
      newMenu = newMenu.filter((item) => item.name !== 'Anggota');
    }

    setAccessModule(newMenu);
    setLoadingValidate(false);
  };

  useEffect(() => {
    if (!isLoading) {
      setTimeout(() => handleMenu(), 200);
    } else {
      handleMenu();
    }
  }, [isLoading, authUser]);

  return (
    <CmtHorizontalLayout
      layoutOptions={layoutOptions}
      className={clsx('Cmt-horizontalDefaultLayout', className)}
      header={
        <CmtHeader>
          {/*<CmtHeaderNav>
            <HeaderLogin />
          </CmtHeaderNav>*/}
          <CmtHeaderTop>
            <HeaderTop />
          </CmtHeaderTop>
          <Hidden mdDown>
            <CmtHeaderMain bgcolor="primary.main" color="white">
              {/* <CmtHorizontal menuItems={router.pathname.includes('/console') ? consoleNav : horizontalDefaultNavs} /> */}
              {loadingValidate ? (
                <Stack direction="row" spacing={3} alignItems="center" margin="13px 0">
                  <Skeleton variant="rounded" height={20} width={80} />
                  <Skeleton variant="rounded" height={20} width={120} />
                  <Skeleton variant="rounded" height={20} width={80} />
                  <Skeleton variant="rounded" height={20} width={100} />
                  <Skeleton variant="rounded" height={20} width={120} />
                  <Skeleton variant="rounded" height={20} width={80} />
                  <Skeleton variant="rounded" height={20} width={100} />
                </Stack>
              ) : (
                <CmtHorizontal menuItems={accessModule} />
              )}
            </CmtHeaderMain>
          </Hidden>
        </CmtHeader>
      }
      sidebar={
        <CmtSidebar>
          <SideBar />
        </CmtSidebar>
      }>
      <CmtContent>
        {children}
        <ContentLoader />
      </CmtContent>
    </CmtHorizontalLayout>
  );
};

export default HorizontalDefault;
