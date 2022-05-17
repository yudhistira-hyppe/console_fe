import React from 'react';
import clsx from 'clsx';

import { Box, Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  linkBtn: {
    marginLeft: -6,
  },
}));

const ActionButtons = () => {
  const classes = useStyles();

  return (
    <Box display="flex" flexDirection="row" flexWrap="wrap">
      <Button variant="outlined">Withdraw</Button>
    </Box>
  );
};

export default ActionButtons;
