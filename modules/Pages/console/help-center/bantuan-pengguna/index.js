import React from 'react';
import { Box } from '@material-ui/core';
import Head from 'next/head';
import useStyles from './index.style';
import clsx from 'clsx';
import Sidebar from './Sidebar';
import ContactsList from './ContactsList';
import { useSelector } from 'react-redux';
import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';

const breadcrumbs = [
  { label: 'Home', link: '/console' },
  { label: 'Help Center', link: '/console/help-center' },
  { label: 'Bantuan Pengguna', isActive: true },
];

const ConsoleBantuanPenggunaComponent = () => {
  const classes = useStyles();
  const { isSideBarCollapsed } = useSelector((state) => state.helpCenterReducers);

  const onClickCreateContact = () => {};

  return (
    <>
      <Head>
        <title key="title">Hyppe-Console :: Bantuan Pengguna</title>
      </Head>
      <PageContainer heading="Bantuan Pengguna" breadcrumbs={breadcrumbs}>
        <Box className={classes.inBuildAppCard}>
          <Box className={clsx(classes.inBuildAppContainer, isSideBarCollapsed ? 'collapsed' : '')}>
            <Sidebar onClickCreateContact={onClickCreateContact} />
            <ContactsList />
          </Box>
        </Box>
      </PageContainer>
    </>
  );
};

export default ConsoleBantuanPenggunaComponent;
