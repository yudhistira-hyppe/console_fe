import React from 'react';
import { Card, Grid } from '@material-ui/core';
import { Typography, Stack } from '@mui/material';
import { ButtonPopper } from '../components';
import { makeStyles } from '@material-ui/styles';
import Chart from './Chart';
import { BulletsText } from '../components';

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    height: '100%'
  },
  gridItemContainer: {
    padding: '0em 1em 0em 1em',
    marginTop: '1em'
  },
  gridItemHeader: {
    padding: '1em 1em 0em 1em'
  },
}));


const AdsPerformaceComponents = ({ status, setStatusList, title, totalData, description, data }) => {
  const classes = useStyles();

  return (
    <Card className={classes.mainContainer}>
        <Grid container direction={'column'}>
          <Grid item sm={12} md={12} lg={12} className={classes.gridItemHeader}>
            <Stack direction="row" justifyContent="space-between">
              <Typography
                fontWeight="bold"
                fontFamily="Lato"
              >
                { title }
              </Typography>

              <ButtonPopper  
                status={status}
                setStatus={setStatusList}
              />

            </Stack>
          </Grid>

          <Grid item className={classes.gridItemContainer}>
            <Stack>
              <Typography
                fontWeight="bold"
                fontFamily="Lato"
              >
                { 
                  totalData ? 
                  new Intl.NumberFormat(['ban', 'id']).format(Number(totalData)) 
                  : '-' 
                }
              </Typography>

              <Typography
                fontFamily="Lato"
                variant="caption"
              >
                { description || '-' }
              </Typography>

              <Stack direction="row" spacing={2}>
                {
                  Array.isArray(data) &&
                  Object.keys(data[0]).map((key) => {
                    if (key !== 'color'){
                      return (
                        <BulletsText 
                          title={key}
                          color={data[0].color[key]}
                        />
                      )
                    }
                  })
                }
              </Stack>
            </Stack>
          </Grid>

          <Grid item className='mt-4 p-0'>
            <Chart 
              data={data}
              strokeWidth={2}
              height={130}
              width={443}
            />
          </Grid>
        </Grid>
    </Card>
  )
};

export default AdsPerformaceComponents;