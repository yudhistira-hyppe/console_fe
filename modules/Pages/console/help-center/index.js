import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Grid, Typography } from '@material-ui/core';
import GridContainer from '@jumbo/components/GridContainer';
import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';
import CardWithIndicator from './CardWithIndicator';
import AccountReport from './AccountReport';
import ContentReport from './ContentReport';
import AdsReport from './adsReport';
import { useGetCountingHelpCenterQuery } from 'api/console/helpCenter/ticket';
import { Card, IconButton, Stack, TextField } from '@mui/material';
import { DateRangePicker, LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Delete } from '@material-ui/icons';

const sample4Data = [
  { _id: 'BARU', persen: 3, myCount: 4, warna: '#E31D41' },
  { _id: 'DITANGGUHKAN', persen: 86, myCount: 61, warna: '#8DCD03' },
  { _id: 'TIDAK DITANGGUHKAN', persen: 10, myCount: 7, warna: '#FF8800' },
  { _id: 'DITANDAI SENSITIF', persen: 1, myCount: 2, warna: '#7C7C7C' },
];

const ConsoleHelpCenterComponent = () => {
  const router = useRouter();
  const [filter, setFilter] = useState([null, null]);
  const [deleteRefresh, setDeleteRefresh] = useState(false);

  const { data: reportCount, isFetching } = useGetCountingHelpCenterQuery({
    startdate: filter[0] || undefined,
    enddate: filter[1] || undefined,
  });

  useEffect(() => {
    setDeleteRefresh(true);
    setTimeout(() => setDeleteRefresh(false), 50);
  }, [reportCount]);

  return (
    <>
      <Head>
        <title key="title">Hyppe-Console :: Pusat Bantuan</title>
      </Head>
      <PageContainer>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={4} mt="-25px">
          <Typography style={{ fontSize: 20, fontWeight: 'bold' }}>Bantuan Pengguna</Typography>
          <Card style={{ padding: 10 }}>
            <Stack direction="row" alignItems="center" gap="8px">
              <LocalizationProvider dateAdapter={AdapterDayjs} localeText={{ start: 'Start Date', end: 'End Date' }}>
                <DateRangePicker
                  value={filter}
                  onChange={(newValue) => {
                    setFilter([newValue[0]?.format('YYYY-MM-DD'), newValue[1]?.format('YYYY-MM-DD') || null]);
                  }}
                  renderInput={(startProps, endProps) => (
                    <>
                      <Stack direction={'row'} spacing={1}>
                        <TextField
                          size="small"
                          autoComplete="off"
                          color="secondary"
                          style={{ maxWidth: 150 }}
                          {...startProps}
                        />
                        <TextField
                          size="small"
                          autoComplete="off"
                          color="secondary"
                          style={{ maxWidth: 150 }}
                          {...endProps}
                        />
                      </Stack>
                    </>
                  )}
                />
              </LocalizationProvider>
              <IconButton color="secondary" onClick={() => setFilter([null, null])}>
                <Delete />
              </IconButton>
            </Stack>
          </Card>
        </Stack>

        <GridContainer>
          <Grid item xs={12} sm={4}>
            <CardWithIndicator
              headTitle="Bantuan Pengguna"
              TypeProblem="Total Masalah"
              numberOfProblem={reportCount?.userticket?.ticket[0]?.totalReport || 0}
              data={reportCount?.userticket?.ticket[0]?.data}
              onClick={() => router.push('/help-center/bantuan-pengguna')}
              status={'hue'}
              setStatusList={() => {}}
              isFetching={isFetching || deleteRefresh}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CardWithIndicator
              headTitle="Permohonan Akun Premium"
              TypeProblem="Total Permohonan"
              numberOfProblem={70 || 0}
              data={sample4Data}
              onClick={() => router.push('/help-center/permohonan-premium')}
              status={'hue'}
              setStatusList={() => {}}
              isFetching={isFetching || deleteRefresh}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CardWithIndicator
              headTitle="Rekening Bank"
              TypeProblem="Total Permohonan"
              numberOfProblem={70 || 0}
              data={sample4Data}
              onClick={() => router.push('/help-center/rekening-bank')}
              status={'hue'}
              setStatusList={() => {}}
              isFetching={isFetching || deleteRefresh}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <CardWithIndicator
              headTitle="Laporan Konten"
              TypeProblem="Konten Dilaporkan"
              numberOfProblem={reportCount?.content?.report[0]?.totalReport || 0}
              data={reportCount?.content?.report[0]?.data}
              pathIconLeft={'/images/icons/img-empty.svg'}
              onClick={() => router.push('/help-center/pelaporan-konten')}
              status={'hue'}
              setStatusList={() => {}}
              isFetching={isFetching || deleteRefresh}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CardWithIndicator
              headTitle="Banding Konten"
              TypeProblem="Permohonan Banding"
              numberOfProblem={reportCount?.content?.appeal[0]?.totalReport || 0}
              data={reportCount?.content?.appeal[0]?.data || []}
              pathIconLeft={'/images/icons/banding-konten.svg'}
              onClick={() => router.push('/help-center/banding-konten')}
              status={'hue'}
              setStatusList={() => {}}
              isFetching={isFetching || deleteRefresh}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CardWithIndicator
              headTitle="Fingerprint Combat"
              TypeProblem="Konten Serupa"
              numberOfProblem={25 || 0}
              data={sample4Data}
              pathIconLeft={'/images/icons/banding-konten.svg'}
              onClick={() => router.push('/help-center/konten-serupa')}
              status={'hue'}
              setStatusList={() => {}}
              isFetching={isFetching || deleteRefresh}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <CardWithIndicator
              headTitle="Laporan Iklan"
              TypeProblem="Iklan Dilaporkan"
              numberOfProblem={reportCount?.ads?.report[0]?.totalReport || 0}
              data={reportCount?.ads?.report[0]?.data}
              pathIconLeft={'/images/icons/ads-icon.svg'}
              onClick={() => router.push('/help-center/pelaporan-iklan')}
              status={'hue'}
              setStatusList={() => {}}
              isFetching={isFetching || deleteRefresh}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CardWithIndicator
              headTitle="Banding Iklan Moderasi"
              TypeProblem="Permohonan Banding"
              numberOfProblem={reportCount?.ads?.appeal[0]?.totalReport || 0}
              data={reportCount?.ads?.appeal[0]?.data}
              pathIconLeft={'/images/icons/ads-banding.svg'}
              onClick={() => router.push('/help-center/banding-iklan')}
              status={'hue'}
              setStatusList={() => {}}
              isFetching={isFetching || deleteRefresh}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <CardWithIndicator
              headTitle="Laporan Akun"
              TypeProblem="Akun Dilaporkan"
              numberOfProblem={200 || 0}
              data={sample4Data}
              pathIconLeft={'/images/icons/users.svg'}
              onClick={() => router.push('/help-center/pelaporan-akun')}
              status={'hue'}
              setStatusList={() => {}}
              isFetching={isFetching || deleteRefresh}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CardWithIndicator
              headTitle="Banding Akun Moderasi"
              TypeProblem="Permohonan"
              numberOfProblem={25 || 0}
              data={sample4Data}
              pathIconLeft={'/images/icons/users-banding.svg'}
              onClick={() => router.push('/help-center/banding-akun')}
              status={'hue'}
              setStatusList={() => {}}
              isFetching={isFetching || deleteRefresh}
            />
          </Grid>

          {/* --------- card section 2 (without indicator) --------------------*/}
          <Grid item xs={12} md={4} sm={4}>
            <AccountReport />
          </Grid>
          <Grid item xs={12} md={4} sm={4}>
            <ContentReport />
          </Grid>
          <Grid item xs={12} md={4} sm={4}>
            <AdsReport />
          </Grid>
        </GridContainer>
      </PageContainer>
    </>
  );
};

export default ConsoleHelpCenterComponent;
