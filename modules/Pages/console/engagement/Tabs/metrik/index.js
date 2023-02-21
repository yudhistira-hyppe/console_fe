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
        />
      </Grid>
      <Grid item xs={12}>
        <CardChart
          title="Rata-rata Sesi Pengguna"
          tooltipPlacement="bottom"
          tooltipTitle="Akumulasi waktu aktivitas pengguna yang masuk ke dalam aplikasi dalam satu sesi kunjungan termasuk saat pengguna berpindah-pindah halaman hingga pengguna menutup aplikasi "
          content={<SesiGraph />}
          cardStyle={{height: '28em'}}
        />
      </Grid>

      <Grid item xs={12} sm={12} md={12}>
        <CardChart
          title="Interaksi"
          tooltipPlacement="bottom"
          tooltipTitle="Aktivitas pengguna ketika menggunakan fitur di aplikasi yang dapat ditampilkan berdasarkan kurun waktu tertentu"
          content={<EngagementGraph />}
        />
      </Grid>

      <Grid item xs={12} sm={8} md={7}>
        <CardChart
          title="Performa"
          tooltipPlacement="bottom"
          tooltipTitle="Mendeteksi performa aplikasi meliputi rata-rata pengunjung maupun upaya dalam mendapatkan pengguna baru dalam kurun waktu tertentu"
          content={
            <Stack direction="column" alignItems="center" justifyContent="center" spacing={3} padding={2} height={300}>
              <img src="/images/icon-comming-soon.png" alt="doesnt render" style={{ width: 50, height: 50 }} />
              <Typography fontFamily="Lato" fontSize={14} color="#666666" fontWeight="bold">
                Akan datang
              </Typography>
            </Stack>
          }
        />
      </Grid>
      <Grid item xs={12} sm={4} md={5}>
        <CardChart
          title="Statik Store"
          tooltipPlacement="bottom"
          tooltipTitle="Data penambahan dan pengurangan pengguna berdasarkan sistem operasi yang digunakan pengguna"
          content={
            <Stack direction="column" alignItems="center" justifyContent="center" spacing={3} padding={2} height={300}>
              <img src="/images/icon-comming-soon.png" alt="doesnt render" style={{ width: 50, height: 50 }} />
              <Typography fontFamily="Lato" fontSize={14} color="#666666" fontWeight="bold">
                Akan datang
              </Typography>
            </Stack>
          }
        />
      </Grid>
      <Grid item xs={12} sm={12} md={12}>
        <CardChart
          title="Lalu Lintas"
          tooltipPlacement="bottom"
          tooltipTitle="Data pencarian aplikasi Hyppe melalui pencarian di Google Playstore/App Store maupun kode referra"
          content={
            <Stack direction="column" alignItems="center" justifyContent="center" spacing={3} padding={2} height={300}>
              <img src="/images/icon-comming-soon.png" alt="doesnt render" style={{ width: 50, height: 50 }} />
              <Typography fontFamily="Lato" fontSize={14} color="#666666" fontWeight="bold">
                Akan datang
              </Typography>
            </Stack>
          }
        />
      </Grid>
      <Grid item xs={12} sm={12} md={12}>
        <CardChart
          title="Kepuasaan Pelanggan"
          tooltipPlacement="bottom"
          tooltipTitle="Kumpulan review dan rating dari pengguna yang berasal dari aplikasi Hyppe, Google Playstore, App Store maupun website Hyppe"
          content={
            <Stack direction="column" alignItems="center" justifyContent="center" spacing={3} padding={2} height={300}>
              <img src="/images/icon-comming-soon.png" alt="doesnt render" style={{ width: 50, height: 50 }} />
              <Typography fontFamily="Lato" fontSize={14} color="#666666" fontWeight="bold">
                Akan datang
              </Typography>
            </Stack>
          }
        />
      </Grid>
    </Grid>
  );
};

export default Metrik;
