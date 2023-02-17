import { makeStyles } from '@material-ui/styles';
import { CircularProgress, MenuItem, Select, Stack } from '@mui/material';
import { useGetSesiUserQuery } from 'api/console/engagement';
import moment from 'moment';
import { useState } from 'react';
import { AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Area, Brush } from 'recharts';

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

const SesiGraph = () => {
  const classes = useStyles();
  const [payload, setPayload] = useState({
    startdate: moment().subtract(6, 'day').format('YYYY-MM-DD'),
    enddate: moment().format('YYYY-MM-DD'),
  });

  const handlePayload = (value) => {
    setPayload({ ...payload, startdate: moment().subtract(value, 'day').format('YYYY-MM-DD') });
  };

  const { data: sesiUser, isFetching: loadingSesi } = useGetSesiUserQuery(payload);

  const dataSesi = () => {
    let newData = [];

    sesiUser?.data?.map((item) => {
      newData.push({
        date: moment(item.date).format('DD/MM/YYYY'),
        menit: item.count,
      });
    });

    return newData;
  };

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
      {loadingSesi ? (
        <Stack direction="column" alignItems="center" justifyContent="center" height={230} spacing={2}>
          <CircularProgress color="secondary" size={28} />
        </Stack>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={dataSesi()} syncId="anyId" margin={{ top: 30, right: 0, left: 20, bottom: 0 }}>
            <XAxis dataKey="date" tickLine={false} axisLine={false} tickSize={10} />
            <YAxis tickFormatter={(value) => `${value} Menit`} tickLine={false} axisLine={false} tickSize={10} />
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <Tooltip labelStyle={{ color: 'black' }} itemStyle={{ color: 'black' }} cursor={false} />
            <defs>
              <linearGradient id="color15" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#D45AD8" stopOpacity={1} />
                <stop offset="95%" stopColor="#D45AD833" stopOpacity={1} />
              </linearGradient>
            </defs>
            <Area
              dataKey="menit"
              type="monotone"
              strokeWidth={2}
              stackId="2"
              stroke="#AB22AF"
              fill="url(#color15)"
              fillOpacity={1}
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </>
  );
};

export default SesiGraph;
