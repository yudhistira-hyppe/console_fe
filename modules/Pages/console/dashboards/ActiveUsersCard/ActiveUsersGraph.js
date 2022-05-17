import React from 'react';
import { Box } from '@material-ui/core';
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts';
import { fakeDb } from 'modules/FakeDb/fake-db';

const ActiveUsersGraph = () => {
  const { activeUsers } = fakeDb;
  return (
    <ResponsiveContainer width="100%" height={120}>
      <LineChart data={activeUsers} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
        <Tooltip
          cursor={false}
          content={({ active, label, payload }) => {
            return active ? (
              <Box color="#fff">
                {payload.map((row, index) => (
                  <Box key={index}>{`${label}: ${row.value} pengguna`}</Box>
                ))}
              </Box>
            ) : null;
          }}
          wrapperStyle={{
            background: '#0062FF',
            padding: '5px 8px',
            borderRadius: 4,
            overflow: 'hidden',
          }}
        />
        <XAxis dataKey="month" hide />
        <Line dataKey="count" type="monotone" dot={null} strokeWidth={3} stackId="2" stroke="#0062FF" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ActiveUsersGraph;
