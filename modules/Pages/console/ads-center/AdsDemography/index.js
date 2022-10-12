import React from 'react';
import { Cell, Pie, PieChart, Tooltip } from 'recharts';
import { Card, Grid, Box } from '@material-ui/core';
import { Typography, Stack } from '@mui/material';
import { GraphIndicator } from '../../help-center/components';

const data = [
    { name: 'Laki-laki', value: 400, color: '#AB22AF' },
    { name: 'Perempuan', value: 400, color: '#23036A' },
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

const AdsDemographyComponent = () => {
    return (
        <Card style={{ padding: '1em' }}>
          <Stack>
            <Typography
                fontFamily="Lato"
                fontWeight="bold"
            >
                Demografis
            </Typography>
          </Stack>

          <Grid container>
            <Grid item sm={12} md={12} lg={8} xl={8} style={{ borderRight: 'solid 0.9px rgba(0, 0, 0, 0.12)', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
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
                <Stack direction="row">
                  <Stack direction="column" justifyContent="center" className='mr-1'>
                    <div style={{ width: '10px', height: '10px', borderRadius: '100px', backgroundColor: "#AB22AF"}} />
                  </Stack>
                  <Stack direction="column" justifyContent="center">
                    <Typography
                    fontFamily="Lato"
                    variant="caption"
                    >
                        Wanita
                    </Typography>
                  </Stack>
                </Stack>

                <Stack direction="row">
                  <Stack direction="column" justifyContent="center" className='mr-1'>
                    <div style={{ width: '10px', height: '10px', borderRadius: '100px', backgroundColor: "#23036A"}} />
                  </Stack>
                  <Stack direction="column" justifyContent="center">
                    <Typography
                    fontFamily="Lato"
                    variant="caption"
                    >
                        Laki-laki
                    </Typography>
                  </Stack>
                </Stack>

                <Stack direction="row">
                  <Stack direction="column" justifyContent="center" className='mr-1'>
                    <div style={{ width: '10px', height: '10px', borderRadius: '100px', backgroundColor: "#0795F4"}} />
                  </Stack>
                  <Stack direction="column" justifyContent="center">
                    <Typography
                    fontFamily="Lato"
                    variant="caption"
                    >
                        Tidak Diketahui
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </Card>
    )
};

export default AdsDemographyComponent;