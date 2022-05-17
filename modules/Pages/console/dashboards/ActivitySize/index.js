import React from 'react';
import CmtCardHeader from '@coremat/CmtCard/CmtCardHeader';
import CmtAdvCardContent from '@coremat/CmtAdvCard/CmtAdvCardContent';
import CmtAdvCard from '@coremat/CmtAdvCard';
import { alpha, makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import CmtList from '@coremat/CmtList';
import ActivitySizeItem from './ActivitySizeItem';
import ActivitySizeGraph from './ActivitySizeGraph';
import { fakeDb } from 'modules/FakeDb/fake-db';

const {measuredActivityTitle,measuredActivity} = fakeDb;

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

const ActivitySize = () => {
  const classes = useStyles();
  return (
    <CmtAdvCard>
      <CmtCardHeader
        titleProps={{
          variant: 'h4',
          component: 'div',
        }}
        title="Ukuran Aktifitas">
        <Box component="span" className={classes.badgeRoot}>
          HyppeVid
        </Box>
      </CmtCardHeader>
      <CmtAdvCardContent className={classes.cardContentRoot}>
        <CmtList
          className={classes.optionList}
          data={measuredActivityTitle}
          renderRow={(item, index) => <ActivitySizeItem key={index} item={item} />}
        />
        <Box>
          <ActivitySizeGraph />
        </Box>
      </CmtAdvCardContent>
    </CmtAdvCard>
  );
};

export default ActivitySize;
