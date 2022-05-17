import React from 'react';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend } from 'recharts';
import { JumboCard } from '@jumbo/components/Common';
import { fakeDb } from 'modules/FakeDb/fake-db';

const {measuredActivity} = fakeDb;

const ActivityChart = () => (
  <JumboCard title="Ukuran Aktifitas">
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={measuredActivity} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip labelStyle={{ color: 'black' }} itemStyle={{ color: 'black' }} cursor={false} />
            <Legend />
            <Line type="monotone" dataKey="minggu1" stroke="#6200EE" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="minggu2" stroke="#19A6D2" />
            <Line type="monotone" dataKey="minggu3" stroke="#cc66ff" />
            <Line type="monotone" dataKey="minggu4" stroke="#ff3300" />
        </LineChart>
      </ResponsiveContainer>
  </JumboCard>
);

export default ActivityChart;