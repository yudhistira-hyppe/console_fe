import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, Grid, MenuItem, Select, Stack, Typography } from '@mui/material';
import ScrollBar from 'react-perfect-scrollbar';
import CmtProgressBar from '@coremat/CmtProgressBar';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { BulletsText } from '../../ads-center/components';
import { makeStyles } from '@material-ui/styles';
import moment from 'moment';
import { useGetDemographyUserQuery } from 'api/console/engagement';

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
            {item.stateName === 'Other'
              ? 'Lainnya'
              : item.stateName === 'FEMALE'
              ? 'Perempuan'
              : item.stateName === 'MALE'
              ? 'Laki-laki'
              : item.stateName}
          </Box>
        }
        labelPos="top-left"
        value={item.persen}
        renderValue={(value) => {
          return `${value}%`;
        }}
        containedColor="#AB22AF"
        onlyContained
      />
    </Box>
  );
};

const DemographyUser = ({ dataPengguna }) => {
  const classes = useStyles();
  const [payload, setPayload] = useState({
    startdate: moment().subtract(6, 'day').format('YYYY-MM-DD'),
    enddate: moment().format('YYYY-MM-DD'),
  });
  const [diff, setDiff] = useState(0);

  const handlePayload = (value) => {
    setPayload({ ...payload, startdate: moment().subtract(value, 'day').format('YYYY-MM-DD') });
  };

  const { data: demographyUser, isFetching: loadingDemographic, refetch } = useGetDemographyUserQuery(payload);

  // useEffect(() => {
  //   setPayload({ ...payload, startdate: dataPengguna?.date });
  // }, [dataPengguna]);

  // useEffect(() => {
  //   if (!loadingDemographic) {
  //     if (payload?.startdate !== dataPengguna?.date) {
  //       setDiff(0);
  //     } else {
  //       setDiff(
  //         (
  //           (dataPengguna?.total -
  //             (demographyUser?.data?.[0]?.gender?.length >= 1
  //               ? demographyUser?.data?.[0]?.gender?.map((item) => item?.count * 9)?.reduce((a, b) => a + b)
  //               : 0)) /
  //           3
  //         ).toFixed(0),
  //       );
  //     }
  //   }
  // }, [loadingDemographic]);

  return (
    <>
      <Select
        defaultValue={6}
        className={classes.dateSelect}
        color="secondary"
        onChange={(e) => handlePayload(e.target.value)}
        style={{ position: 'absolute', top: 16, right: 24 }}>
        <MenuItem value={6}>7 Hari</MenuItem>
        <MenuItem value={13}>14 Hari</MenuItem>
        <MenuItem value={29}>30 Hari</MenuItem>
        <MenuItem value={89}>90 Hari</MenuItem>
      </Select>
      <Grid container style={{ padding: '10px 0' }}>
        <Grid item sm={12} md={12} lg={7} xl={7} className={classes.borderRightBox}>
          {loadingDemographic ? (
            <Stack direction="column" alignItems="center" justifyContent="center" height={230} spacing={2}>
              <CircularProgress color="secondary" size={28} />
            </Stack>
          ) : demographyUser?.data[0]?.wilayah?.length >= 1 ? (
            <ScrollBar style={{ height: 230, width: '100%', paddingRight: 15 }}>
              <Grid container columnSpacing={2}>
                {demographyUser?.data[0]?.wilayah?.map((item, key) => (
                  <Grid item xs={12} md={12} lg={6} xl={6}>
                    <ProgressIndicator item={item} />
                  </Grid>
                ))}
              </Grid>
            </ScrollBar>
          ) : (
            <Stack direction="column" alignItems="center" justifyContent="center" gap={2}>
              <img src="/images/icon-media-empty.png" style={{ width: 60, height: 60 }} />
              <Typography fontFamily="Lato" color="#666666" fontWeight="bold" fontSize={14}>
                Tidak ada data.
              </Typography>
            </Stack>
          )}
        </Grid>

        <Grid item sm={12} md={12} lg={5} xl={5}>
          {loadingDemographic ? (
            <Stack direction="column" alignItems="center" justifyContent="center" height={180} spacing={2}>
              <CircularProgress color="secondary" size={28} />
            </Stack>
          ) : demographyUser?.data[0]?.gender?.map((item) => item.count)?.reduce((a, b) => a + b, 0) >= 1 ? (
            <ResponsiveContainer width="100%" height={180}>
              <PieChart margin={{ top: 20, left: 0 }}>
                <Pie
                  data={demographyUser?.data[0]?.gender}
                  innerRadius={48}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="count">
                  {demographyUser?.data[0]?.gender?.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.gender === 'MALE' ? '#23036A' : entry.gender === 'FEMALE' ? '#AB22AF' : '#0795F4'}
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
                        {data.payload?.[0]?.payload?.gender === 'MALE'
                          ? 'Laki-laki'
                          : data.payload?.[0]?.payload?.gender === 'FEMALE'
                          ? 'Perempuan'
                          : 'Tidak Diketahui'}{' '}
                        : {data.payload?.[0]?.payload?.count + Number(diff)}
                      </Box>
                    ) : null;
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <Stack direction="column" alignItems="center" justifyContent="center" gap={2} height={180}>
              <img src="/images/icon-media-empty.png" style={{ width: 60, height: 60 }} />
              <Typography fontFamily="Lato" color="#666666" fontWeight="bold" fontSize={14}>
                Tidak ada data.
              </Typography>
            </Stack>
          )}

          <Stack direction="row" justifyContent={'center'} spacing={2} mt={3}>
            {Array.isArray(data) &&
              data.map((el, idx) => {
                return <BulletsText key={idx} title={el.name} color={el.color} />;
              })}
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

export default DemographyUser;
