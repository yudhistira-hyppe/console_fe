import React from 'react';
import { Card, Chip, Divider, Stack, Tooltip as MuiTooltip } from '@mui/material';
import { Info, Lens } from '@material-ui/icons';
import { Typography } from '@material-ui/core';
import moment from 'moment';
import { Cell, Legend, RadialBar, RadialBarChart, Tooltip } from 'recharts';

const data = [
  { name: 'Impresi', value: 70, color: '#AB22AF' },
  { name: 'Jangkauan', value: 20, color: '#0795F4' },
];

const PostStatus = () => {
  return (
    <Card style={{ padding: 28, height: '100%' }}>
      <Stack direction="column" height="100%" gap="18px">
        <Stack direction="row" alignItems="center" gap="8px">
          <Typography style={{ color: '#3F3F3F', fontWeight: 900, fontSize: 20, lineHeight: '1.1em' }}>
            Status Boost Post
          </Typography>
          <MuiTooltip title="ini tooltipnya">
            <Info style={{ color: '#3F3F3F', fontSize: 18, opacity: 0.7, marginTop: 2 }} />
          </MuiTooltip>
        </Stack>
        <Stack direction="row" gap="40px">
          <Stack direction="column" width="100%" maxWidth={260}>
            <Chip
              label="Sedang Berlangsung"
              style={{
                fontSize: 14,
                fontWeight: 'bold',
                fontFamily: 'Lato',
                color: '#0095F2',
                backgroundColor: '#0095F233',
                width: 'fit-content',
              }}
            />
            <Typography style={{ fontSize: 12, color: 'rgba(0, 0, 0, 0.38)', fontWeight: 'bold', marginTop: 6 }}>
              Pengaturan: <span style={{ color: 'black' }}>Otomatis</span>
            </Typography>
            <Typography style={{ fontSize: 12, color: 'rgba(0, 0, 0, 0.38)', fontWeight: 'bold', marginTop: 6 }}>
              Tanggal:{' '}
              <span style={{ color: 'black' }}>
                {moment().format('DD/MM/YYYY')} - {moment().subtract(3, 'd').format('DD/MM/YYYY')}
              </span>
            </Typography>
            <Typography style={{ fontSize: 12, color: 'rgba(0, 0, 0, 0.38)', fontWeight: 'bold', marginTop: 6 }}>
              Tipe Jadwal: <span style={{ color: 'black' }}>Otomatis (11:00 - 21:00 WIB)</span>
            </Typography>
            <Typography style={{ fontSize: 12, color: 'rgba(0, 0, 0, 0.38)', fontWeight: 'bold', marginTop: 6 }}>
              Interval: <span style={{ color: 'black' }}>50 Menit</span>
            </Typography>
          </Stack>
          <Divider orientation="vertical" flexItem />
          <Stack direction="row" width="100%" justifyContent="space-between" alignItems="center">
            <Stack direction="column" gap="20px" width="100%">
              <div>
                <Typography style={{ color: 'rgba(0, 0, 0, 0.87)', fontWeight: 'bold', fontSize: 20 }}>36</Typography>
                <Typography style={{ color: '#737373', fontSize: 14 }}>Total Impresi</Typography>
              </div>
              <div>
                <Typography style={{ color: 'rgba(0, 0, 0, 0.87)', fontWeight: 'bold', fontSize: 20 }}>300</Typography>
                <Typography style={{ color: '#737373', fontSize: 14 }}>Total Jangkauan</Typography>
              </div>
              <Stack direction="row" gap="24px">
                <Stack direction="row" alignItems="center" gap="8px">
                  <Lens style={{ color: '#0795F4', fontSize: 12 }} />
                  <Typography variant="caption">Impresi</Typography>
                </Stack>
                <Stack direction="row" alignItems="center" gap="8px">
                  <Lens style={{ color: '#AB22AF', fontSize: 12 }} />
                  <Typography variant="caption">Jangkauan</Typography>
                </Stack>
              </Stack>
            </Stack>
            <RadialBarChart
              height={180}
              width={180}
              innerRadius={50}
              outerRadius={90}
              data={data}
              startAngle={450}
              endAngle={165}>
              <RadialBar minAngle={15} clockWise={true} background dataKey="value">
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </RadialBar>
              <Legend
                iconSize={0}
                width={130}
                height={160}
                layout="vertical"
                verticalAlign="middle"
                align="center"
                wrapperStyle={{ fontSize: 12, textAlign: 'right', marginTop: 1, color: '#737373' }}
              />
              <Tooltip />
            </RadialBarChart>
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
};

export default PostStatus;
