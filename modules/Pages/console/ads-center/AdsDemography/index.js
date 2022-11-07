import React from 'react';
import { Cell, Pie, PieChart, Tooltip } from 'recharts';
import { Card, Grid } from '@material-ui/core';
import { Typography, Stack } from '@mui/material';
import { GraphIndicator } from '../../help-center/components';
import { ButtonPopper, BulletsText } from '../components';
import { makeStyles } from '@material-ui/styles';

const data = [
    { name: 'Wanita', value: 400, color: '#AB22AF' },
    { name: 'Laki-laki', value: 400, color: '#23036A' },
    { name: 'Tidak Diketahui', value: 200, color: '#0795F4' },
];

const wallets = [
    { label: 'Jakarta', value: 15, rate: 1000, color: '#FF8C00' },
    { label: 'Bandung', value: 15, rate: 1000, color: '#7F39FB' },
    { label: 'Bali', value: 15, rate: 1000, color: '#03DAC5' },
    { label: 'Papua', value: 15, rate: 1000, color: '#B457F6' },
    { label: 'Jawa Barat', value: 15, rate: 1000, color: '#D72934' },
    { label: 'Lainnya', value: 15, rate: 1850, color: '#5D9405' },
];

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    height: '100%',
    padding: '1em'
  },
  borderRightBox: {
    borderRight: 'solid 0.9px rgba(0, 0, 0, 0.12)', 
    display: 'flex', 
    flexDirection: 'column', 
    justifyContent: 'center'
  },
  bullets: {
    width: '0.6em', height: '0.6em', borderRadius: '100px'
  }
}));

const AdsDemographyComponent = ({ status, setStatus }) => {
  const classes = useStyles();
    return (
        <Card className={classes.mainContainer}>
          <Stack direction="row" justifyContent="space-between">
            <Typography
                fontFamily="Lato"
                fontWeight="bold"
            >
                Demografis
            </Typography>

            <ButtonPopper 
             status={status}
             setStatus={setStatus}
            />
          </Stack>

          <Grid container>
            <Grid item sm={12} md={12} lg={8} xl={8} className={classes.borderRightBox}>
                <Grid container>
                  <Grid item sm={12} md={12} lg={6} xl={6}>
                    {
                        wallets.map((el, i) => {
                            const max = Math.ceil(wallets.length / 2)
                            if (i < max){
                                return (
                                    <GraphIndicator data={[el]} />
                                )
                            }
                        })
                    }
                  </Grid>

                  <Grid item sm={12} md={12} lg={6} xl={6}>
                    {
                        wallets.map((el, i) => {
                            const max = Math.ceil(wallets.length / 2)
                            if (i >= max){
                                return (
                                    <GraphIndicator data={[el]} />
                                )
                            }
                        })
                    }
                  </Grid>
                </Grid>
            </Grid>

            <Grid item sm={12} md={12} lg={4} xl={4}>
              <PieChart height={180} width={260} margin={{ top: 20 }}>
                <Pie
                data={data}
                innerRadius={48}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
                >
                {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
                </Pie>
                <Tooltip />
              </PieChart>

              <Stack direction="row" justifyContent={'center'} spacing={2} mt={3}>
                {
                  Array.isArray(data) &&
                  data.map((el, idx) => {
                    return (
                      <BulletsText 
                        key={idx}
                        title={el.name}
                        color={el.color}
                      />
                    )
                  })
                }
              </Stack>
            </Grid>
          </Grid>
        </Card>
    )
};

export default AdsDemographyComponent;