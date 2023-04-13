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
import { Card, IconButton, InputAdornment, Popover, Stack, TextField } from '@mui/material';
import { DateRange as DateRangePicker } from 'react-date-range';
import { DateRange, RemoveCircleOutline } from '@material-ui/icons';
import moment from 'moment';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

const sample4Data = [
  { _id: 'BARU', persen: 3, myCount: 4, warna: '#E31D41' },
  { _id: 'DITANGGUHKAN', persen: 86, myCount: 61, warna: '#8DCD03' },
  { _id: 'TIDAK DITANGGUHKAN', persen: 10, myCount: 7, warna: '#FF8800' },
  { _id: 'DITANDAI SENSITIF', persen: 1, myCount: 2, warna: '#7C7C7C' },
];

const ConsoleHelpCenterComponent = () => {
  const router = useRouter();
  const [value, setValue] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);
  const [isDate, setDate] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [deleteRefresh, setDeleteRefresh] = useState(false);
  const access = localStorage.getItem('access') ? JSON.parse(localStorage.getItem('access')) : [];

  const { data: reportCount, isFetching } = useGetCountingHelpCenterQuery({
    startdate: isDate ? moment(value[0]?.startDate).format('YYYY-MM-DD') : undefined,
    enddate: isDate ? moment(value[0]?.endDate).format('YYYY-MM-DD') : undefined,
  });

  useEffect(() => {
    setDeleteRefresh(true);
    setTimeout(() => setDeleteRefresh(false), 50);
  }, [reportCount]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <>
      <Head>
        <title key="title">Hyppe-Console :: Pusat Bantuan</title>
      </Head>

      <PageContainer>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={4}>
          <Typography style={{ fontSize: 20, fontWeight: 'bold' }}>Bantuan Pengguna</Typography>
          <Card style={{ padding: 10 }}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <TextField
                value={
                  isDate
                    ? `${moment(value[0]?.startDate).format('DD/MM/YYYY')} - ${moment(value[0]?.endDate).format(
                        'DD/MM/YYYY',
                      )}`
                    : ''
                }
                placeholder="Pilih Tanggal"
                autoComplete="off"
                color="secondary"
                size="small"
                onClick={handleClick}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <DateRange />
                    </InputAdornment>
                  ),
                }}
              />
              {isDate && (
                <IconButton
                  style={{ height: 30, width: 30 }}
                  onClick={() => {
                    setValue([
                      {
                        startDate: new Date(),
                        endDate: new Date(),
                        key: 'selection',
                      },
                    ]);
                    setDate(false);
                  }}>
                  <RemoveCircleOutline color="primary" />
                </IconButton>
              )}
            </Stack>

            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}>
              <DateRangePicker
                onChange={(item) => {
                  setValue([item.selection]);
                  setDate(true);
                }}
                dragSelectionEnabled={false}
                moveRangeOnFirstSelection={false}
                editableDateInputs={true}
                ranges={value}
                direction="horizontal"
              />
            </Popover>
          </Card>
        </Stack>

        <GridContainer>
          <Grid item xs={12} sm={6} lg={4}>
            {access.map((item) => item?.nameModule).includes('help_consumer') ? (
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
            ) : (
              <Card style={{ height: '100%', padding: 16, display: 'flex', flexDirection: 'column' }}>
                <Typography style={{ fontWeight: 'bold' }}>Bantuan Pengguna</Typography>
                <Stack height="100%" alignItems="center" justifyContent="center">
                  Kamu tidak memiliki akses untuk fitur ini!
                </Stack>
              </Card>
            )}
          </Grid>
          <Grid item xs={12} sm={6} lg={4}>
            {access.map((item) => item?.nameModule).includes('help_kyc') ? (
              <CardWithIndicator
                headTitle="Permohonan Akun Premium"
                TypeProblem="Total Permohonan"
                numberOfProblem={reportCount?.kyc?.kyc[0]?.totalReport || 0}
                data={reportCount?.kyc?.kyc[0]?.data}
                onClick={() => router.push('/help-center/permohonan-premium')}
                status={'hue'}
                setStatusList={() => {}}
                isFetching={isFetching || deleteRefresh}
              />
            ) : (
              <Card style={{ height: '100%', padding: 16, display: 'flex', flexDirection: 'column' }}>
                <Typography style={{ fontWeight: 'bold' }}>Permohonan Akun Premium</Typography>
                <Stack height="100%" alignItems="center" justifyContent="center">
                  Kamu tidak memiliki akses untuk fitur ini!
                </Stack>
              </Card>
            )}
          </Grid>
          <Grid item xs={12} sm={6} lg={4}>
            {access.map((item) => item?.nameModule).includes('help_bank') ? (
              <CardWithIndicator
                headTitle="Rekening Bank"
                TypeProblem="Total Permohonan"
                numberOfProblem={reportCount?.appealAkunBank?.appealAkunBank[0]?.totalReport || 0}
                data={reportCount?.appealAkunBank?.appealAkunBank[0]?.data}
                onClick={() => router.push('/help-center/rekening-bank')}
                status={'hue'}
                setStatusList={() => {}}
                isFetching={isFetching || deleteRefresh}
              />
            ) : (
              <Card style={{ height: '100%', padding: 16, display: 'flex', flexDirection: 'column' }}>
                <Typography style={{ fontWeight: 'bold' }}>Rekening Bank</Typography>
                <Stack height="100%" alignItems="center" justifyContent="center">
                  Kamu tidak memiliki akses untuk fitur ini!
                </Stack>
              </Card>
            )}
          </Grid>

          <Grid item xs={12} sm={6} lg={4}>
            {access.map((item) => item?.nameModule).includes('help_konten') ? (
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
            ) : (
              <Card style={{ height: '100%', padding: 16, display: 'flex', flexDirection: 'column' }}>
                <Typography style={{ fontWeight: 'bold' }}>Laporan Konten</Typography>
                <Stack height="100%" alignItems="center" justifyContent="center">
                  Kamu tidak memiliki akses untuk fitur ini!
                </Stack>
              </Card>
            )}
          </Grid>
          <Grid item xs={12} sm={6} lg={4}>
            {access.map((item) => item?.nameModule).includes('help_appeal_konten') ? (
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
            ) : (
              <Card style={{ height: '100%', padding: 16, display: 'flex', flexDirection: 'column' }}>
                <Typography style={{ fontWeight: 'bold' }}>Banding Konten</Typography>
                <Stack height="100%" alignItems="center" justifyContent="center">
                  Kamu tidak memiliki akses untuk fitur ini!
                </Stack>
              </Card>
            )}
          </Grid>
          <Grid item xs={12} sm={6} lg={4}>
            {access.map((item) => item?.nameModule).includes('help_fingerprint') ? (
              <CardWithIndicator
                headTitle="Fingerprint Combat"
                TypeProblem="Konten Serupa"
                numberOfProblem={0}
                data={[]}
                pathIconLeft={'/images/icons/banding-konten.svg'}
                onClick={() => router.push('/help-center/konten-serupa')}
                status={'hue'}
                setStatusList={() => {}}
                isFetching={isFetching || deleteRefresh}
              />
            ) : (
              <Card style={{ height: '100%', padding: 16, display: 'flex', flexDirection: 'column' }}>
                <Typography style={{ fontWeight: 'bold' }}>Fingerprint Combat</Typography>
                <Stack height="100%" alignItems="center" justifyContent="center">
                  Kamu tidak memiliki akses untuk fitur ini!
                </Stack>
              </Card>
            )}
          </Grid>

          <Grid item xs={12} sm={6}>
            {access.map((item) => item?.nameModule).includes('help_ads') ? (
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
            ) : (
              <Card style={{ height: '100%', padding: 16, display: 'flex', flexDirection: 'column' }}>
                <Typography style={{ fontWeight: 'bold' }}>laporan Iklan</Typography>
                <Stack height="100%" alignItems="center" justifyContent="center">
                  Kamu tidak memiliki akses untuk fitur ini!
                </Stack>
              </Card>
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            {access.map((item) => item?.nameModule).includes('help_appeal_ads') ? (
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
            ) : (
              <Card style={{ height: '100%', padding: 16, display: 'flex', flexDirection: 'column' }}>
                <Typography style={{ fontWeight: 'bold' }}>Banding Iklan Moderasi</Typography>
                <Stack height="100%" alignItems="center" justifyContent="center">
                  Kamu tidak memiliki akses untuk fitur ini!
                </Stack>
              </Card>
            )}
          </Grid>

          <Grid item xs={12} sm={6}>
            {access.map((item) => item?.nameModule).includes('help_users') ? (
              <CardWithIndicator
                headTitle="Laporan Akun"
                TypeProblem="Akun Dilaporkan"
                numberOfProblem={0}
                data={[]}
                pathIconLeft={'/images/icons/users.svg'}
                onClick={() => router.push('/help-center/pelaporan-akun')}
                status={'hue'}
                setStatusList={() => {}}
                isFetching={isFetching || deleteRefresh}
              />
            ) : (
              <Card style={{ height: 315, padding: 16, display: 'flex', flexDirection: 'column' }}>
                <Typography style={{ fontWeight: 'bold' }}>Laporan Akun</Typography>
                <Stack height="100%" alignItems="center" justifyContent="center">
                  Kamu tidak memiliki akses untuk fitur ini!
                </Stack>
              </Card>
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            {access.map((item) => item?.nameModule).includes('help_appeal_users') ? (
              <CardWithIndicator
                headTitle="Banding Akun Moderasi"
                TypeProblem="Permohonan"
                numberOfProblem={0}
                data={[]}
                pathIconLeft={'/images/icons/users-banding.svg'}
                onClick={() => router.push('/help-center/banding-akun')}
                status={'hue'}
                setStatusList={() => {}}
                isFetching={isFetching || deleteRefresh}
              />
            ) : (
              <Card style={{ height: 315, padding: 16, display: 'flex', flexDirection: 'column' }}>
                <Typography style={{ fontWeight: 'bold' }}>Banding Akun Moderasi</Typography>
                <Stack height="100%" alignItems="center" justifyContent="center">
                  Kamu tidak memiliki akses untuk fitur ini!
                </Stack>
              </Card>
            )}
          </Grid>
        </GridContainer>
        <GridContainer style={{ marginTop: 12 }}>
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
