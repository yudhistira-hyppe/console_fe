import React from 'react';
import { Typography, Stack } from '@mui/material';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  bullets: {
    width: '0.6em', height: '0.6em', borderRadius: '100px'
  }
}));

const BulletsText = ({ title, color }) => {
  const classes = useStyles();
  return (
    <Stack direction="row">
      <Stack direction="column" justifyContent="center" className='mr-1'>
        <div className={classes.bullets} style={{ backgroundColor: color }} />
      </Stack>
      <Stack direction="column" justifyContent="center">
        <Typography
          fontFamily="Lato"
          variant="caption"
        >
          { title }
        </Typography>
      </Stack>
    </Stack>
  )
};

export default BulletsText;