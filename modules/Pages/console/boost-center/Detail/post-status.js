import React from 'react';
import { Box, Card, Chip, Divider, Stack, Tooltip as MuiTooltip } from '@mui/material';
import { Info, Lens } from '@material-ui/icons';
import { Typography } from '@material-ui/core';
import moment from 'moment';
import { Cell, Legend, RadialBar, RadialBarChart, Tooltip } from 'recharts';
import numberWithCommas from 'modules/Components/CommonComponent/NumberWithCommas/NumberWithCommas';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  tooltip: {
    position: 'relative',
    borderRadius: 6,
    padding: '4px 12px',
    backgroundColor: 'rgb(157 143 167)',
    color: theme.palette.common.white,
  },
}));

const PostStatus = ({ data }) => {
  const classes = useStyles();
  const graphicData = [
    { name: 'Impresi', value: 0, color: '#AB22AF' },
    { name: 'Jangkauan', value: data?.jangkauan, color: '#AB22AF' },
  ];

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
            {data?.statusPengajuan === 'Sedang Berlangsung' && (
              <Chip
                label="Sedang Berlangsung"
                style={{
                  fontSize: 14,
                  fontWeight: 'bold',
                  fontFamily: 'Lato',
                  color: '#0095F2',
                  backgroundColor: '#0095F233',
                  width: 'fit-content',
                  height: 28,
                }}
              />
            )}
            {data?.statusPengajuan === 'Dijadwalkan' && (
              <Chip
                label="Dijadwalkan"
                style={{
                  fontSize: 14,
                  fontWeight: 'bold',
                  fontFamily: 'Lato',
                  color: '#71A500D9',
                  backgroundColor: '#71A5001A',
                  width: 'fit-content',
                  height: 28,
                }}
              />
            )}
            {data?.statusPengajuan === 'Selesai' && (
              <Chip
                label="Selesai"
                style={{
                  fontSize: 14,
                  fontWeight: 'bold',
                  fontFamily: 'Lato',
                  color: '#FF8C00D9',
                  backgroundColor: '#FF8C0026',
                  width: 'fit-content',
                  height: 28,
                }}
              />
            )}
            <Typography style={{ fontSize: 12, color: 'rgba(0, 0, 0, 0.38)', fontWeight: 'bold', marginTop: 12 }}>
              Pengaturan: <span style={{ color: 'black' }}>{data?.typeboost}</span>
            </Typography>
            <Typography style={{ fontSize: 12, color: 'rgba(0, 0, 0, 0.38)', fontWeight: 'bold', marginTop: 8 }}>
              Tanggal:{' '}
              <span style={{ color: 'black' }}>
                {moment(data?.start).format('DD/MM/YYYY')} - {moment(data?.end).format('DD/MM/YYYY')}
              </span>
            </Typography>
            <Typography style={{ fontSize: 12, color: 'rgba(0, 0, 0, 0.38)', fontWeight: 'bold', marginTop: 8 }}>
              Tipe Jadwal:{' '}
              <span style={{ color: 'black' }}>
                {data?.sessionName} ({data?.sessionStart.slice(0, 5)} - {data?.sessionEnd.slice(0, 5)} WIB)
              </span>
            </Typography>
            <Typography style={{ fontSize: 12, color: 'rgba(0, 0, 0, 0.38)', fontWeight: 'bold', marginTop: 8 }}>
              Interval: <span style={{ color: 'black' }}>{data?.interval} Menit</span>
            </Typography>
          </Stack>
          <Divider orientation="vertical" flexItem />
          <Stack direction="row" width="100%" justifyContent="space-between" alignItems="center">
            <Stack direction="column" gap="20px" width="100%">
              <div>
                <Typography style={{ color: 'rgba(0, 0, 0, 0.87)', fontWeight: 'bold', fontSize: 20 }}>0</Typography>
                <Typography style={{ color: '#737373', fontSize: 14 }}>Total Impresi</Typography>
              </div>
              <div>
                <Typography style={{ color: 'rgba(0, 0, 0, 0.87)', fontWeight: 'bold', fontSize: 20 }}>
                  {numberWithCommas(data?.jangkauan)}
                </Typography>
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
              data={graphicData}
              startAngle={450}
              endAngle={165}>
              <RadialBar minAngle={15} clockWise={true} background dataKey="value">
                {graphicData?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </RadialBar>
              <Tooltip
                labelStyle={{ color: 'black' }}
                cursor={false}
                content={(data) => {
                  return data.payload[0] ? (
                    <Box className={classes.tooltip}>
                      {data.payload?.[0]?.payload?.name}: {data.payload?.[0]?.payload?.value}
                    </Box>
                  ) : null;
                }}
              />
            </RadialBarChart>
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
};

export default PostStatus;
