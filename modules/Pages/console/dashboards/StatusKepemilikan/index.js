// import './styles.css';
import CmtAdvCard from '@coremat/CmtAdvCard';
import CmtAdvCardContent from '@coremat/CmtAdvCard/CmtAdvCardContent';
import CmtCardHeader from '@coremat/CmtCard/CmtCardHeader';
import { Box, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { PieChart, Pie, Sector, Cell } from 'recharts';

const data = [
  { name: 'Group A', value: 300 },
  { name: 'Group B', value: 750 },
];
const COLORS = ['rgba(225, 102, 24, 1)', 'rgba(69, 195, 229, 1)'];

const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 10,
    marginLeft: 30,
  },
  avatar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 10,
    width: 10,
    borderRadius: '50%',
    cursor: 'pointer',
    marginRight: 15,
  },
});

const StatusKepemilikan = () => {
  const classes = useStyles();
  return (
    <>
      <CmtAdvCard>
        <CmtCardHeader
          titleProps={{
            variant: 'h4',
            component: 'div',
          }}
          title="Status Kepemilikan"
        />
        {/* <Typography variant="h3" component="div">
          Status Kepemilikan
        </Typography> */}
        <center style={{ marginTop: '-100px' }}>
          <PieChart width={400} height={310}>
            <Pie
              data={data}
              cx={120}
              cy={200}
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value">
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </center>
        <Box className={classes.root}>
          <Box bgcolor={COLORS[1]} className={classes.avatar} />
          <Box fontSize={14} fontWeight={700} color="text.primary">
            Bersetifikat
          </Box>
        </Box>
        <Box className={classes.root}>
          <Box bgcolor={COLORS[0]} className={classes.avatar} />
          <Box fontSize={14} fontWeight={700} color="text.primary">
            Tidak Bersetifikat
          </Box>
        </Box>
      </CmtAdvCard>
    </>
  );
};

export default StatusKepemilikan;
