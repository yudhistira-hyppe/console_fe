import React from 'react';
import clsx from 'clsx';

import { Box, Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Skeleton } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
  linkBtn: {
    marginLeft: -6,
  },
  button: {
    backgroundColor: 'rgba(171, 34, 175, 1)',
    color: '#FFFFFF',
    padding: '5px 17px',
  },
}));

const ActionButtons = ({ onClick, isFetching }) => {
  const classes = useStyles();

  return (
    <Box mt={{ xs: 6, md: 8, xl: 10 }}>
      <Box mb={{ xs: 4, md: 6 }} display="flex" flexDirection="row" flexWrap="wrap">
        <div className={clsx('mr-2', 'mb-2')}>
          {isFetching ? (
            <Skeleton width={'6em'} height="4em" />
          ) : (
            <Button className={classes.button} variant="contained" color="rgba(171, 34, 175, 1)" onClick={onClick}>
              Lihat
            </Button>
          )}
        </div>
        {/* <div className={'mb-2'}>
          <Button variant="outlined">Lihat</Button>
        </div> */}
      </Box>

      {/* <Button color="primary" className={classes.linkBtn}>
        <AddIcon />
        <span className={'ml-2'}>Add Wallet</span>
      </Button> */}
    </Box>
  );
};

export default ActionButtons;
