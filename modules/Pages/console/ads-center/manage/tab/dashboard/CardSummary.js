import React from 'react';
import { Typography } from '@material-ui/core';
import { Card, Stack } from '@mui/material';
import { formatCurrency } from 'helpers/stringHelper';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const LabelStatus = ({ title, amount, color }) => {
  return (
    <Stack
      direction="column"
      gap={1}
      width="100%"
      height={84}
      justifyContent="center"
      style={{ borderLeft: `6px solid ${color}`, borderRadius: 8, paddingLeft: 26 }}>
      <Typography style={{ fontWeight: 'bold' }}>{title || 'Title Here'}</Typography>
      <Typography style={{ fontWeight: 'bold', fontSize: 24, color: color || '#B04FF6' }}>
        {formatCurrency(amount || 0) || 0}
      </Typography>
    </Stack>
  );
};

const SummaryGraph = ({ data }) => {
  const fixedData = () => {
    let array = [];

    data.map((item) => {
      array.push({
        ...item,
        date: moment(item.date).format('DD/MM/YYYY'),
      });
    });

    return array;
  };

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={fixedData()} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="4 4" />
        <XAxis dataKey="date" allowDataOverflow allowDecimals={false} />
        <YAxis allowDataOverflow allowDecimals={false} />
        <Tooltip />
        <Line type="monotone" dataKey="diary" stroke="rgb(142, 73, 240)" />
        <Line type="monotone" dataKey="pict" stroke="rgb(255, 140, 0)" />
        <Line type="monotone" dataKey="vid" stroke="rgb(61, 76, 155)" />
        <Line type="monotone" dataKey="story" stroke="rgb(35, 173, 192)" />
      </LineChart>
    </ResponsiveContainer>
  );
};

const CardSummary = ({ totalCTA, totalImpresi, totalJangkauan, dataCTA, dataImpresi, dataJangkauan }) => {
  return (
    <Card sx={{ height: '100%', width: '100%' }}>
      <Stack direction="column" style={{ padding: 33 }}>
        <Typography style={{ fontWeight: 'bold', fontSize: 20 }}>Ringkasan</Typography>

        <Stack direction="row" gap={3} mt={4}>
          <LabelStatus title="Total Impresi" amount={totalImpresi} color="#B04FF6" />
          <LabelStatus title="Total Jangkauan" amount={totalJangkauan} color="#7438CA" />
          <LabelStatus title="CTA" amount={totalCTA} color="#CB76CD" />
        </Stack>

        {/* <SummaryGraph data={[]} /> */}
      </Stack>
    </Card>
  );
};

export default CardSummary;
