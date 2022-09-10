// react
import React from 'react';

// material ui
import { alpha, makeStyles } from '@material-ui/core/styles';
// import Chip from '@material-ui/core/Chip';

// template components
import CmtCardHeader from '@coremat/CmtCard/CmtCardHeader';
import CmtCardContent from '@coremat/CmtCard/CmtCardContent';
import CmtCard from '@coremat/CmtCard';
import CmtList from '@coremat/CmtList';

// third party libraries
import PerfectScrollbar from 'react-perfect-scrollbar';

// partials components
import ContentReportItem from './ContentReportItem';

// request
import { useAuth } from 'authentication';
import { useUserGetNewCommentQuery } from 'api/user/comment';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  cardRoot: {
    position: 'relative',
    '& .Cmt-card-content': {
      paddingLeft: 0,
      paddingRight: 0,
    },
  },
  scrollbarRoot: {
    height: 300,
    marginRight: -24,
    paddingRight: 24,
    marginLeft: -24,
    paddingLeft: 24,
    marginTop: 13,
    paddingTop: 5,
  },
  chipRoot: {
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
    color: theme.palette.primary.main,
    letterSpacing: 0.25,
    fontSize: 14,
  },
}));

const ContentReport = () => {
  const classes = useStyles();
  const { authUser } = useAuth();

  const { data: dataComment } = useUserGetNewCommentQuery(authUser.user.email);
  return (
    <CmtCard className={classes.cardRoot}>
      <CmtCardHeader
        title={
          <div>
            <Typography variant="h4" component="span" style={{ marginLeft: '7px' }}>
              Pelaporan Konten Terakhir
            </Typography>
            <img src="/images/icons/small-info.svg" style={{ marginLeft: '7px' }} />
          </div>
        }>
        {/* please dont remove code below! this check/notif for readed and unreaded notification  */}
        {/* <Chip className={classes.chipRoot} label="23 New" color="primary" size="small" /> */}
      </CmtCardHeader>
      <CmtCardContent>
        <PerfectScrollbar className={classes.scrollbarRoot}>
          {dataComment?.data?.length > 0 ? (
            <CmtList data={dataComment?.data} renderRow={(item, index) => <ContentReportItem key={index} item={item} />} />
          ) : (
            <center>you have no report</center>
          )}
        </PerfectScrollbar>
      </CmtCardContent>
    </CmtCard>
  );
};

export default ContentReport;
