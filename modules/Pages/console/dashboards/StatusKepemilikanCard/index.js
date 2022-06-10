import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import StatusKepemilikanGraph from './StatusKepemilikanGraph';
import CmtCard from '@coremat/CmtCard';
import CmtCardHeader from '@coremat/CmtCard/CmtCardHeader';
import CmtCardContent from '@coremat/CmtCard/CmtCardContent';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  cardRoot: {
    height: '100%',
  },
  subTitle: {
    color: theme.palette.text.secondary,
    fontSize: 12,
  },
  dotNotif: {
    height: 8,
    width: 8,
    borderRadius: '50%',
    backgroundColor: '#9FB2B8',
  },
  dotPending: {
    backgroundColor: '#0795F4',
  },
  dotSuccess: {
    backgroundColor: '#9BE7FD',
  },
}));

const DealsAnalytics = (props) => {
  const { data } = props;

  const classes = useStyles();
  const getTitle = () => (
    <Typography component="div" variant="h4">
      {/* <Box component="span" color="primary.main" mr={2}>
        927
      </Box>
      Deals Closed */}
      Status Pendaftaran Kepemilikan
    </Typography>
  );
  return (
    <CmtCard className={classes.cardRoot}>
      <CmtCardHeader title={getTitle()} />
      <CmtCardContent>
        <Box display="flex" alignItems="center" mb={4}>
          {/* <Typography className={classes.subTitle}>This year</Typography> */}
          <Box display="flex" alignItems="center" ml="auto">
            <Box component="span" display="flex" alignItems="center" mr={2}>
              <Box component="span" className={clsx(classes.dotNotif, classes.dotPending)} mr={2} mt={1} />
              <Box component="span" color="text.secondary" fontSize={12}>
                Tertunda
              </Box>
            </Box>
            <Box component="span" display="flex" alignItems="center">
              <Box component="span" className={clsx(classes.dotNotif, classes.dotSuccess)} mr={2} mt={1} />
              <Box component="span" color="text.secondary" fontSize={12}>
                Berhasil
              </Box>
            </Box>
          </Box>
        </Box>
        <StatusKepemilikanGraph data={data} />
      </CmtCardContent>
    </CmtCard>
  );
};

DealsAnalytics.propTypes = {
  data: PropTypes.array,
};

export default DealsAnalytics;
