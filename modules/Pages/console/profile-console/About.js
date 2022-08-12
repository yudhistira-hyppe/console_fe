import React, { useState } from 'react';
import CmtCard from '@coremat/CmtCard';
import CmtCardHeader from '@coremat/CmtCard/CmtCardHeader';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Typography, useTheme } from '@material-ui/core';
import CmtAvatarGroup from '@coremat/CmtAvatarGroup';
import CmtCardContent from '@coremat/CmtCard/CmtCardContent';
import Box from '@material-ui/core/Box';
import CmtGridView from '@coremat/CmtGridView';
import PropTypes from 'prop-types';
import { alpha, makeStyles } from '@material-ui/core/styles';
import BusinessIcon from '@material-ui/icons/Business';
import CakeIcon from '@material-ui/icons/Cake';
import SchoolIcon from '@material-ui/icons/School';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';

const useStyles = makeStyles((theme) => ({
  cardRoot: {
    minHeight: '55vh',
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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const About = () => {
  //   const [tabValue, setTabValue] = useState('overview');
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //   const handleTabChange = (event, newValue) => {
  //     setTabValue(newValue);
  //   };

  //   const { company, birthday, college, locality, family } = userDetail;
  const classes = useStyles();

  const renderData = [
    { title: 'Tanggal Lahir', desc: '25/10/2001', icon: <CakeIcon /> },
    { title: 'Lokasi', desc: 'Bogor, Jawa Barat> Indonesia', icon: <LocationOnIcon /> },
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
      icon: <img src="/images/icons/box-menu.svg" />,
    },
  ];
  // const Title = () => {
  //   return <div>tess</div>;
  // };

  return (
    <CmtCard className={classes.cardRoot}>
      <CmtCardHeader
        // style={{ padding: '10px 10px' }}
        separator={{
          color: theme.palette.borderColor.dark,
        }}
        title={<div style={{ margin: '17.6px 0', fontWeight: '900', fontSize: '16px' }}>Tentang</div>}>
        {/* <Tabs className={classes.tabsList} value={tabValue} onChange={handleTabChange} aria-label="profile tabs">
           {tabs.map((item, index) => {
             return <Tab className={classes.tabItem} key={index} value={item.slug} label={item.title} />;
           })}
         </Tabs> */}
      </CmtCardHeader>
      <CmtCardContent>
        <CmtGridView
          itemPadding={24}
          responsive={{
            xs: 1,
            sm: 2,
            md: 3,
            lg: 3,
            xl: 3,
          }}
          data={renderData}
          renderRow={(item, index) => (
            <>
              <Box display="flex" alignItems="center" key={index}>
                {console.log('item:', item.desc)}
                {item.icon}
                <Box ml={6}>
                  <Box fontSize={12} color="text.secondary">
                    {item.title}
                  </Box>
                  <Box className={classes.columnRoot}>
                    {item.desc ? item.desc : item.list}
                    {/* item desc ? item desc : item.list */}
                  </Box>
                </Box>
              </Box>
            </>
          )}
        />
      </CmtCardContent>
    </CmtCard>
  );
};

export default About;

// About.prototype = {
//   userDetail: PropTypes.object.isRequired,
// };
