import React, { useImperativeHandle } from 'react';
import { Box, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  appMainContentWrapper: {
    position: 'relative',
    paddingTop: 60,
    paddingBottom: 40,
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.down('md')]: {
      paddingTop: 20,
      paddingBottom: 20,
    },
  },
  appMainContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    marginRight: 'auto',
    marginLeft: 'auto',
    paddingLeft: 15,
    paddingRight: 15,
    boxSizing: 'border-box',
    [theme.breakpoints.up('lg')]: {
      width: 1280,
    },
  },
}));

const CmtContent = React.forwardRef(function LayoutContent(props, ref) {
  const { children } = props;

  useImperativeHandle(ref, () => ({}));

  const contentRef = React.createRef();
  const classes = useStyles();

  return (
    <Box className={classes.appMainContentWrapper} bgcolor="background.main">
      <Box ref={contentRef} className={classes.appMainContent}>
        {children}
      </Box>
    </Box>
  );
});

export default CmtContent;
CmtContent.defaultProps = {
  name: 'LayoutContent',
};
