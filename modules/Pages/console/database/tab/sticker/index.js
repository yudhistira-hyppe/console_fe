import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';
import StickerChart from './sticker-chart';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Tab } from '@mui/material';
import useStyles from '../index.style';
import TableListSticker from './table-sticker';
import TableListEmoji from './table-emoji';
import TableListGif from './table-gif';
import router, { useRouter } from 'next/router';

const DatabaseTabStickerComponent = () => {
  const classes = useStyles();
  const [tab, setTab] = useState('sticker');
  const router = useRouter();

  useEffect(() => {
    router.query?.tab && setTab(router.query.tab);

    if (window.screenY === 0 && router.query?.tab) {
      window.scrollTo({ top: 620, behavior: 'instant' });
    }
  }, [router]);

  const handleChangeTab = (_, value) => {
    setTab(value);
    router.replace({
      pathname: '/database/sticker',
      query: {
        tab: value,
      },
    });
  };

  return (
    <>
      <Head>
        <title key="title">Hyppe Console :: Database Sticker</title>
      </Head>

      <PageContainer heading="">
        <StickerChart />

        <TabContext value={tab} id="tab-sticker">
          <TabList onChange={handleChangeTab} textColor="secondary" indicatorColor="secondary" style={{ marginTop: 12 }}>
            <Tab className={classes.tab} label="Stiker" value="sticker" />
            <Tab className={classes.tab} label="Emoji" value="emoji" />
            <Tab className={classes.tab} label="GIF" value="gif" />
          </TabList>
          <TabPanel className={classes.tabPanel} value="sticker">
            <TableListSticker />
          </TabPanel>
          <TabPanel className={classes.tabPanel} value="emoji">
            <TableListEmoji />
          </TabPanel>
          <TabPanel className={classes.tabPanel} value="gif">
            <TableListGif />
          </TabPanel>
        </TabContext>
      </PageContainer>
    </>
  );
};

export default DatabaseTabStickerComponent;
