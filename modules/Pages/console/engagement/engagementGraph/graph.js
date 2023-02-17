import React from 'react';
import { AreaChart, Area, ResponsiveContainer, Tooltip, XAxis, CartesianGrid } from 'recharts';

const VisitorChart = ({ data, color, kind, chartGradientColor }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 10, right: 0, left: 40, bottom: 0 }}>
        <XAxis dataKey="date" orientation="top" axisLine={false} tickLine={false} />
        <CartesianGrid strokeDasharray="3 3" horizontal={false} />
        <Tooltip labelStyle={{ color: 'black' }} cursor={false} />
        <defs>
          <linearGradient id="color6" x1="0" y1="0" x2="1" y2="0" gradientTransform="rotate(90)">
            <stop offset="10%" stopColor={chartGradientColor} stopOpacity={1} />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity={1} />
          </linearGradient>
        </defs>
        <Area
          dataKey={kind === 'dilihat' ? 'Dilihat' : kind === 'disukai' ? 'Disukai' : 'Komentar'}
          type="monotone"
          strokeWidth={1}
          stackId="2"
          stroke={color}
          fill="url(#color6)"
          fillOpacity={1}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default VisitorChart;
