import React from 'react';
import { Area, AreaChart, ResponsiveContainer, Tooltip } from 'recharts';

import useStyles from './SalesStatistic.style';
import { fakeDb } from 'modules/FakeDb/fake-db';

const {performance} = fakeDb;

const SalesStatisticGraph = () => {
  const classes = useStyles();
  return (
    <ResponsiveContainer className={classes.root} width="100%" height={253}>
      <AreaChart data={performance} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
        <Tooltip
          labelStyle={{ color: 'black' }}
          cursor={false}
          content={(data) => {
            return data.payload[0] ? <div className={classes.tooltip}>${data.payload[0].payload.price}</div> : null;
          }}
        />
        <defs>
          <linearGradient id="color3" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#6200EE" stopOpacity={1} />
            <stop offset="95%" stopColor="#B819D2" stopOpacity={1} />
          </linearGradient>
        </defs>
        <Area dataKey="price" strokeWidth={0} stackId="2" stroke="#6200EE" fill="url(#color3)" fillOpacity={1} />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default SalesStatisticGraph;
