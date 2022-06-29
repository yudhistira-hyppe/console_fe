import React, { useState } from 'react';
import CmtCard from '../../../@coremat/CmtCard';
import CmtCardHeader from '../../../@coremat/CmtCard/CmtCardHeader';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Button, Grid, Typography, useTheme } from '@material-ui/core';
import CmtAvatarGroup from '../../../@coremat/CmtAvatarGroup';
import CmtCardContent from '../../../@coremat/CmtCard/CmtCardContent';
import Box from '@material-ui/core/Box';
import CmtGridView from '../../../@coremat/CmtGridView';
import PropTypes from 'prop-types';
import { alpha, makeStyles } from '@material-ui/core/styles';
import BusinessIcon from '@material-ui/icons/Business';
import CakeIcon from '@material-ui/icons/Cake';
import SchoolIcon from '@material-ui/icons/School';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import AboutBasic from './tabs/About';
import OrganizationBasic from './tabs/Organization';
import CmtImage from '@coremat/CmtImage';

const tabs = [
  { id: 33232, title: 'About', slug: 'about' },
  { id: 76545, title: 'Organization', slug: 'organization' },
  // { id: 45345, title: 'Work', slug: 'work' },
];

const useStyles = makeStyles((theme) => ({
  cardRoot: {
    '& .Cmt-header-root': {
      paddingTop: 3,
      paddingBottom: 0,
    },
  },
  tabsList: {
    position: 'relative',
    minHeight: 60,
    '& .MuiTabs-indicator': {
      backgroundColor: alpha(theme.palette.primary.main, 0.8),
    },
  },
  tabItem: {
    maxWidth: 'none',
    minWidth: 10,
    minHeight: 60,
    padding: '5px 10px',
    textTransform: 'capitalize',
    color: theme.palette.text.primary,
    fontSize: 14,
    fontWeight: theme.typography.fontWeightRegular,
  },
  columnRoot: {
    fontSize: 16,
    fontWeight: 400,
    lineHeight: 1.5,
    letterSpacing: '0.5px',
  },
}));

const About = () => {
  const [tabValue, setTabValue] = useState('organization');
  const theme = useTheme();

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  //   const { company, birthday, college, locality, family } = userDetail;
  const classes = useStyles();

  const renderData = [
    // { title: 'Works at', desc: 'company', icon: <BusinessIcon /> },
    { title: 'Tanggal Lahir', desc: '25/10/2001', icon: <CakeIcon /> },
    { title: 'Lokasi', desc: 'Bogor, Jawa Barat Indonesia', icon: <LocationOnIcon /> },
    { title: 'Jenis Kelamin', desc: 'Wanita', icon: <SchoolIcon /> },
    // { title: 'Kategori', desc: 'desc', icon: <PeopleAltIcon /> },
    {
      //   title: `${family.length} Family Members`,
      title: `Kategori`,
      list: (
        <Box mt={1}>
          Entertaiment, Hobby, Music
          {/* <CmtAvatarGroup
            // items={family}
            items={'family'}
            srcKey="profile_pic"
            avatarSize={24}
            spacing={1}
            max={6}
            titleKey="name"
            renderItemSummary={(item) => (
              <Typography color="inherit" style={{ fontSize: 10 }}>
                {item.name}
              </Typography>
            )}
          /> */}
        </Box>
      ),
      icon: <PeopleAltIcon />,
    },
  ];

  const ContentTabs = () => {
    switch (tabValue) {
      case 'about':
        return <AboutBasic />;

      case 'organization':
        return <OrganizationBasic />;

      default:
        return 'we cant found no one';
    }
  };

  return (
    <CmtCard className={classes.cardRoot}>
      <CmtCardHeader
        // style={{ padding: '10px 10px' }}
        separator={{
          color: theme.palette.borderColor.dark,
        }}
        title={<div style={{ margin: '17.6px 0', fontWeight: '900', fontSize: '16px' }}>Organization</div>}>
        <Tabs className={classes.tabsList} value={tabValue} onChange={handleTabChange} aria-label="profile tabs">
          {tabs.map((item, index) => {
            return <Tab className={classes.tabItem} key={index} value={item.slug} label={item.title} />;
          })}
        </Tabs>
      </CmtCardHeader>

      <CmtCardContent>
        {/* // content tab change and switch component here */}
        <div style={{ minHeight: '160px' }}>
          <ContentTabs />
        </div>
      </CmtCardContent>
    </CmtCard>
  );
};

export default About;

// About.prototype = {
//   userDetail: PropTypes.object.isRequired,
// };
