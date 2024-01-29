import { DateRange, RemoveCircleOutline } from '@material-ui/icons';
import { Grid, IconButton, InputAdornment, Stack, TextField } from '@mui/material';
import { useGetDetailAdsQuery, useGetSummaryDetailAdsQuery } from 'api/console/ads';
import dayjs from 'dayjs';
import ModalChooseDate from 'modules/Pages/console/ads-center/setting/tab/dashboard/ModalChooseDate';
import React, { useEffect, useState } from 'react';
import CardContent from './CardContent';
import CardSummary from '../../../../dashboard/CardSummary';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';
import CardStatus from './CardStatus';
import CardItem from './CardItem';

const DetailAdsContentComponent = ({ idAds }) => {
  const [payload, setPayload] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);
  const [isDate, setDate] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const { data: details, isFetching: loadingDetail } = useGetDetailAdsQuery({ adsId: idAds });
  const { data: summary, isFetching: loadingSummary } = useGetSummaryDetailAdsQuery({
    start_date: isDate ? dayjs(payload[0]?.startDate).format('YYYY-MM-DD') : dayjs().subtract(6, 'day').format('YYYY-MM-DD'),
    end_date: isDate ? dayjs(payload[0]?.endDate).format('YYYY-MM-DD') : dayjs().format('YYYY-MM-DD'),
    adsId: idAds,
  });

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <Stack direction="column">
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

      {loadingDetail ? (
        <PageLoader />
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <CardContent details={details?.data} />
          </Grid>
          <Grid item xs={12} md={4}>
            <CardStatus details={details?.data} />
          </Grid>
          <Grid item xs={12}>
            <CardSummary
              isLoading={loadingSummary}
              totalCTA={summary?.data?.summary?.TotalCTA || 0}
              totalImpresi={summary?.data?.summary?.Totalimpresi || 0}
              totalJangkauan={summary?.data?.summary?.Totalreach || 0}
              dataCTA={summary?.data?.summary?.CTA || []}
              dataImpresi={summary?.data?.summary?.impresi || []}
              dataJangkauan={summary?.data?.summary?.reach || []}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <CardItem
              title="Impresi"
              type="number"
              description="Total Impresi"
              amount={summary?.data?.summary?.Totalimpresi || 0}
              isLoading={loadingSummary}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <CardItem
              title="Jangkauan"
              type="number"
              description="Total Jangkauan"
              amount={summary?.data?.summary?.Totalreach || 0}
              isLoading={loadingSummary}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <CardItem
              title="Call To Action (CTA)"
              type="number"
              description="Total Iklan Diklik"
              amount={summary?.data?.summary?.TotalCTA || 0}
              isLoading={loadingSummary}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <CardItem
              title="Click Through Rate (CTR)"
              type="number"
              description="Total Rasio Iklan"
              amount={summary?.data?.summary?.CTR}
              isLoading={loadingSummary}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <CardItem
              title="Kredit Iklan"
              description="Total Penggunaan Kredit Iklan"
              type="number"
              size="big"
              height={300}
              amount={summary?.data?.saldoKredit || 0}
              isLoading={loadingSummary}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <CardItem
              title="Rentang Umur"
              type="progress"
              size="big"
              height={300}
              data={summary?.data?.userAdsAge || []}
              isLoading={loadingSummary}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <CardItem
              title="Jenis Kelamin"
              type="pie"
              size="big"
              height={300}
              data={summary?.data?.userAdsGender || []}
              isLoading={loadingSummary}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <CardItem
              title="Wilayah"
              type="progress"
              size="big"
              column={2}
              height={230}
              data={summary?.data?.userAdsArea || []}
              isLoading={loadingSummary}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <CardItem
              title="Minat"
              type="progress"
              size="big"
              column={2}
              height={230}
              data={summary?.data?.userAdsInterest || []}
              isLoading={loadingSummary}
            />
          </Grid>
        </Grid>
      )}
    </Stack>
  );
};

export default DetailAdsContentComponent;
