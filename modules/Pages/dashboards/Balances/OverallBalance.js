import React from 'react';

import { Typography } from '@material-ui/core';
import TrendingDownIcon from '@material-ui/icons/TrendingDown';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  textError: {
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.error.main,
    marginLeft: 8,
    marginTop: 4,
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

const OverallBalance = () => {
  const classes = useStyles();

  return (
    <div className="mb-2" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
      <Typography component="div" variant="h2">
        Rp. 1,626,000
      </Typography>
    </div>
  );
};

export default OverallBalance;
