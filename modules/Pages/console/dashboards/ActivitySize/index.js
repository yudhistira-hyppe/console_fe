import React from 'react';
import PropTypes from 'prop-types';
import CmtCardHeader from '@coremat/CmtCard/CmtCardHeader';
import CmtAdvCardContent from '@coremat/CmtAdvCard/CmtAdvCardContent';
import CmtAdvCard from '@coremat/CmtAdvCard';
import { alpha, makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import CmtList from '@coremat/CmtList';
import ActivitySizeItem from './ActivitySizeItem';
import ActivitySizeGraph from './ActivitySizeGraph';

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

const measuredActivityTitle = [
  {
    label: 'HyppeStory',
    bgColor: '#D7F5B1',
    color: '#8DCD03',
  },
  {
    label: 'HyppeVid',
    bgColor: '#FFDE99',
    color: '#FF8C00',
  },
  {
    label: 'HyppeDiary',
    bgColor: '#9BE7FD',
    color: '#0795F4',
  },
  {
    label: 'HyppePic',
    bgColor: '#F2E7FE',
    color: '#7F39FB',
  },
];

const ActivitySize = (props) => {
  const classes = useStyles();
  const { data } = props;

  return (
    <CmtAdvCard>
      <CmtCardHeader
        titleProps={{
          variant: 'h4',
          component: 'div',
        }}
        title="Ukuran Aktifitas"
      />
      <CmtAdvCardContent className={classes.cardContentRoot}>
        <CmtList
          className={classes.optionList}
          data={measuredActivityTitle}
          renderRow={(item, index) => <ActivitySizeItem key={index} item={item} />}
        />
        <Box>
          <ActivitySizeGraph data={data ? data.data : {}} />
        </Box>
      </CmtAdvCardContent>
    </CmtAdvCard>
  );
};

ActivitySize.propTypes = {
  data: PropTypes.array,
};

export default ActivitySize;
