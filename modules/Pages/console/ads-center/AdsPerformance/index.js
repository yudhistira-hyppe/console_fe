import React, { useState } from 'react';
import { Card, Typography } from '@material-ui/core';
import { BulletsText } from '../components';
import { CircularProgress, MenuItem, Select, Stack } from '@mui/material';
import { makeStyles } from '@material-ui/styles';
import moment from 'moment';
import { useGetPerformanceAdsQuery } from 'api/console/ads';
import numberWithCommas from 'modules/Components/CommonComponent/NumberWithCommas/NumberWithCommas';
import AdsGraph from './adsGraph';

const useStyles = makeStyles(() => ({
  dateSelect: {
    '& .MuiSelect-select': {
      padding: '2px 10px',
      fontSize: 12,
    },
    '& .MuiSvgIcon-root': {
      width: 18,
      height: 18,
      top: 5,
    },
  },
}));

const AdsPerformaceComponents = () => {
  const classes = useStyles();
  const [payload, setPayload] = useState({
    startdate: moment().subtract(6, 'day').format('YYYY-MM-DD'),
    enddate: moment().format('YYYY-MM-DD'),
  });

  const handlePayload = (value) => {
    setPayload({ ...payload, startdate: moment().subtract(value, 'day').format('YYYY-MM-DD') });
  };

  const { data: adsPerformance, isFetching: loadingPerformance } = useGetPerformanceAdsQuery(payload);

  return (
    <Card style={{ height: '100%', paddingTop: 28 }}>
      <Stack direction="column" height="100%">
        <Stack direction="row" justifyContent="space-between" px="28px">
          <Typography style={{ fontWeight: 'bold' }}>Performa Iklan</Typography>
          <Select
            defaultValue={6}
            className={classes.dateSelect}
            color="secondary"
            onChange={(e) => handlePayload(e.target.value)}>
            <MenuItem value={6}>7 Hari</MenuItem>
            <MenuItem value={13}>14 Hari</MenuItem>
            <MenuItem value={29}>30 Hari</MenuItem>
            <MenuItem value={89}>90 Hari</MenuItem>
          </Select>
        </Stack>

        <Stack direction="column" mt={1} px="28px">
          <Typography style={{ fontSize: 20, fontWeight: 'bold' }}>{numberWithCommas(10000)}</Typography>
          <Typography style={{ fontWeight: 'bold', fontSize: 12 }}>Total Iklan</Typography>

          <Stack direction="row" spacing={2} mt={1}>
            <BulletsText title="Impresi" color="#AB22AF" />
            <BulletsText title="CTA" color="#455DD8" />
          </Stack>
        </Stack>

        {loadingPerformance ? (
          <Stack direction="column" alignItems="center" justifyContent="center" height="100%" spacing={2}>
            <CircularProgress color="secondary" size={28} />
          </Stack>
        ) : (
          <AdsGraph data={adsPerformance?.data?.data || []} />
        )}
      </Stack>
    </Card>
  );
};

export default AdsPerformaceComponents;
