import React from 'react';
import { Typography } from '@material-ui/core';
import { Card, CircularProgress, Stack } from '@mui/material';
import { formatCurrency } from 'helpers/stringHelper';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import dayjs from 'dayjs';

const LabelStatus = ({ title, amount, color }) => {
  return (
    <Stack
      direction="column"
      gap="6px"
      width="100%"
      height={84}
      justifyContent="center"
      style={{ borderLeft: `6px solid ${color}`, borderRadius: 8, paddingLeft: 26 }}>
      <Stack direction="row" alignItems="center" gap="6px">
        <Typography style={{ fontWeight: 'bold', fontSize: 14, color: '#737373' }}>{title}</Typography>
      </Stack>
      <Typography style={{ fontWeight: 'bold', fontSize: 24 }}>{formatCurrency(amount || 0) || 0}</Typography>
    </Stack>
  );
};

const SummaryGraph = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data} margin={{ top: 0, right: 24, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="4 4" />
        <XAxis
          dataKey="date"
          tick={({ x, y, stroke, payload }) => (
            <g transform={`translate(${x},${y})`}>
              <text x={0} y={0} dy={16} fontSize={12} textAnchor="middle" fill="#666">
                {payload?.value}
              </text>
            </g>
          )}
        />
        <YAxis allowDataOverflow allowDecimals={false} />
        <Tooltip />
        <Line type="monotone" dataKey="impresi" stroke="#B04FF6" />
        <Line type="monotone" dataKey="jangkauan" stroke="#7438CA" />
        <Line type="monotone" dataKey="CTA" stroke="#CB76CD" />
      </LineChart>
    </ResponsiveContainer>
  );
};

const CardSummary = ({ totalCTA, totalImpresi, totalJangkauan, dataCTA, dataImpresi, dataJangkauan, isLoading }) => {
  const graphData = () => {
    let data = [];

    dataCTA?.map((cta) => {
      data.push({
        date: cta?._id,
        CTA: cta?.CTACount,
        impresi: dataImpresi?.find((item) => item?._id === cta?._id)?.impresiView,
        jangkauan: dataJangkauan?.find((item) => item?._id === cta?._id)?.reachView,
      });
    });

    return data.sort((a, b) => dayjs(a.date).toDate() - dayjs(b.date).toDate());
  };

  return (
    <Card sx={{ height: '100%', width: '100%' }}>
      <Stack direction="column" style={{ padding: 33 }}>
        <Typography style={{ fontWeight: 'bold', fontSize: 20 }}>Ringkasan</Typography>

        <Stack direction="row" gap={3} style={{ margin: '32px 0 40px 8px' }}>
          <LabelStatus title="Total Impresi" amount={totalImpresi} color="#B04FF6" />
          <LabelStatus title="Total Jangkauan" amount={totalJangkauan} color="#7438CA" />
          <LabelStatus title="CTA" amount={totalCTA} color="#CB76CD" />
        </Stack>

        {isLoading ? (
          <Stack direction="column" alignItems="center" justifyContent="center" width="100%" height={400}>
            <CircularProgress color="secondary" size={28} />
          </Stack>
        ) : (
          <SummaryGraph data={graphData()} />
        )}
      </Stack>
    </Card>
  );
};

export default CardSummary;
