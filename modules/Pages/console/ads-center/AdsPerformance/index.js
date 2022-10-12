import React from 'react';
import { Card, Grid } from '@material-ui/core';
import { Typography, Stack } from '@mui/material';

const AdsPerformaceComponents = () => {
    return (
        <Card style={{ padding: '1em', height: '100%' }}>
            <Grid container direction={'column'}>
              <Grid item>
                <Stack>
                  <Typography
                    fontWeight="bold"
                    fontFamily="Lato"
                  >
                    Performa Iklan
                  </Typography>
                </Stack>
              </Grid>

              <Grid item>
                <Stack>
                  <Typography
                    fontWeight="bold"
                    fontFamily="Lato"
                  >
                    1.000
                  </Typography>

                  <Typography
                    fontFamily="Lato"
                    variant="caption"
                  >
                    Total Iklan
                  </Typography>

                  <Stack direction="row" spacing={2}>
                    <Stack direction="row">
                        <Stack direction="column" justifyContent="center" className='mr-1'>
                            <div style={{ width: '10px', height: '10px', borderRadius: '100px', backgroundColor: "#AB22AF"}} />
                        </Stack>
                        <Stack direction="column" justifyContent="center">
                            <Typography
                            fontFamily="Lato"
                            variant="caption"
                            >
                                Impresi
                            </Typography>
                        </Stack>
                    </Stack>

                    <Stack direction="row">
                        <Stack direction="column" justifyContent="center" className='mr-1'>
                            <div style={{ width: '10px', height: '10px', borderRadius: '100px', backgroundColor: "#455DD8"}} />
                        </Stack>
                        <Stack direction="column" justifyContent="center">
                            <Typography
                            fontFamily="Lato"
                            variant="caption"
                            >
                                CTA
                            </Typography>
                        </Stack>
                    </Stack>
                  </Stack>
                </Stack>
              </Grid>
            </Grid>
        </Card>
    )
};

export default AdsPerformaceComponents;