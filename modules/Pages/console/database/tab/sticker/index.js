import React, { useState } from 'react';
import Head from 'next/head';
import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';
import StickerChart from './sticker-chart';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Tab } from '@mui/material';
import useStyles from '../index.style';
import TableListSticker from './table-sticker';
import TableListEmoji from './table-emoji';
import TableListGif from './table-gif';

const DatabaseTabStickerComponent = () => {
  const classes = useStyles();
  const [tab, setTab] = useState('sticker');

  return (
    <>
      <Head>
        <title key="title">Hyppe Console :: Database Sticker</title>
      </Head>

      <PageContainer heading="">
        <StickerChart />

        <TabContext value={tab}>
          <TabList
            onChange={(e, value) => setTab(value)}
            textColor="secondary"
            indicatorColor="secondary"
            style={{ marginTop: 12 }}>
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
