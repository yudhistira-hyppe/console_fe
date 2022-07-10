import React from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
// import { useAuth } from 'authentication';
// import { useUserGetNewCommentQuery } from 'api/user/comment';
import CmtCardHeader from '@coremat/CmtCard/CmtCardHeader';
import CmtCard from '@coremat/CmtCard';
import CmtCardContent from '@coremat/CmtCard/CmtCardContent';
import { alpha, makeStyles } from '@material-ui/core/styles';
import CmtList from '@coremat/CmtList';
import CommentItem from 'modules/Pages/dashboards/Comments/CommentItem';
import { useCommentDisquslogsQuery } from 'api/user/comment';

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

const Comments = ({ query }) => {
  const classes = useStyles();
  // const { comments } = news;
  //   const { authUser } = useAuth();

  const { data: dataCommentGrouping } = useCommentDisquslogsQuery(query);

  return (
    <CmtCard className={classes.cardRoot}>
      <CmtCardHeader title="New Comment">
        {/* please dont remove code below! this check/notif for readed and unreaded notification  */}
        {/* <Chip className={classes.chipRoot} label="23 New" color="primary" size="small" /> */}
      </CmtCardHeader>
      <CmtCardContent>
        <PerfectScrollbar className={classes.scrollbarRoot}>
          <CmtList data={dataCommentGrouping?.data} renderRow={(item, index) => <CommentItem key={index} item={item} />} />
        </PerfectScrollbar>
      </CmtCardContent>
    </CmtCard>
  );
};

export default Comments;
