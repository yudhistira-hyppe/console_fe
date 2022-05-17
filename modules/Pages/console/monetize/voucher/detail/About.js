import React from 'react';
import CmtCard from '@coremat/CmtCard';
import CmtCardHeader from '@coremat/CmtCard/CmtCardHeader';
import { useTheme } from '@material-ui/core';
import CmtCardContent from '@coremat/CmtCard/CmtCardContent';
import Box from '@material-ui/core/Box';
import CmtGridView from '@coremat/CmtGridView';
import PropTypes from 'prop-types';
import { alpha, makeStyles } from '@material-ui/core/styles';
import AccountBox from '@material-ui/icons/AccountBox';
import CakeIcon from '@material-ui/icons/Cake';
import Wc from '@material-ui/icons/Wc';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Group from '@material-ui/icons/Group';
import AccountCircle from '@material-ui/icons/AccountCircle';
import {fromatDate} from 'helpers/stringHelper';

const useStyles = makeStyles((theme) => ({
  cardRoot: {
    height:'100%',
    '& .Cmt-header-root': {
      paddingTop: 15,
      paddingBottom: 15,
    }
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

const About = ({ userDetail }) => {
  const theme = useTheme();

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const { gender, dob, area } = userDetail;
  const classes = useStyles();

  let dateParsed = '';
  if(dob && dob != '') {
    dateParsed = fromatDate(dob);
  }

  const renderData = [
    { title: 'Tanggal Lahir', desc: dateParsed, icon: <CakeIcon /> },
    { title: 'Jenis Kelamin', desc: gender, icon: <Wc /> },
    { title: 'Lokasi', desc: area, icon: <LocationOnIcon /> },
    { title: 'Komunitas', desc: '-', icon: <AccountCircle /> },
    { title: 'Pemilik Dari', desc: '-', icon: <AccountBox /> },
    { title: 'Anggota Dari', desc: '-', icon: <Group /> },

    // {
    //   title: `${family.length} Family Members`,
    //   list: (
    //     <Box mt={1}>
    //       <CmtAvatarGroup
    //         items={family}
    //         srcKey="profile_pic"
    //         avatarSize={24}
    //         spacing={1}
    //         max={6}
    //         titleKey="name"
    //         renderItemSummary={(item) => (
    //           <Typography color="inherit" style={{ fontSize: 10 }}>
    //             {item.name}
    //           </Typography>
    //         )}
    //       />
    //     </Box>
    //   ),
    //   icon: <PeopleAltIcon />,
    // },
  ];

  return (
    <CmtCard className={classes.cardRoot}>
      <CmtCardHeader
        separator={{
          color: theme.palette.borderColor.dark,
        }}
        title="Tentang">
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
            <Box display="flex" alignItems="center" key={index}>
              {item.icon}
              <Box ml={6}>
                <Box fontSize={12} color="text.secondary">
                  {item.title}
                </Box>
                <Box className={classes.columnRoot}>{item.desc ? item.desc : item.list}</Box>
              </Box>
            </Box>
          )}
        />
      </CmtCardContent>
    </CmtCard>
  );
};

export default About;

About.prototype = {
  userDetail: PropTypes.object.isRequired,
};
