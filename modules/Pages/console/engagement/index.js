import React from 'react';
import Head from 'next/head';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import PenggunaAktif from './PenggunaAktif/VoucherGraphhh';
import PenggunaBaru from './PenggunaBaru/VoucherGraphhh';

// started rewrite UI imported
// import { Grid } from '@material-ui/core';
// import GridContainer from '@jumbo/components/GridContainer';
// import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';
// import GrafikTotalInstalasi from './GrafikTotalInstalasi';
// import GrafikInstalasi from './GrafikInstalasi';
// import EngagementUser from './EngagementUser';
// import LogAktifitas from './LogAktifitas';
// import Performance from './Performance';
// import SalesStatistic from './SalesStatistic';
import { useGetLogActivityByYearQuery, useGetUserEventActivityByYearQuery } from 'api/console/engagement';
import { TabContext, TabList, TabPanel } from '@material-ui/lab';
import { Grid, makeStyles, Typography } from '@material-ui/core';
import CmtCardContent from '@coremat/CmtCard/CmtCardContent';
import CmtCard from '@coremat/CmtCard';
import { Stack } from '@mui/material';
import CmtList from '@coremat/CmtList';
import CmtProgressBar from '@coremat/CmtProgressBar';

const breadcrumbs = [
  { label: 'Home', link: '/console' },
  { label: 'Engagement Pengguna', isActive: true },
];

const useStyles = makeStyles((theme) => ({
  indicator: {
    backgroundColor: 'rgb(170, 34, 175)',
  },
  tabRoot: {
    minHeight: '40px',
    textAlign: 'center',
    fontSize: '0.8em',
    fontWeight: '900',
    letterSpacing: '2px',
  },
}));

const ConsoleEngagementComponent = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState('metrik');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  // started rewrite
  // const currentYear = new Date().getFullYear();
  // const { data: logActivityOneYear } = useGetLogActivityByYearQuery(currentYear);
  // const { data: userEventActivityOneYear } = useGetUserEventActivityByYearQuery(currentYear);

  const wallets = [
    { label: 'Perempuan', value: 60, rate: 12000, color: '#B457F6' },
    { label: 'Laki-laki', value: 40, rate: 8000, color: '#D72934' },
  ];

  const ProgressIndicator = ({ item, ...rest }) => {
    return (
      <Box width={1} {...rest}>
        <CmtProgressBar
          label={
            <Box display="flex" alignItems="center">
              {`${item.label}`} | <Box pl={1} component="span" color="text.secondary" fontSize={12}>{`${item.rate}`}</Box>
            </Box>
          }
          labelPos="top-left"
          value={item.value}
          renderValue={(value) => {
            return `${value}%`;
          }}
          containedColor={item.color}
          onlyContained
        />
      </Box>
    );
  };

  return (
    <>
      <Head>
        <title key="title">Hyppe-Console :: Engagement Pengguna</title>
      </Head>
      <TabContext value={value}>
        <TabList
          onChange={handleChange}
          aria-label="lab API tabs example"
          variant="scrollable"
          // classes={{
          //   indicator: classes.indicator,
          // }}
        >
          <Tab
            label={'Metrik'}
            value={'metrik'}
            // classes={{
            //   root: classes.tabRoot,
            // }}
          />
          <Tab
            label={'Trend'}
            value={'trend'}
            // classes={{
            //   root: classes.tabRoot,
            // }}
          />
        </TabList>
        <TabPanel value="metrik">
          <Grid container spacing={5}>
            <Grid item xs={12} sm={4} md={4}>
              <PenggunaBaru title="Pengguna Baru" secondaryTitle="Bulan ini" amount="330" />
            </Grid>
            <Grid item xs={12} sm={4} md={4}>
              <PenggunaAktif title="Pengguna Aktif" secondaryTitle="Bulan ini" amount="10.254" />
            </Grid>
            <Grid item xs={12} sm={4} md={4}>
              <CmtCard>
                <CmtCardContent style={{ minHeight: '214px' }}>
                  <Stack direction="column" justifyContent="flex-start" alignItems="flex-start" spacing={3}>
                    <Typography component="span" variant="h3">
                      Jenis Kelamin
                    </Typography>
                    <Box width={1}>
                      <CmtList
                        data={wallets}
                        renderRow={(item, index) => (
                          <ProgressIndicator key={index} className={classes.listItemRoot} item={item} />
                        )}
                      />
                    </Box>
                  </Stack>
                </CmtCardContent>
              </CmtCard>
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel value="trend">
          <div>trend</div>
        </TabPanel>
      </TabContext>

      {/* started rewrite UI */}
      {/* <PageContainer heading="Engagement Pengguna" breadcrumbs={breadcrumbs}>

      {/* <GridContainer>
          <Grid item xs={12} md={8} xl={8}>
            <GrafikInstalasi />
          </Grid>
          <Grid item xs={12} md={4} xl={4}>
            <GrafikTotalInstalasi />
          </Grid> */}

      {/* <Grid item xs={12} md={12} xl={12}>
            // this just commented before rewrite
            <SiteVisitors/>
          </Grid> */}
      {/* <Grid item xs={12} md={12} xl={12}>
            <LogAktifitas data={logActivityOneYear} />
          </Grid>
          <Grid item xs={12} md={12} xl={12}>
            <EngagementUser data={userEventActivityOneYear} />
          </Grid> */}
      {/* <Grid item xs={12} md={6} xl={6}>
            // this just commented before rewrite
            <Performance />
          </Grid>
          <Grid item xs={12} md={6} xl={6}>
            // this just commented before rewrite
          <SalesStatistic />
          </Grid> */}
      {/* </GridContainer> */}
      {/* </PageContainer> */}
    </>
  );
};

export default ConsoleEngagementComponent;
