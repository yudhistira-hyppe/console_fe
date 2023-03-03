import React, { useEffect, useState } from 'react';
import { Box, Card, Stack, Tooltip as MuiTooltip } from '@mui/material';
import { Typography } from '@material-ui/core';
import { Info, Lens } from '@material-ui/icons';
import numberWithCommas from 'modules/Components/CommonComponent/NumberWithCommas/NumberWithCommas';
import { Cell, Pie, PieChart, Tooltip } from 'recharts';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  tooltip: {
    position: 'relative',
    borderRadius: 6,
    padding: '4px 12px',
    backgroundColor: 'rgb(40, 40, 40)',
    color: theme.palette.common.white,
  },
}));

const ChartPost = ({ totalPost, chartData, persenJangkauan }) => {
  const [showPercent, setShowPercent] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    setShowPercent(false);
    setTimeout(() => setShowPercent(!showPercent), 2200);
  }, []);

  return (
    <Card style={{ padding: 28, height: '100%' }}>
      <Stack direction="column" height="100%">
        <Stack direction="row" alignItems="center" gap="8px">
          <Typography style={{ color: '#3F3F3F', fontWeight: 900, fontSize: 20, opacity: 0.7, lineHeight: '1.1em' }}>
            Boost Post
          </Typography>
          <MuiTooltip title="ini tooltipnya">
            <Info style={{ color: '#3F3F3F', fontSize: 18, opacity: 0.7, marginTop: 2 }} />
          </MuiTooltip>
        </Stack>
        <Stack direction="row" justifyContent="space-between" alignItems="center" height="100%">
          <Stack direction="column">
            <Typography style={{ color: '#23036A', fontWeight: 900, fontSize: 24 }}>
              {numberWithCommas(totalPost)}
            </Typography>
            <Typography style={{ fontSize: 12, color: '#737373' }}>Total Boost Post</Typography>
          </Stack>
          <Stack direction="column" position="relative" gap="30px">
            <PieChart height={180} width={180} margin={{ top: 20 }}>
              <Pie data={chartData} innerRadius={60} outerRadius={80} fill="#8884d8" paddingAngle={1} dataKey="value">
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                labelStyle={{ color: 'black' }}
                wrapperStyle={{ zIndex: 100 }}
                cursor={false}
                content={(data) => {
                  return data.payload[0] ? (
                    <Box className={classes.tooltip}>
                      {data.payload?.[0]?.payload?.name}: {data.payload?.[0]?.payload?.value}%
                    </Box>
                  ) : null;
                }}
              />
            </PieChart>
            {showPercent && (
              <Stack
                direction="column"
                position="absolute"
                alignItems="center"
                justifyContent="center"
                top="75px"
                left="45px">
                <Typography
                  style={{
                    fontSize: 26,
                    color: '#AB22AF',
                    fontWeight: 'bold',
                    lineHeight: '1.2em',
                    width: 90,
                    textAlign: 'center',
                  }}>
                  {persenJangkauan}%
                </Typography>
                <Typography style={{ fontSize: 12, color: '#737373' }}>Jangkauan</Typography>
              </Stack>
            )}
            <Stack direcion="column" marginLeft="35px">
              <Stack direction="row" alignItems="center" gap="8px">
                <Lens style={{ color: '#23036A', fontSize: 12 }} />
                <Typography variant="caption">Total Boost Post</Typography>
              </Stack>
              <Stack direction="row" alignItems="center" gap="8px">
                <Lens style={{ color: '#AB22AF', fontSize: 12 }} />
                <Typography variant="caption">Jangkauan</Typography>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
};

export default ChartPost;
