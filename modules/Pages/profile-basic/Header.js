import CmtAvatar from '@coremat/CmtAvatar';
import CmtImage from '@coremat/CmtImage';
import { alpha, Box, makeStyles, Tab, Tabs, Typography } from '@material-ui/core';
import { useAuth } from 'authentication';
import { STREAM_URL } from 'authentication/auth-provider/config';

const tabs = [
  { id: 1, title: 'Timeline', slug: 'timeline' },
  { id: 2, title: 'About', slug: 'about' },
  { id: 3, title: 'Photos', slug: 'photos' },
  { id: 4, title: 'Friends', slug: 'friends' },
  { id: 5, title: 'More', slug: 'more' },
];

const useStyles = makeStyles((theme) => ({
  headerRoot: {
    position: 'relative',
    margin: '-30px -15px 0 -15px',
    paddingRight: 15,
    paddingLeft: 15,
    paddingTop: 30,
    paddingBottom: 20,
    [theme.breakpoints.up('sm')]: {
      paddingTop: 56,
    },
    [theme.breakpoints.up('md')]: {
      marginLeft: -50,
      marginRight: -50,
      paddingLeft: 50,
      paddingRight: 50,
    },
    [theme.breakpoints.up('lg')]: {
      marginLeft: -65,
      marginRight: -65,
      paddingLeft: 65,
      paddingRight: 65,
    },
    [theme.breakpoints.up('xl')]: {
      marginLeft: -88,
      marginRight: -88,
      paddingLeft: 88,
      paddingRight: 88,
    },
  },
  headerBgImg: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    minHeight: 370,
    zIndex: 0,
    [theme.breakpoints.up('sm')]: {
      minHeight: 270,
    },
    '&:before': {
      content: '""',
      position: 'absolute',
      left: 0,
      top: 0,
      width: '100%',
      height: '100%',
      //   backgroundColor: alpha(theme.palette.primary.main, 0.5),
      backgroundColor: 'yellow',
    },
    '& img': {
      width: '100%',
      height: '100%',
    },
  },
  headerContent: {
    position: 'relative',
    zIndex: 3,
  },
  titleRoot: {
    // color: theme.palette.common.white,
    color: '#202020',
    marginBottom: 4,
  },
  subTitleRoot: {
    // color: alpha(theme.palette.common.white, 0.74),
    color: '#666666',
  },
  followerList: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: -15,
    marginRight: -15,
    [theme.breakpoints.up('md')]: {
      marginLeft: -24,
      marginRight: -24,
    },
  },
  followerListItem: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 10,
    textAlign: 'center',
    cursor: 'pointer',
    // color: alpha(theme.palette.common.white, 0.74),
    color: '#666666',
    fontSize: 12,
    [theme.breakpoints.up('md')]: {
      paddingLeft: 24,
      paddingRight: 24,
    },
    '&:not(:first-child)': {
      //   borderLeft: `solid 1px ${alpha(theme.palette.common.white, 0.38)}`,
      borderLeft: `solid 1px black`,
    },
  },
  followerListTitle: {
    // color: theme.palette.common.white,
    color: '#202020;',
    marginBottom: 3,
  },
  tabsList: {
    position: 'relative',
    minHeight: 10,
    '& .MuiTabs-indicator': {
      //   backgroundColor: alpha(theme.palette.common.white, 0.4),
      backgroundColor: 'black',
    },
  },
  tabItem: {
    maxWidth: 'none',
    minWidth: 10,
    minHeight: 10,
    padding: '5px 10px',
    textTransform: 'capitalize',
    // color: theme.palette.common.white,
    color: 'red',
    fontSize: 14,
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

const Header = ({ userDetail, tabValue, handleTabChange, dataUser }) => {
  // const Header = ({ userDetail, tabValue, handleTabChange }) => {
  //   const { name, profile_pic, location, followers, following, friends } = userDetail;
  const { authUser } = useAuth();
  const classes = useStyles();

  const getMediaUri = () => {
    const authToken = `?x-auth-token=${authUser.token}&x-auth-user=${authUser.email}`;
    const mediaURI = dataUser?.data[0]?.avatar?.mediaEndpoint;

    return `${STREAM_URL}${mediaURI}${authToken}`;
  };

  return (
    // <Box className={classes.headerRoot}>
    //   <Box className={classes.headerBgImg}>
    //     <CmtImage src={'/images/profile-bg-img.png'} />
    //   </Box>
    <Box className={classes.headerContent}>
      <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} alignItems="center" mb={4}>
        <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} alignItems="center">
          <Box mr={{ sm: 4, md: 5, lg: 6 }} mb={{ xs: 3, sm: 0 }}>
            {/* <CmtAvatar size={80} src={profile_pic} alt={name} /> */}
            <CmtAvatar size={80} src={getMediaUri()} alt={'pict'} />
          </Box>
          <Box>
            <Typography className={classes.titleRoot} component="div" variant="h1">
              {dataUser?.data[0]?.fullName}
            </Typography>
            <Typography className={classes.subTitleRoot}>{dataUser?.data[0]?.email}</Typography>
          </Box>
        </Box>
        <Box ml={{ sm: 'auto' }} mt={{ xs: 3, sm: 0 }}>
          <Box className={classes.followerList}>
            <Box className={classes.followerListItem}>
              <Typography className={classes.followerListTitle} component="div" variant="h3">
                {dataUser?.data[0]?.insight?.followers}
              </Typography>
              <Box component="p">Followers</Box>
            </Box>
            <Box className={classes.followerListItem}>
              <Typography className={classes.followerListTitle} component="div" variant="h3">
                {dataUser?.data[0]?.insight?.followings}
              </Typography>
              <Box component="p">Following</Box>
            </Box>
            <Box className={classes.followerListItem}>
              <Typography className={classes.followerListTitle} component="div" variant="h3">
                {/* {friends.total}{' '} */}
                202020
              </Typography>
              <Box component="p">Friends</Box>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* <Box display="flex" justifyContent={{ xs: 'center', sm: 'flex-end' }}>
          <Tabs className={classes.tabsList} value={tabValue} onChange={handleTabChange} aria-label="profile tabs">
            {tabs.map((item, index) => {
              return (
                <Tab
                  className={classes.tabItem}
                  key={index}
                  value={item.slug}
                  label={item.title}
                  style={{ color: 'white' }}
                />
              );
            })}
          </Tabs>
        </Box> */}
    </Box>
    // </Box>
  );
};

export default Header;

// Header.prototype = {
//   userDetail: PropTypes.object.isRequired,
//   tabValue: PropTypes.string.isRequired,
//   handleTabChange: PropTypes.func,
// };
