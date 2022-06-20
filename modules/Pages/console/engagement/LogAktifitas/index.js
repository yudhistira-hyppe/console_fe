import React from 'react';
import PropTypes from 'prop-types';
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

const LogAktifitas = (props) => {
  const { data } = props;
  const classes = useStyles();

  return (
    <CmtAdvCard>
      <CmtCardHeader
        titleProps={{
          variant: 'h4',
          component: 'div',
        }}
        title="Log Aktifitas"></CmtCardHeader>
      <CmtAdvCardContent className={classes.cardContentRoot}>
        <Box>
          <LogAktifitasGraph data={data} />
        </Box>
      </CmtAdvCardContent>
    </CmtAdvCard>
  );
};

LogAktifitas.propTypes = {
  data: PropTypes.array,
};

export default LogAktifitas;
