import CmtList from '@coremat/CmtList';
import { makeStyles } from '@material-ui/core';
import React from 'react';
import ProgressIndicator from '../CardWithIndicator/ProgressIndicator';

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

const GraphIndicatorComponent = ({ data }) => {
  const classes = useStyles();

  return (
    <CmtList
      data={data}
      renderRow={(item, index) => <ProgressIndicator key={index} className={classes.listItemRoot} item={item} />}
    />
  );
};

export default GraphIndicatorComponent;
