import React from 'react';
import CmtCardHeader from '../../../../@coremat/CmtCard/CmtCardHeader';
import Chip from '@material-ui/core/Chip';
import CmtCardContent from '../../../../@coremat/CmtCard/CmtCardContent';
import PerfectScrollbar from 'react-perfect-scrollbar';
import CmtCard from '../../../../@coremat/CmtCard';
import { alpha, makeStyles } from '@material-ui/core/styles';
import CmtList from '../../../../@coremat/CmtList';
import { news} from "../../../FakeDb/news";
import CommentItem from './CommentItem';

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

const Comments = () => {
  const classes = useStyles();
  const { comments } = news;
  return (
    <CmtCard className={classes.cardRoot}>
      <CmtCardHeader title="New Comment">
        <Chip className={classes.chipRoot} label="23 New" color="primary" size="small" />
      </CmtCardHeader>
      <CmtCardContent>
        <PerfectScrollbar className={classes.scrollbarRoot}>
          <CmtList data={comments} renderRow={(item, index) => <CommentItem key={index} item={item} />} />
        </PerfectScrollbar>
      </CmtCardContent>
    </CmtCard>
  );
};

export default Comments;
