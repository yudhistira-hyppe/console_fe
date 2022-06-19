import React from 'react';
import PropTypes from 'prop-types';
import CmtCardHeader from '@coremat/CmtCard/CmtCardHeader';
import CmtAdvCardContent from '@coremat/CmtAdvCard/CmtAdvCardContent';
import CmtAdvCard from '@coremat/CmtAdvCard';
import { alpha, makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import CmtList from '@coremat/CmtList';
import EngagementItem from './EngagementItem';
import EngagementGraph from './EngagementGraph';
import { Visibility, Favorite, ModeComment, AddBox, EmojiEmotions } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  cardContentRoot: {
    '& .MuiGrid-container': {
      alignItems: 'center',
    },
  },
  subTitleRoot: {
    fontSize: 12,
    color: theme.palette.text.secondary,
  },
  badgeRoot: {
    fontSize: 14,
    letterSpacing: 0.25,
    backgroundColor: alpha(theme.palette.success.main, 0.15),
    color: theme.palette.success.main,
    padding: '2px 10px',
    borderRadius: 30,
  },
  optionList: {
    display: 'flex',
    flexWrap: 'wrap',
    marginBottom: 24,

    '& > *:not(:last-child)': {
      marginRight: 20,
      [theme.breakpoints.up('md')]: {
        marginRight: 40,
      },
    },
  },
}));

const engagementTitle = [
  {
    label: 'Dilihat',
    bgColor: '#D7F5B1',
    color: '#5D9405',
    icon: <Visibility />,
  },
  {
    label: 'Disukai',
    bgColor: '#F8BBD0',
    color: '#E91E63',
    icon: <Favorite />,
  },
  {
    label: 'Dikomentari',
    bgColor: '#9BE7FD',
    color: '#0356AF',
    icon: <ModeComment />,
  },
  {
    label: 'Diposting',
    bgColor: '#F2E7FE',
    color: '#7F39FB',
    icon: <AddBox />,
  },
  {
    label: 'Direaksi',
    bgColor: '#FFDE99',
    color: '#D36F1A',
    icon: <EmojiEmotions />,
  },
];

const EngagementUser = (props) => {
  const { data } = props;
  const classes = useStyles();

  return (
    <CmtAdvCard>
      <CmtCardHeader
        titleProps={{
          variant: 'h4',
          component: 'div',
        }}
        title="Engagement"></CmtCardHeader>
      <CmtAdvCardContent className={classes.cardContentRoot}>
        <CmtList
          className={classes.optionList}
          data={engagementTitle}
          renderRow={(item, index) => <EngagementItem key={index} item={item} />}
        />
        <Box>
          <EngagementGraph data={data} />
        </Box>
      </CmtAdvCardContent>
    </CmtAdvCard>
  );
};

EngagementUser.propTypes = {
  data: PropTypes.array,
};

export default EngagementUser;
