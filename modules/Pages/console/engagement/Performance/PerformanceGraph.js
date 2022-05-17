import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import React from 'react';

const PerformanceGraph = ({ performanceData }) => {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <AreaChart data={performanceData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <XAxis dataKey="month" />
        <YAxis type="number" domain={[0, 5000]} />
        <Tooltip labelStyle={{ color: 'black' }} cursor={false} />
        <defs>
          <linearGradient id="salesStatistic" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#03DAC5" stopOpacity={1} />
            <stop offset="95%" stopColor="#FFF" stopOpacity={0.8} />
          </linearGradient>
        </defs>

        <Area type="monotone" dataKey="price" strokeWidth={2} stroke="#03DAC5" fill="url(#salesStatistic)" />
      </AreaChart>
    </ResponsiveContainer>
  );
};
export default PerformanceGraph;
