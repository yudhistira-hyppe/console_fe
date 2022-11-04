import React from 'react';
import { Box, Button } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Skeleton } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
  linkBtn: {
    marginLeft: -6,
  },
  button: {
    padding: '5px 17px',
    fontSize: 12,
    width: 100,
    height: 35,
  },
}));

const ActionButtons = ({ onClick, isFetching, column }) => {
  const classes = useStyles();

  return (
    <Box mt={column === 3 ? 16 : 28}>
      {isFetching ? (
        <Skeleton width={'6em'} height="4em" />
      ) : (
        <Button className={classes.button} variant="contained" color="primary" onClick={onClick}>
          Lihat
        </Button>
      )}
    </Box>
  );
};

export default ActionButtons;
