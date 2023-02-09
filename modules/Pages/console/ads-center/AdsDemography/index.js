import React, { useState } from 'react';
import { Cell, Pie, PieChart, Tooltip } from 'recharts';
import { Card, Grid } from '@material-ui/core';
import { Typography, Stack, MenuItem, Select, Box, CircularProgress } from '@mui/material';
import { GraphIndicator } from '../../help-center/components';
import { ButtonPopper, BulletsText } from '../components';
import { makeStyles } from '@material-ui/styles';
import moment from 'moment';
import { useGetDemographicAdsQuery } from 'api/console/ads';
import ScrollBar from 'react-perfect-scrollbar';
import CmtProgressBar from '@coremat/CmtProgressBar';

const data = [
  { name: 'Perempuan', color: '#AB22AF' },
  { name: 'Laki-laki', color: '#23036A' },
  { name: 'Tidak Diketahui', color: '#0795F4' },
];

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    height: '100%',
    padding: 28,
  },
  borderRightBox: {
    borderRight: 'solid 0.9px rgba(0, 0, 0, 0.12)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  bullets: {
    width: '0.6em',
    height: '0.6em',
    borderRadius: '100px',
  },
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
  tooltip: {
    position: 'relative',
    borderRadius: 6,
    padding: '4px 12px',
    backgroundColor: 'rgb(157 143 167)',
    color: theme.palette.common.white,
  },
}));

const ProgressIndicator = (props) => {
  const { item, ...rest } = props;

  return (
    <Box width={1} {...rest}>
      <CmtProgressBar
        label={
          <Box display="flex" alignItems="center">
            {item._id === 'other' || item._id === 'OTHER'
              ? 'Lainnya'
              : item._id === 'FEMALE'
              ? 'Perempuan'
              : item._id === 'MALE'
              ? 'Laki-laki'
              : item._id}
          </Box>
        }
        labelPos="top-left"
        value={item.persentase}
        renderValue={(value) => {
          return `${value}%`;
        }}
        containedColor="#AB22AF"
        onlyContained
      />
    </Box>
  );
};

const AdsDemographyComponent = () => {
  const classes = useStyles();
  const [payload, setPayload] = useState({
    startdate: moment().subtract(6, 'day').format('YYYY-MM-DD'),
    enddate: moment().format('YYYY-MM-DD'),
  });

  const handlePayload = (value) => {
    setPayload({ ...payload, startdate: moment().subtract(value, 'day').format('YYYY-MM-DD') });
  };

  const { data: adsDemographic, isFetching: loadingDemographic } = useGetDemographicAdsQuery(payload);

  return (
    <Card className={classes.mainContainer}>
      <Stack direction="row" justifyContent="space-between">
        <Typography fontFamily="Lato" fontWeight="bold">
          Demografis
        </Typography>
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

      <Grid container style={{ marginTop: 15 }}>
        <Grid item sm={12} md={12} lg={7} xl={7} className={classes.borderRightBox}>
          {loadingDemographic ? (
            <Stack direction="column" alignItems="center" justifyContent="center" height={230} spacing={2}>
              <CircularProgress color="secondary" size={28} />
            </Stack>
          ) : (
            <ScrollBar style={{ height: 230 }}>
              <Grid container>
                {adsDemographic?.data?.daerah?.map((item, key) => (
                  <Grid item xs={12} md={12} lg={6} xl={6}>
                    <ProgressIndicator item={item} />
                  </Grid>
                ))}
              </Grid>
            </ScrollBar>
          )}
        </Grid>

        <Grid item sm={12} md={12} lg={5} xl={5}>
          <PieChart height={180} width={260} margin={{ top: 20, left: 60 }}>
            <Pie data={adsDemographic?.data?.gender} innerRadius={48} outerRadius={80} paddingAngle={2} dataKey="total">
              {adsDemographic?.data?.gender?.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry._id === 'MALE' ? '#23036A' : entry._id === 'FEMALE' ? '#AB22AF' : '#0795F4'}
                />
              ))}
            </Pie>
            <Tooltip
              labelStyle={{ color: 'black' }}
              wrapperStyle={{ zIndex: 100 }}
              cursor={false}
              content={(data) => {
                return data.payload?.[0] ? (
                  <Box className={classes.tooltip}>
                    {data.payload?.[0]?.payload?._id === 'MALE'
                      ? 'Laki-laki'
                      : data.payload?.[0]?.payload?._id === 'FEMALE'
                      ? 'Perempuan'
                      : 'Tidak Diketahui'}{' '}
                    : {data.payload?.[0]?.payload?.total}
                  </Box>
                ) : null;
              }}
            />
          </PieChart>

          <Stack direction="row" justifyContent={'center'} spacing={2} mt={3}>
            {Array.isArray(data) &&
              data.map((el, idx) => {
                return <BulletsText key={idx} title={el.name} color={el.color} />;
              })}
          </Stack>
        </Grid>
      </Grid>
    </Card>
  );
};

export default AdsDemographyComponent;
