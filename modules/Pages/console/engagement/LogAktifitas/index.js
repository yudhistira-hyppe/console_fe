import React from 'react';
import CmtCardHeader from '@coremat/CmtCard/CmtCardHeader';
import CmtAdvCardContent from '@coremat/CmtAdvCard/CmtAdvCardContent';
import CmtAdvCard from '@coremat/CmtAdvCard';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import LogAktifitasGraph from './LogAktifitasGraph';

const useStyles = makeStyles((theme) => ({
  cardContentRoot: {
    '& .MuiGrid-container': {
      alignItems: 'center',
    },
  },
}));

const LogAktifitas = () => {
  const classes = useStyles();
  return (
    <CmtAdvCard>
      <CmtCardHeader
        titleProps={{
          variant: 'h4',
          component: 'div',
        }}
        title="Log Aktifitas">
      </CmtCardHeader>
      <CmtAdvCardContent className={classes.cardContentRoot}>
        <Box>
          <LogAktifitasGraph />
        </Box>
      </CmtAdvCardContent>
    </CmtAdvCard>
  );
};

export default LogAktifitas;
