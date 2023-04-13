import React from 'react';
import { Box, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  headerTop: {
    paddingTop: 12,
    paddingBottom: 12,
    fontSize: 14,
    boxSizing: 'border-box',
  },
  '@global': {
    '.Cmt-container': {
      marginRight: 'auto',
      marginLeft: 'auto',
      paddingLeft: 15,
      paddingRight: 15,
      width: '100%',
      boxSizing: 'border-box',
      [theme.breakpoints.up('lg')]: {
        width: 1280,
      },
    },
  },
}));

const CmtHeaderTop = ({ children, ...rest }) => {
  const classes = useStyles();

  return (
    <Box className={classes.headerTop} {...rest}>
      <div className="Cmt-container">{children}</div>
    </Box>
  );
};

export default CmtHeaderTop;
