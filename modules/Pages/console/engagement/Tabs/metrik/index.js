import React, { useState } from 'react';
import { AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Area, PieChart, Pie, Cell } from 'recharts';
import { Grid } from '@material-ui/core';
import EngagementGraph from '../../engagementGraph';
import CardChart from '../../CardChart';
import UserActiveGraph from '../../CardChart/GraphicChart';
import numberWithCommas from 'modules/Components/CommonComponent/NumberWithCommas/NumberWithCommas';
import { Box, LinearProgress, Stack, Typography, Tooltip as TooltipMui } from '@mui/material';
import CmtAdvCard from '@coremat/CmtAdvCard';
import PenggunaBaru from '../../PenggunaBaru';
import PenggunaAktif from '../../PenggunaAktif';
import DemographyUser from '../../DemographyUser';
import SesiGraph from '../../Sesi';

const Metrik = () => {
  const [chartValue, setChartValue] = useState({
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

  return (
    <Grid container spacing={5}>
      <Grid item xs={12} sm={6} md={6}>
        <PenggunaBaru />
      </Grid>
      <Grid item xs={12} sm={6} md={6}>
        <PenggunaAktif />
      </Grid>
      <Grid item xs={12}>
        <CardChart
          title="Demografis"
          tooltipPlacement="bottom"
          tooltipTitle="Jumlah pengguna aplikasi berdasarkan jenis kelamin & wilayah"
          content={<DemographyUser />}
          status={chartValue.pengguna}
          setStatusList={(val) => setChartValue({ ...chartValue, pengguna: val })}
        />
      </Grid>
      <Grid item xs={12}>
        <CardChart
          title="Rata-rata Sesi Pengguna"
          tooltipPlacement="bottom"
          tooltipTitle="Akumulasi waktu aktivitas pengguna yang masuk ke dalam aplikasi dalam satu sesi kunjungan termasuk saat pengguna berpindah-pindah halaman hingga pengguna menutup aplikasi "
          content={<SesiGraph />}
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
  );
};

export default Metrik;
