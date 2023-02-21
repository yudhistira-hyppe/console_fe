import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { CircularProgress, MenuItem, Select, Stack } from '@mui/material';
import { useGetTotalSemuaPendapatanQuery } from 'api/console/monetize/dashboard';
import numberWithCommas from 'modules/Components/CommonComponent/NumberWithCommas/NumberWithCommas';
import moment from 'moment';
import React, { useState } from 'react';

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

const TotalSemuaPendapatan = () => {
  const classes = useStyles();
  const [payload, setPayload] = useState({
    startdate: moment().subtract(6, 'day').format('YYYY-MM-DD'),
    enddate: moment().format('YYYY-MM-DD'),
  });

  const handlePayload = (value) => {
    setPayload({ ...payload, startdate: moment().subtract(value, 'day').format('YYYY-MM-DD') });
  };

  const { data: totalPendapatan, isFetching: loadingPendapatan } = useGetTotalSemuaPendapatanQuery(payload);

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
      <Stack direction="column" height="100%" paddingTop="15px">
        {loadingPendapatan ? (
          <Stack direction="column" alignItems="center" justifyContent="center" height={130} spacing={2}>
            <CircularProgress color="secondary" size={24} />
          </Stack>
        ) : (
          <Typography style={{ fontWeight: 'bold', fontSize: 20 }}>
            Rp {numberWithCommas(totalPendapatan?.total || 0)}
          </Typography>
        )}
      </Stack>
    </>
  );
};

export default TotalSemuaPendapatan;
