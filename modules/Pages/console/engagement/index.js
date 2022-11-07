import React from 'react';
import Head from 'next/head';
import Tab from '@mui/material/Tab';
import { useGetLogActivityByYearQuery, useGetUserEventActivityByYearQuery } from 'api/console/engagement';
import { TabContext, TabList, TabPanel } from '@material-ui/lab';
import { Grid } from '@material-ui/core';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { Box, LinearProgress, Stack, Typography, Tooltip as TooltipMui } from '@mui/material';
import ApplicationInstalled from './applicationInstalled';
import {
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Area,
  Brush,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import CmtAdvCard from '@coremat/CmtAdvCard';
import CmtCardHeader from '@coremat/CmtCard/CmtCardHeader';
import EngagementGraph from './engagementGraph';
import CardChart from './CardChart';
import UserActiveGraph from './CardChart/GraphicChart';
import numberWithCommas from 'modules/Components/CommonComponent/NumberWithCommas/NumberWithCommas';

const ripple = [
  { new: 1500, active: 1500 },
  { new: 400, active: 400 },
  { new: 2000, active: 2000 },
  { new: 1200, active: 1200 },
  { new: 2200, active: 2200 },
  { new: 2600, active: 2600 },
  { new: 4300, active: 4300 },
  { new: 2290, active: 2900 },
  { new: 3800, active: 3800 },
  { new: 1500, active: 1500 },
];

const gender = [
  { name: 'laki-laki', value: 200 },
  { name: 'perempuan', value: 100 },
  { name: 'lainnya', value: 50 },
];

const ConsoleEngagementComponent = () => {
  const [value, setValue] = React.useState('metrik');
  const [chartValue, setChartValue] = React.useState({
    pengguna: 'Agustus',
  });
  const COLORS = ['#23036A', '#AB22AF', '#0795F4'];
  const data = [
    { name: '10/07/22', timeSpend: 30 },
    { name: '11/07/22', timeSpend: 60 },
    { name: '12/07/22', timeSpend: 50 },
    { name: '13/07/22', timeSpend: 80 },
    { name: '14/07/22', timeSpend: 60 },
    { name: '15/07/22', timeSpend: 70 },
    { name: '16/07/22', timeSpend: 100 },
  ];

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const ComingSoon = ({ title, tooltipTitle }) => {
    return (
      <CmtAdvCard>
        <Stack flex={1} direction="row" padding={2}>
          <Typography fontWeight="bold" fontFamily="Lato">
            {title}
          </Typography>
          <TooltipMui placement="bottom" title={tooltipTitle}>
            <img src="/images/icons/small-info.svg" style={{ marginLeft: '7px' }} />
          </TooltipMui>
        </Stack>
        <Stack direction="column" alignItems="center" justifyContent="center" spacing={3} padding={2} height={300}>
          <img src="/images/icon-comming-soon.png" alt="doesnt render" style={{ width: 50, height: 50 }} />
          <Typography fontFamily="Lato" fontSize={14} color="#666666" fontWeight="bold">
            Akan datang
          </Typography>
        </Stack>
      </CmtAdvCard>
    );
  };

  const LinearProgressWithLabel = (props) => {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: `${props.value}%`, mr: 1 }}>
          <LinearProgress variant="buffer" style={{ borderRadius: 8 }} value={100} sx={props.sx} />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body2" fontFamily="Lato">{`${Math.round(props.value)}%`}</Typography>
        </Box>
      </Box>
    );
  };

  const DemografisProgress = ({ location, value, progress, background }) => {
    return (
      <Stack direction="column" width="100%" spacing={1}>
        <Typography color="rgba(0, 0, 0, 0.6)" fontSize={14} fontFamily="Lato">
          <Typography variant="span" fontWeight="bold">
            {location}
          </Typography>{' '}
          | {value}
        </Typography>
        <LinearProgressWithLabel
          variant="determinate"
          value={progress}
          sx={() => ({
            '& .css-qhoknl-MuiLinearProgress-bar1': {
              backgroundColor: background,
            },
          })}
        />
      </Stack>
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
          TabIndicatorProps={{
            style: { backgroundColor: '#AB22AF', color: '#AB22AF', fontWeight: 'bold' },
          }}
          textColor="secondary">
          <Tab label="Metrik" value="metrik" style={{ fontWeight: 'bold', textTransform: 'initial' }} />
          <Tab label="Trend" value="trend" style={{ fontWeight: 'bold', textTransform: 'initial' }} />
        </TabList>
        <TabPanel style={{ padding: '30px 20px' }} value="metrik">
          <Grid container spacing={5}>
            <Grid item xs={12} sm={6} md={6}>
              <CardChart
                title="Pengguna Baru"
                tooltipPlacement="bottom"
                tooltipTitle="Jumlah pengguna baru yang mendaftar di aplikasi dalam kurun waktu tertentu"
                content={
                  <>
                    <Stack px={2}>
                      <Typography fontWeight="bold" fontFamily="Lato" fontSize={24} color="#CB76CD">
                        {numberWithCommas(300)}
                      </Typography>
                    </Stack>
                    <UserActiveGraph
                      dataChart={ripple}
                      colorGradient={'color10'}
                      colorStop1={'rgba(203, 118, 205, 0.6)'}
                      colorStop2={'rgba(217, 217, 217, 0)'}
                      dataKey="new"
                    />
                  </>
                }
                status={chartValue.pengguna}
                setStatusList={(val) => setChartValue({ ...chartValue, pengguna: val })}
                cardStyle={{ height: '16em' }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <CardChart
                title="Pengguna Aktif"
                tooltipPlacement="bottom"
                tooltipTitle="Pengguna yang aktif menggunakan aplikasi dalam kurun waktu tertentu"
                content={
                  <>
                    <Stack px={2}>
                      <Typography fontWeight="bold" fontFamily="Lato" fontSize={24} color="#B04FF6">
                        {numberWithCommas(10524)}
                      </Typography>
                    </Stack>
                    <UserActiveGraph
                      dataChart={ripple}
                      colorGradient={'color12'}
                      colorStop1={'rgba(176, 79, 246, 0.4)'}
                      colorStop2={'rgba(255, 255, 255, 0)'}
                      dataKey="active"
                    />
                  </>
                }
                status={chartValue.pengguna}
                setStatusList={(val) => setChartValue({ ...chartValue, pengguna: val })}
                cardStyle={{ height: '16em' }}
              />
            </Grid>
            <Grid item xs={12}>
              <CardChart
                title="Demografis"
                tooltipPlacement="bottom"
                tooltipTitle="Jumlah pengguna aplikasi berdasarkan jenis kelamin & wilayah"
                content={
                  <Stack direction="row" flexWrap="nowrap" width="100%" paddingX={2}>
                    <Grid container style={{ maxWidth: '60%', rowGap: 10, borderRight: '1px solid rgba(0, 0, 0, 0.12)' }}>
                      <Grid item xs={6}>
                        <DemografisProgress location="Jakarta" value={1000} progress={15} background="#FF8C00" />
                      </Grid>
                      <Grid item xs={6}>
                        <DemografisProgress location="Bandung" value={1000} progress={15} background="#7F39FB" />
                      </Grid>
                      <Grid item xs={6}>
                        <DemografisProgress location="Bali" value={1000} progress={15} background="#03DAC5" />
                      </Grid>
                      <Grid item xs={6}>
                        <DemografisProgress location="Papua" value={1000} progress={15} background="#B457F6" />
                      </Grid>
                      <Grid item xs={6}>
                        <DemografisProgress location="Jawa Barat" value={1000} progress={15} background="#D72934" />
                      </Grid>
                      <Grid item xs={6}>
                        <DemografisProgress location="Lainnya" value={1850} progress={25} background="#5D9405" />
                      </Grid>
                    </Grid>
                    <Stack direction="column" alignItems="center" spacing={2}>
                      <PieChart width={400} height={160}>
                        <Pie data={gender} innerRadius={45} outerRadius={80} fill="#8884d8" dataKey="value">
                          {gender.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip
                          labelStyle={{ color: 'black' }}
                          cursor={false}
                          content={(gender) => {
                            return (
                              gender.payload[0] && (
                                <Box
                                  style={{
                                    position: 'relative',
                                    borderRadius: 6,
                                    padding: '4px 12px',
                                    backgroundColor: 'rgba(0, 0, 0, 0.38)',
                                    color: '#FFFFFF',
                                    fontSize: 14,
                                  }}>
                                  {gender.payload[0].value} Orang
                                </Box>
                              )
                            );
                          }}
                        />
                      </PieChart>
                      <Stack direction="row" spacing={2}>
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <Box style={{ backgroundColor: '#AB22AF', width: 10, height: 10, borderRadius: 100 }} />
                          <Typography fontFamily="Lato" fontWeight="bold">
                            Wanita
                          </Typography>
                        </Stack>
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <Box style={{ backgroundColor: '#23036A', width: 10, height: 10, borderRadius: 100 }} />
                          <Typography fontFamily="Lato" fontWeight="bold">
                            Laki-laki
                          </Typography>
                        </Stack>
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <Box style={{ backgroundColor: '#0795F4', width: 10, height: 10, borderRadius: 100 }} />
                          <Typography fontFamily="Lato" fontWeight="bold">
                            Lainnya
                          </Typography>
                        </Stack>
                      </Stack>
                    </Stack>
                  </Stack>
                }
                status={chartValue.pengguna}
                setStatusList={(val) => setChartValue({ ...chartValue, pengguna: val })}
                cardStyle={{ height: '20em' }}
              />
            </Grid>
            <Grid item xs={12}>
              {/*  NOTED : the heck is happend, i cant make it modular, 
              when i export the component the error is 'main is undefined' seriously i dont know why */}
              {/* please give it a try */}
              {/* <SesiGraph /> */}
              <CardChart
                title="Rata-rata Sesi Pengguna"
                tooltipPlacement="bottom"
                tooltipTitle="Akumulasi waktu aktivitas pengguna yang masuk ke dalam aplikasi dalam satu sesi kunjungan termasuk saat pengguna berpindah-pindah halaman hingga pengguna menutup aplikasi "
                content={
                  <ResponsiveContainer width="100%" height={320}>
                    <AreaChart data={data} syncId="anyId" margin={{ top: 20, right: 50, bottom: 40 }}>
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
                        dataKey="timeSpend"
                        type="monotone"
                        strokeWidth={2}
                        stackId="2"
                        stroke="rgba(171, 34, 175, 1)"
                        fill="url(#color18)"
                        fillOpacity={1}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                }
                status={chartValue.pengguna}
                setStatusList={(val) => setChartValue({ ...chartValue, pengguna: val })}
                cardStyle={{ height: '26em' }}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={12}>
              <CardChart
                title="Interaksi"
                tooltipPlacement="bottom"
                tooltipTitle="Aktivitas pengguna ketika menggunakan fitur di aplikasi yang dapat ditampilkan berdasarkan kurun waktu tertentu"
                content={
                  <Stack padding={2}>
                    <EngagementGraph />
                  </Stack>
                }
                status={chartValue.pengguna}
                setStatusList={(val) => setChartValue({ ...chartValue, pengguna: val })}
                cardStyle={{ height: '20em' }}
              />
            </Grid>

            <Grid item xs={12} sm={8} md={7}>
              <ComingSoon
                title="Performa"
                tooltipTitle="Mendeteksi performa aplikasi meliputi rata-rata pengunjung maupun upaya dalam mendapatkan pengguna baru dalam kurun waktu tertentu"
              />
            </Grid>
            <Grid item xs={12} sm={4} md={5}>
              <ComingSoon
                title="Statik Store"
                tooltipTitle="Data penambahan dan pengurangan pengguna berdasarkan sistem operasi yang digunakan pengguna"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <ComingSoon
                title="Lalu Lintas"
                tooltipTitle="Data pencarian aplikasi Hyppe melalui pencarian di Google Playstore/App Store maupun kode referra"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <ComingSoon
                title="Kepuasaan Pelanggan"
                tooltipTitle="Kumpulan review dan rating dari pengguna yang berasal dari aplikasi Hyppe, Google Playstore, App Store maupun website Hyppe"
              />
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
