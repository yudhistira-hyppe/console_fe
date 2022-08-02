import React from 'react';
import { Box } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  emptyTitle: {
    fontSize: 16,
    color: theme.palette.text.disabled,
    fontWeight: theme.typography.fontWeightBold,
    [theme.breakpoints.up('lg')]: {
      fontSize: 20,
    },
  },
}));

const EmptyContactResult = () => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Box className={classes.emptyTitle} component="p">
        Data pemecahan masalah tidak ditemukan
      </Box>
    </Box>
  );
};

export default EmptyContactResult;
