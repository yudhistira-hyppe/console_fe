import React from 'react';
import { Home } from '@material-ui/icons';
import IntlMessages from '../../../utils/IntlMessages';

export const sidebarNavs = [
  {
    name: 'Beranda',
    type: 'item',
    link: '/',
  },
  {
    name: 'Pusat Bantuan',
    type: 'item',
    link: '/help-center',
  },
  {
    name: 'Pusat Iklan',
    type: 'item',
    link: '/ads-center',
  },
  {
    name: 'Boost Post Center',
    type: 'item',
    link: '/boost-center',
  },
  {
    name: 'Database',
    type: 'item',
    link: '/database',
  },
  {
    name: 'Engagement',
    type: 'item',
    link: '/user-engagement',
  },
  {
    name: 'Monetisasi',
    type: 'item',
    link: '/monetize',
  },
  {
    name: 'Anggota',
    type: 'item',
    link: '/anggota',
  },
];

export const horizontalDefaultNavs = [
  {
    name: <IntlMessages id={'sidebar.main'} />,
    type: 'item',
    link: '/',
  },
  {
    name: 'Content Management',
    type: 'item',
    link: '/contents',
  },
  {
    name: 'Ads Center',
    type: 'collapse',
    children: [
      {
        name: 'Ads Center',
        type: 'item',
        link: '/ads',
      },
      {
        name: 'Ads Guideline',
        type: 'item',
        link: '/adsGuideline',
      },
      {
        name: 'About Hyppe Ads',
        type: 'item',
        link: '/aboutAds',
      },
      {
        name: 'Ads Detail',
        type: 'item',
        link: '/ads/details',
      },
      {
        name: 'Create Ads',
        type: 'item',
        link: '/ads/create',
      },
      {
        name: 'Buy Voucher',
        type: 'item',
        link: '/voucher/buy',
      },
    ],
  },
  {
    name: 'Transaction',
    type: 'item',
    link: '/transaction',
  },
];

export const minimalHorizontalMenus = [
  {
    name: <IntlMessages id={'sidebar.main'} />,
    type: 'mega',
    link: '/',
  },
];

export const consoleNav = [
  {
    name: 'Beranda',
    type: 'item',
    link: '/',
  },
  {
    name: 'Pusat Bantuan',
    type: 'item',
    link: '/help-center',
  },
  {
    name: 'Pusat Iklan',
    type: 'item',
    link: '/ads-center',
  },
  {
    name: 'Pusat Boost',
    type: 'item',
    link: '/boost-center',
  },
  {
    name: 'Database',
    type: 'item',
    link: '/database',
  },
  {
    name: 'Engagement',
    type: 'item',
    link: '/user-engagement',
  },
  {
    name: 'Monetisasi',
    type: 'item',
    link: '/monetize',
  },
  {
    name: 'Challenge',
    type: 'item',
    link: '/challenge',
  },
  {
    name: 'Anggota',
    type: 'item',
    link: '/anggota',
  },
  {
    name: 'Utilitas',
    type: 'item',
    link: '/utilitas',
  },
];
