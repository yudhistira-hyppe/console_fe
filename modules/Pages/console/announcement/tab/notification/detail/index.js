import { Box, Button, Card, Divider, MenuItem, Select, Stack, Tab, TextField, Tooltip } from '@mui/material';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import Breadcrumbs from '../../../../help-center/bantuan-pengguna/BreadCrumb';
import { Typography } from '@material-ui/core';
import { ChevronLeft, InfoOutlined } from '@material-ui/icons';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';
import dayjs from 'dayjs';
import Router from 'next/router';
import { useGetDetailNotificationQuery } from 'api/console/announcement';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';
import ModalSelectedPeople from '../../../modal/ModalSelectedPeople';
import useStyles from '../../../index.style';
import ContentDetail from './ContentDetail';
import AudiensNotificationComponent from './audiens';

const DetailNotificationComponent = ({ detailId }) => {
  const [inputValue, setInputValue] = useState({
    title_id: '',
    desc_id: '',
    title_en: '',
    desc_en: '',
    url: '',
    type: '',
    participant: [],
  });
  const [showModal, setShowModal] = useState(false);
  const [tab, setTab] = useState('notification');
  const classes = useStyles();

  const { data: details, isLoading: loadingDetail } = useGetDetailNotificationQuery(detailId);

  useEffect(() => {
    setInputValue({
      title_id: details?.subject_id || '',
      desc_id: details?.body_detail_id || '',
      title_en: details?.subject || '',
      desc_en: details?.body_detail || '',
      url: details?.action_buttons || '',
      type: details?.type_sending || '',
      participant: details?.notif_data,
    });
  }, [loadingDetail]);

  const breadcrumbs = [
    { label: 'Notifikasi Push', link: '/announcement/notification' },
    { label: 'Rincian Notifikasi Push', isActive: true },
  ];

  return (
    <>
      <Head>
        <title key="title">Hyppe-Console :: Rincian Notifikasi Push</title>
      </Head>
      <Stack direction="column" gap={2}>
        <Breadcrumbs breadcrumbs={breadcrumbs} />

        <Stack
          mt={1}
          mb={2}
          direction="row"
          alignItems="center"
          gap={1}
          style={{ width: 'fit-content', cursor: 'pointer' }}
          onClick={() => Router.push('/announcement/notification')}>
          <ChevronLeft style={{ fontSize: 24 }} />
          <Typography style={{ fontWeight: 'bold', fontSize: 20 }}>Kembali</Typography>
        </Stack>

        {loadingDetail ? (
          <PageLoader />
        ) : (
          <TabContext value={tab}>
            <TabList
              onChange={(_, selectedTab) => setTab(selectedTab)}
              textColor="secondary"
              indicatorColor="secondary"
              style={{ marginTop: -20, marginBottom: -10 }}>
              <Tab className={classes.tab} label="Push Notifikasi" value="notification" />
              <Tab className={classes.tab} label="Audiens" value="audiens" />
            </TabList>

            <TabPanel className={classes.tabPanel} value="notification">
              <ContentDetail details={details} inputValue={inputValue} />
            </TabPanel>
            <TabPanel className={classes.tabPanel} value="audiens">
              <AudiensNotificationComponent />
            </TabPanel>
          </TabContext>
        )}

        {showModal && (
          <ModalSelectedPeople
            showModal={showModal}
            onClose={() => setShowModal(!showModal)}
            selectedItem={inputValue?.participant}
            type="detail"
          />
        )}
      </Stack>
    </>
  );
};

export default DetailNotificationComponent;
