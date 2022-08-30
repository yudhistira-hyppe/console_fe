import CmtCardContent from '@coremat/CmtCard/CmtCardContent';
import CmtGridView from '@coremat/CmtGridView';
import { alpha, Box, makeStyles } from '@material-ui/core';
import CakeIcon from '@material-ui/icons/Cake';
import SchoolIcon from '@material-ui/icons/School';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';

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

const ProfileInformation = () => {
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
      icon: <img src="/images/icons/box-menu.svg" />,
    },
  ];

  return (
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
  );
};

export default ProfileInformation;
