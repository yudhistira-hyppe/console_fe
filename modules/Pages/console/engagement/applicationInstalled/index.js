// import './styles.css';
import CmtAdvCard from '@coremat/CmtAdvCard';
import CmtCardHeader from '@coremat/CmtCard/CmtCardHeader';
import { Box, Typography } from '@material-ui/core';
import { Stack } from '@mui/material';
import React, { useCallback, useState } from 'react';
import { PieChart, Pie, Cell } from 'recharts';

const data = [
  { name: 'Android', value: 15000 },
  { name: 'IOS', value: 5000 },
];

const COLORS = ['#8DCD03', 'rgba(182, 182, 182, 1)'];

// here for the label at each background color graph
// const RADIAN = Math.PI / 180;
// const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
//   const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
//   const x = cx + radius * Math.cos(-midAngle * RADIAN);
//   const y = cy + radius * Math.sin(-midAngle * RADIAN);

// //   return (
// //     <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
// //       {`${(percent * 100).toFixed(0)}%`}
// //     </text>
// //   );
// };

const Title = () => {
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={2}>
      <div>Aplikasi Terpasang</div>
      <Typography style={{ fontSize: '0.8rem', border: '1px solid black', padding: '1px 5px', borderRadius: '3px' }}>
        Bulan ini
      </Typography>
    </Stack>
  );
};
const ApplicationInstalled = () => {
  return (
    <>
      <CmtAdvCard>
        <CmtCardHeader
          titleProps={{
            variant: 'h4',
            component: 'div',
          }}
          title={<Title />}
        />
        <PieChart width={400} height={180}>
          <Pie
            data={data}
            cx={170}
            cy={80}
            labelLine={false}
            // label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
        <Stack direction="row" justifyContent="center" alignItems="center" spacing={3}>
          <Typography>
            <img src="/images/icons/android.svg" width="20" />
            <span style={{ lineHeight: '5px' }}>{data[0].value}</span>
          </Typography>

          <Typography>
            <img src="/images/icons/apple-grey.svg" width="20" />
            {data[1].value}
          </Typography>
        </Stack>
      </CmtAdvCard>
    </>
  );
};

export default ApplicationInstalled;
