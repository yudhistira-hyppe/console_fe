import { Typography } from '@material-ui/core';
import { Card, CircularProgress, Stack } from '@mui/material';
import dayjs from 'dayjs';
import React from 'react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const TimeSpent = () => {
  const dummyTime = [...new Array(7)]?.map((item, key) => {
    return {
      date: dayjs()
        .subtract(-key + 6, 'day')
        .format('DD/MM/YY'),
      menit: 0,
    };
  });

  return (
    <Card sx={{ p: 3 }}>
      <Stack direction="column" gap={2}>
        <Typography style={{ fontSize: 18, fontWeight: 'bold' }}>Lama Penggunaan Aplikasi</Typography>

        <Stack
          direction="row"
          alignItems="center"
          gap={3}
          style={{ backgroundColor: '#F5F5F5', padding: '22px 62px 22px 33px', width: 'fit-content', borderRadius: 8 }}>
          <Stack direction="column" gap="2px">
            <Typography style={{ fontSize: 20, fontWeight: 'bold' }}>{0} jam</Typography>
            <Typography style={{ fontSize: 12, color: '#00000099' }}>Total</Typography>
          </Stack>

          <Stack direction="column" gap="2px">
            <Typography style={{ fontSize: 20, fontWeight: 'bold' }}>{0} menit</Typography>
            <Typography style={{ fontSize: 12, color: '#00000099' }}>Rata-rata harian</Typography>
          </Stack>
        </Stack>

        {typeof window === 'undefined' ? (
          <Stack direction="column" alignItems="center" justifyContent="center" height={230} spacing={2}>
            <CircularProgress color="secondary" size={28} />
          </Stack>
        ) : (
          <Stack direction="row" height={400}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dummyTime} syncId="anyId" margin={{ top: 30, right: 0, left: 20, bottom: 0 }}>
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
          </Stack>
        )}
      </Stack>
    </Card>
  );
};

export default TimeSpent;
