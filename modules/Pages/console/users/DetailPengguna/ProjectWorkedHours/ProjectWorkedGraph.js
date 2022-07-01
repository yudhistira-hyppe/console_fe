import React from 'react';
import Box from '@material-ui/core/Box';
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
  },
}));

const ProjectWorkedGraph = ({ data, color }) => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <ResponsiveContainer width="100%" height={314}>
        <BarChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
          <XAxis dataKey="month" />
          <Tooltip labelStyle={{ color: 'black' }} cursor={false} />
          <Bar dataKey="deals" stackId="a" fill={color} barSize={8} />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default ProjectWorkedGraph;
