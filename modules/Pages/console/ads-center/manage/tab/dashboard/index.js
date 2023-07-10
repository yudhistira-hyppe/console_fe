import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';
import { DateRange, RemoveCircleOutline } from '@material-ui/icons';
import { Grid, IconButton, InputAdornment, Stack, TextField } from '@mui/material';
import dayjs from 'dayjs';
import React from 'react';
import { useState } from 'react';
import ModalChooseDate from '../../../setting/tab/dashboard/ModalChooseDate';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';
import CardCredit from './CardCredit';
import CardStatus from './CardStatus';
import { useGetDashboardAdsManageQuery } from 'api/console/ads';
import CardSummary from './CardSummary';

const AdsManageDashboard = () => {
  const [payload, setPayload] = useState([
    {
      startDate: dayjs().subtract(6, 'day').toDate(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);
  const [isDate, setDate] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const { data: dashboardData, isFetching: loadingData } = useGetDashboardAdsManageQuery({
    start_date: dayjs(payload[0]?.startDate).format('YYYY-MM-DD'),
    end_date: dayjs(payload[0]?.endDate).format('YYYY-MM-DD'),
  });

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  console.log(dashboardData);

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
          <CardCredit isLoading={loadingData} totalSaldo={dashboardData?.data?.saldoKredit || 0} />
        </Grid>
        <Grid item xs={12} md={8}>
          <CardStatus isLoading={loadingData} dataStatus={dashboardData?.data?.statusIklan || []} />
        </Grid>
        <Grid item xs={12}>
          <CardSummary
            isLoading={loadingData}
            totalCTA={dashboardData?.data?.TotalCTA || 0}
            totalImpresi={dashboardData?.data?.Totalimpresi || 0}
            totalJangkauan={dashboardData?.data?.Totalreach || 0}
            dataCTA={dashboardData?.data?.CTA || []}
            dataImpresi={dashboardData?.data?.impresi || []}
            dataJangkauan={dashboardData?.data?.reach || []}
          />
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default AdsManageDashboard;
