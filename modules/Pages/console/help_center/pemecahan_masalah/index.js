import React, { useState } from 'react';
import { Box } from '@material-ui/core';
import Head from 'next/head';
import useStyles from './index.style';
import clsx from 'clsx';
import Sidebar from './Sidebar';
import ContactsList from  './ContactsList';
import { useDispatch, useSelector } from 'react-redux';
import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';

const breadcrumbs = [
  { label: 'Home', link: '/console' },
  { label: 'Help Center', link: '/console/help_center' },
  { label: 'Pemecahan Masalah', isActive: true },
];

const ConsolePemecahanMasalahComponent = () => {
  const classes = useStyles();
  const { isSideBarCollapsed } = useSelector((state) => state.helpCenterReducers);
  const [viewMode, setViewMode] = useState('table');
  const dispatch = useDispatch();

//   const onShowContactDetail = (contact) => {
//     dispatch(setCurrentContact(contact));
//     setShowContactDetail(true);
//   };

  const onClickCreateContact = () => {
    setOpenCreateDialog(true);
  };

//   const onClickEditContact = (contact) => {
//     dispatch(setCurrentContact(contact));
//     setOpenCreateDialog(true);
//   };

  return (
    <>
      <Head>
        <title key="title">Hyppe-Console :: Pemecahan Masalah</title>
      </Head>
      <PageContainer heading="Pemecahan Masalah" breadcrumbs={breadcrumbs}>
            <Box className={classes.inBuildAppCard}>
              <Box className={clsx(classes.inBuildAppContainer, isSideBarCollapsed ? 'collapsed' : '')}>
                <Sidebar onClickCreateContact={onClickCreateContact} />
                <ContactsList/>
              </Box>
            </Box>
      </PageContainer>
    </>
  );
};

export default ConsolePemecahanMasalahComponent;
