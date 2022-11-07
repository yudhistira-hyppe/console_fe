import React from 'react';
import { makeStyles } from '@material-ui/core';
import { Typography, Stack, Avatar, Tooltip, Card } from '@mui/material';
import Info from '@material-ui/icons/Info';

const useStyles = makeStyles(() => ({
  cardRoot: {
    height: '48%',
    marginTop: '3%'
  },
  cardHeader: {
    padding: '2em', 
    height: '25%',
    alignItems: 'center'
  },
  cardContent: {
    height: '75%', 
    overflowY: 'scroll'
  },
  cardWathcer: {
    padding: '1em 2em',
  }
}));

const data = [
  {
    name: 'VebbySutanto',
    watchDate: 'Hari ini, 23/07/22 - 18:30 WIB'
  },
  {
    name: 'Anthony.Sudibyo',
    watchDate: 'Hari ini, 23/07/22 - 18:15 WIB'
  },
  {
    name: 'AnastasyaKirana',
    watchDate: 'Senin, 18/07/22 - 18:10 WIB'
  },
  {
    name: 'Adellia97',
    watchDate: 'Hari ini, 23/07/22 - 18:30 WIB'
  },
  {
    name: 'Gerry_Winata97',
    watchDate: 'Hari ini, 23/07/22 - 18:30 WIB'
  },
];

const AdsWatcherDetailComponent = () => {
  const classes = useStyles();
  return (
    <>
      <Card className={classes.cardRoot}>
        <Stack 
          direction="row" 
          justifyContent="space-between" 
          className={classes.cardHeader}
          border={'solid 1px rgba(0, 0, 0, 0.05)'}
        > 
          <Stack direction="row" spacing={1}>
            <Typography
              fontFamily="Lato"
            >
              Penonton
            </Typography>
            <Tooltip placement='top'>
              <Info fontSize='small' htmlColor="rgba(0, 0, 0, 0.38)" />
            </Tooltip>
          </Stack>

          <Typography
            fontFamily="Lato"
          >
            503 Pengguna
          </Typography>
        </Stack>

        <div className={classes.cardContent}>
          {
            data.map((el, key) => (
              <Stack 
                key={key} 
                direction="row" 
                spacing={2}  
                className={classes.cardWathcer}
                border={'solid 1px rgba(0, 0, 0, 0.05)'}
              >
                <Stack direction="column" justifyContent="center">
                  <Avatar />
                </Stack>
                    
                <div>
                  <Typography
                    fontFamily="Lato"
                  >
                    <span style={{ fontWeight: 'bold' }}>
                      {el.name}
                    </span> telah menonton iklan ini
                  </Typography>
                    
                  <Typography
                    fontFamily="Lato"
                    variant="caption"
                    color="rgba(0, 0, 0, 0.38)"
                  >
                    {el.watchDate}
                  </Typography>
                </div>
              </Stack>
            ))
          }
        </div>
      </Card>
    </>
  )
};

export default AdsWatcherDetailComponent;