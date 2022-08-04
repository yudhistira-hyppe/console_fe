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
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import CmtCard from '@coremat/CmtCard';
import { Stack } from '@mui/material';
import CmtList from '@coremat/CmtList';
import CmtProgressBar from '@coremat/CmtProgressBar';
import Gender from './Gender';
import ApplicationInstalled from './applicationInstalled';
import { AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Area, Brush } from 'recharts';
import CmtAdvCard from '@coremat/CmtAdvCard';
import CmtCardHeader from '@coremat/CmtCard/CmtCardHeader';
import SesiGraph from './Sesi';
import EngagementGraph from './engagementGraph';

const breadcrumbs = [
  { label: 'Home', link: '/console' },
  { label: 'Engagement Pengguna', isActive: true },
];

const useStyles = makeStyles((theme) => ({
  indicator: {
    backgroundColor: 'rgb(170, 34, 175)',
  },
}));

const ConsoleEngagementComponent = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState('metrik');

  const data = [
    { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
    { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
    { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
    { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
    { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
    { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
    { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
  ];

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const ComingSoon = ({ title }) => {
    return (
      <>
        <CmtAdvCard>
          <CmtCardHeader
            titleProps={{
              variant: 'h4',
              component: 'div',
            }}
            title={title}
          />
          <center>
            <Typography variant={'h3'} component={'div'}>
              Akan Hadir
            </Typography>
            <img src="/images/architect.svg" alt="doesnt render" />
          </center>
        </CmtAdvCard>
      </>
    );
  };

  const LabelTab = ({ label }) => {
    return (
      <>
        <Typography variant="h6" component={'div'} style={{ letterSpacing: '3px' }}>
          {label}
        </Typography>
      </>
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
          classes={{
            indicator: classes.indicator,
          }}>
          <Tab
            label={<LabelTab label="Metrik" />}
            value="metrik"
            classes={{
              root: classes.tabRoot,
            }}
          />
          <Tab
            label={<LabelTab label="Trend" />}
            value="trend"
            classes={{
              root: classes.tabRoot,
            }}
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
              <Gender />
            </Grid>
            <Grid item xs={12} sm={8} md={8}>
              <center style={{ background: 'purple', height: '40vh', width: '100%', color: '#FFFFFF' }}>
                map here (i'll make it later) because it taking time and discuss
              </center>
            </Grid>
            <Grid item xs={12} sm={4} md={4}>
              <ApplicationInstalled />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              {/*  NOTED : the heck is happend, i cant make it modular, 
              when i export the component the error is 'main is undefined' seriously i dont know why */}
              {/* please give it a try */}
              {/* <SesiGraph /> */}

              <CmtAdvCard>
                <CmtCardHeader
                  titleProps={{
                    variant: 'h4',
                    component: 'div',
                  }}
                  title={
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <div>Sesi</div>
                      <div>
                        <ButtonGroup size="small" aria-label="small button group">
                          <Button key="one">
                            <span style={{ fontSize: '10px' }}>Harian</span>
                          </Button>
                          <Button key="two">
                            <span style={{ fontSize: '10px' }}>Mingguan</span>
                          </Button>
                          <Button key="three">
                            <span style={{ fontSize: '10px' }}>Bulanan</span>
                          </Button>
                          <Button key="three">
                            <span style={{ fontSize: '10px' }}>Rentang</span>
                          </Button>
                        </ButtonGroup>
                      </div>
                    </Stack>
                  }
                />

                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={data} syncId="anyId" margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="0" />
                    <Tooltip labelStyle={{ color: 'black' }} itemStyle={{ color: 'black' }} cursor={false} />
                    <defs>
                      <linearGradient id="color18" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="1%" stopColor="rgba(212, 90, 216, 0.2)" stopOpacity={1} />
                        <stop offset="95%" stopColor="white" stopOpacity={1} />
                      </linearGradient>
                    </defs>
                    <Area
                      dataKey="pv"
                      type="monotone"
                      strokeWidth={2}
                      stackId="2"
                      stroke="rgba(171, 34, 175, 1)"
                      fill="url(#color18)"
                      fillOpacity={1}
                    />
                    {/* <Area type="monotone" dataKey="pv" stroke="rgba(171, 34, 175, 1)" fill="rgba(171, 34, 175, 1)" /> */}
                    {/* <Brush /> */}
                  </AreaChart>
                </ResponsiveContainer>
              </CmtAdvCard>
            </Grid>

            <Grid item xs={12} sm={12} md={12}>
              <EngagementGraph />
            </Grid>

            <Grid item xs={12} sm={8} md={8}>
              <ComingSoon title="Akan Hadir" />
            </Grid>
            <Grid item xs={12} sm={4} md={4}>
              <ComingSoon title="Statik Store" />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <ComingSoon title="Lalu Lintas" />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <ComingSoon title="Kepuasaan Pelanggan" />
            </Grid>
          </Grid>
        </TabPanel>

        {/* ------  */}

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
