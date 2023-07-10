import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';
import { Box, Card, Grid, IconButton, InputAdornment, Popover, Stack, TextField } from '@mui/material';
import React, { useState } from 'react';
import CardItem from './CardItem';
import { useGetDashboardAdsSettingQuery } from 'api/console/ads';
import dayjs from 'dayjs';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';
import { Typography } from '@material-ui/core';
import { DateRange, RemoveCircleOutline } from '@material-ui/icons';
import ModalChooseDate from './ModalChooseDate';

const AdsSettingDashboard = () => {
  const [payload, setPayload] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);
  const [isDate, setDate] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const { data: dashboardData, isFetching: loadingData } = useGetDashboardAdsSettingQuery({
    start_date: isDate ? dayjs(payload[0]?.startDate).format('YYYY-MM-DD') : undefined,
    end_date: isDate ? dayjs(payload[0]?.endDate).format('YYYY-MM-DD') : undefined,
  });

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <PageContainer>
      <Stack direction="row" justifyContent="flex-end" alignItems="center" mb={4} mt="-76px">
        <Stack direction="row" alignItems="center" spacing={1}>
          <TextField
            value={
              isDate
                ? `${dayjs(payload[0]?.startDate).format('DD/MM/YYYY')} - ${dayjs(payload[0]?.endDate).format('DD/MM/YYYY')}`
                : ''
            }
            placeholder="Pilih Tanggal"
            autoComplete="off"
            color="secondary"
            size="small"
            onClick={handleClick}
            sx={{ input: { height: 30 } }}
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
                setPayload([
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

        <ModalChooseDate
          open={open}
          dataPayload={payload}
          onClose={handleClose}
          onSubmit={(val) => {
            setPayload(val);
            setDate(true);
            setAnchorEl(null);
          }}
        />
      </Stack>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <CardItem
            isLoading={loadingData}
            title="Jumlah Pengiklan"
            type="pengiklan"
            pengiklan={dashboardData?.[0]?.totalAdvertisers || 0}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <CardItem
            isLoading={loadingData}
            title="Jumlah Iklan"
            type="iklan"
            totalData={dashboardData?.[0]?.totalAds || 0}
            data={dashboardData?.[0]?.statusAds}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <CardItem
            isLoading={loadingData}
            title="Jumlah Pendapatan"
            type="pendapatan"
            pendapatan={dashboardData?.[0]?.totalIncome || 0}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <CardItem isLoading={loadingData} title="Tipe Iklan Populer" type="progress" data={dashboardData?.[0]?.adsType} />
        </Grid>
        <Grid item xs={12} md={4}>
          <CardItem
            isLoading={loadingData}
            title="Tujuan Iklan Populer"
            type="progress"
            data={dashboardData?.[0]?.adsObjectivitas}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <CardItem
            isLoading={loadingData}
            title="Tayangan Populer"
            type="progress"
            data={dashboardData?.[0]?.adsPlanShows}
          />
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default AdsSettingDashboard;
