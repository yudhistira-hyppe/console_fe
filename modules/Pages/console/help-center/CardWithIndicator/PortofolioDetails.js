import React from 'react';
import { Box } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import ProgressIndicator from './ProgressIndicator';
import CmtList from '@coremat/CmtList';

const useStyles = makeStyles(() => ({
  titleRoot: {
    letterSpacing: 0.5,
    marginBottom: 10,
  },
  listItemRoot: {
    padding: 0,
    marginBottom: 0,
  },
}));

const PortfolioDetails = ({ data }) => {
  const classes = useStyles();

  return (
    <Box width={1} style={{ zIndex: -1 }}>
      <CmtList
        data={data}
        renderRow={(item, index) => <ProgressIndicator key={index} className={classes.listItemRoot} item={item} />}
      />
    </Box>
  );
};

export default PortfolioDetails;
