import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { fakeDb } from 'modules/FakeDb/fake-db';

const useStyles = makeStyles((theme) => ({
  tabsRoot: {
    position: 'relative',
    minHeight: 66,
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    '& .MuiTabs-flexContainer': {
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        justifyContent: 'center',
      },
    },
    '& .MuiTab-root': {
      maxWidth: 'none',
      minWidth: 10,
      fontSize: 12,
      minHeight: 66,
      letterSpacing: 1.5,
      textTransform: 'capitalize',
      [theme.breakpoints.down('xs')]: {
        paddingLeft: 6,
        paddingRight: 6,
        fontSize: 10,
      },
    }
  },
}));

const {postType} = fakeDb;

const KontenLsitingTabs = ({ tabValue, onChangeTab }) => {
  const classes = useStyles();
  const a11yProps = (index) => {
    return {
      id: `scrollable-force-tab-${index}`,
      'aria-controls': `scrollable-force-tabpanel-${index}`,
    };
  };

  return (
    <Tabs
      value={tabValue}
      onChange={(e, newValue) => onChangeTab(newValue)}
      indicatorColor="primary"
      textColor="primary"
      aria-label="scrollable auto tabs example"
      className={classes.tabsRoot}>
      <Tab key={0} label="Semua" value="" />
      {postType.map((tab, index) => {
        return <Tab key={index} label={tab.slug} value={tab.name} {...a11yProps(index)} />;
      })}
    </Tabs>
  );
};

export default KontenLsitingTabs;
