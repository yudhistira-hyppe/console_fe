import React from 'react';
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts';
import { fakeDb } from 'modules/FakeDb/fake-db';

const {statusKepemilikan} = fakeDb;

const StatusKepemilikanGraph = () => {
  return (
    <ResponsiveContainer width="100%" height={134}>
      <BarChart data={statusKepemilikan} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
        <Tooltip
          labelStyle={{ color: 'black' }}
          itemStyle={{ color: '#9FB2B8' }}
          labelFormatter={function (value) {
            return `Month: ${value}`;
          }}
          cursor={false}
        />
        <XAxis dataKey="month" axisLine={false} tickLine={false} />
        <Bar dataKey="notif" stackId="a" fill="#9FB2B8" barSize={8} />
        <Bar dataKey="pending" stackId="a" fill="#0795F4" barSize={8} />
        <Bar dataKey="sukses" stackId="a" fill="#9BE7FD" barSize={8} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default StatusKepemilikanGraph;
