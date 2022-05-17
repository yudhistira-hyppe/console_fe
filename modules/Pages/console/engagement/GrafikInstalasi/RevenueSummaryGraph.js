import React from 'react';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts';
import { Box } from '@material-ui/core';
import Zoom from '@coremat/CmtTransitions/Zoom';
import { fakeDb } from 'modules/FakeDb/fake-db';

const {revenueSummary} = fakeDb;

const RevenueSummaryGraph = ({ value }) => {
  let incomeColor = value === 0 ? '#803882' : '#0000001A';
  let expanseColor = value === 1 ? '#803882' : '#0000001A';

  return (
    <React.Fragment>
      <Zoom in={value === 0} direction="up">
        <Box>
          <ResponsiveContainer width="100%" height={value === 0 ? 250 : 0}>
            <AreaChart data={revenueSummary} margin={{ top: 0, right: 20, left: 20, bottom: 0 }}>
              <Tooltip labelStyle={{ color: 'black' }} cursor={false} />
              <XAxis dataKey="month" axisLine={false} />
              <Area dataKey="expense" stackId="2" stroke={expanseColor} fillOpacity={1} fill={expanseColor} />
              <Area dataKey="income" stackId="1" stroke={incomeColor} fillOpacity={1} fill={incomeColor} />
            </AreaChart>
          </ResponsiveContainer>
        </Box>
      </Zoom>
      <Zoom in={value === 1} direction="down">
        <Box>
          <ResponsiveContainer width="100%" height={value === 1 ? 250 : 0}>
            <AreaChart data={revenueSummary} margin={{ top: 0, right: 20, left: 20, bottom: 0 }}>
              <Tooltip labelStyle={{ color: 'black' }} cursor={false} />
              <XAxis dataKey="month" axisLine={false} />
              <Area dataKey="expense" stackId="2" stroke={expanseColor} fillOpacity={1} fill={expanseColor} />
              <Area dataKey="income" stackId="1" stroke={incomeColor} fillOpacity={1} fill={incomeColor} />
            </AreaChart>
          </ResponsiveContainer>
        </Box>
      </Zoom>
    </React.Fragment>
  );
};

export default RevenueSummaryGraph;
