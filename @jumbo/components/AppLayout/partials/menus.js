import React from 'react';
import { Home } from '@material-ui/icons';
import IntlMessages from '../../../utils/IntlMessages';

export const sidebarNavs = [
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
    link: '/console/',
    icon: <Home />,
  },
  {
    name: 'Pusat Bantuan',
    type: 'item',
    link: '/console/help-center',
  },
  {
    name: 'Pusat Iklan',
    type: 'item',
    link: '/console/ads-center',
  },
  {
    name: 'Database',
    type: 'item',
    link: '/console/users',
  },
  {
    name: 'Engagement',
    type: 'item',
    link: '/console/user-engagement',
  },
  {
    name: 'Monetisasi',
    type: 'item',
    link: '/console/monetize',
  },
  {
    name: 'Pengumuman',
    type: 'item',
    link: '/console/pengumuman',
  },
  {
    name: 'Pedoman',
    type: 'item',
    link: '/console/pedoman',
  },
  {
    name: 'Anggota',
    type: 'item',
    link: '/console/anggota',
  },
];
