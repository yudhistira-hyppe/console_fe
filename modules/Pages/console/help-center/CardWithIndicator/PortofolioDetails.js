import React, { useEffect } from 'react';

import { Box, Typography } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';

import ProgressIndicator from './ProgressIndicator';
import CmtList from '@coremat/CmtList';

const useStyles = makeStyles(() => ({
  titleRoot: {
    letterSpacing: 0.5,
    marginBottom: 20,
  },
  listItemRoot: {
    padding: 0,
    marginBottom: 4,
  },
}));

const PortfolioDetails = ({ data }) => {

  useEffect(() => {
    console.log(data);
  }, [data]);
  const classes = useStyles();
  return (
    <Box width={1} style={{ zIndex: -1 }}>
      {/* {title && (
        <Typography component="div" variant="h6" className={classes.titleRoot}>
          {title}
        </Typography>
      )} */}
      <CmtList
        data={data}
        renderRow={(item, index) => <ProgressIndicator key={index} className={classes.listItemRoot} item={item} />}
      />
    </Box>
  );
};

export default PortfolioDetails;
