import React from 'react';
import { PostAdd,Home } from '@material-ui/icons';
import IntlMessages from '../../../utils/IntlMessages';

export const sidebarNavs = [
  {
    name: <IntlMessages id={'sidebar.main'} />,
    type: 'section',
    children: [
      {
        name: <IntlMessages id={'pages.samplePage'} />,
        type: 'item',
        icon: <PostAdd />,
        link: '/profiles',
      },
    ],
  },
];

export const horizontalDefaultNavs = [
  {
    name: <IntlMessages id={'sidebar.main'} />,
    type: 'collapse',
    children: [
      {
        name: <IntlMessages id={'pages.samplePage'} />,
        type: 'item',
        icon: <PostAdd />,
        link: '/profiles',
      },
    ],
  },
];

export const minimalHorizontalMenus = [
  {
    name: <IntlMessages id={'sidebar.main'} />,
    type: 'collapse',
    children: [
      {
        name: <IntlMessages id={'pages.samplePage'} />,
        type: 'item',
        icon: <PostAdd />,
        link: '/profiles',
      },
    ],
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
    link: '/console/help_center'
  },
  {
    name: 'Database Akun Pengguna',
    type: 'item',
    link: '/console/pengguna'
  },
  {
    name: 'Engagement Pengguna',
    type: 'item',
    link: '/console/user_engagement'
  },
  {
    name: 'Monetize',
    type: 'item',
    link: '/console/monetize'
  },
  {
    name: 'Pusat Iklan',
    type: 'item',
    link: '/console/ads_center'
  }
];