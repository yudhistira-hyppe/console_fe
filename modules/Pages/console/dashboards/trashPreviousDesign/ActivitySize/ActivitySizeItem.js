import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 10,
    width: 10,
    borderRadius: '50%',
    cursor: 'pointer',
    marginRight: 15,
  },
});

const ActivitySizeItem = ({ item }) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box bgcolor={item.bgColor} color={item.color} className={classes.avatar} />
      <Box fontSize={14} fontWeight={700} color="text.primary">
        {item.label}
      </Box>
    </Box>
  );
};

ActivitySizeItem.propTypes = {
  item: PropTypes.object,
};

export default ActivitySizeItem;
