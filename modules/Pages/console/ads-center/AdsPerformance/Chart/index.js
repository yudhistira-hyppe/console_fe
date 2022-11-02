import React from 'react';
import { LineChart, Line } from 'recharts';


const ChartPerformance = ({ height, width, data, strokeWidth }) => {
    return (
        <LineChart width={width} height={height} data={data}>
            {
                Array.isArray(data) &&
                Object.keys(data.at(0)).map((key) => {
                    return <Line type="monotone" dataKey={key} stroke={data.at(0).color[key]} strokeWidth={strokeWidth} dot={false} />
                })
            }
        </LineChart>
    )
};

export default ChartPerformance;