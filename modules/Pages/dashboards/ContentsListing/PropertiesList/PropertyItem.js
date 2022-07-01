import React from 'react';
import Box from '@material-ui/core/Box';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import ScheduleIcon from '@material-ui/icons/Schedule';
import CmtMediaObject from '../../../../../@coremat/CmtMediaObject';
import CmtImage from '../../../../../@coremat/CmtImage';
import { timeFromNow } from '../../../../../@jumbo/utils/dateHelper';
import CmtCarousel from '../../../../../@coremat/CmtCarousel';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { fakeDb } from '../../../../FakeDb/fake-db';
import { STREAM_URL } from '../../../../../authentication/auth-provider/config';

const useStyles = makeStyles((theme) => ({
  mediaObjectRoot: {
    width: '100%',
    display: 'flex',
    '@media screen and (max-width: 699px)': {
      flexWrap: 'wrap',
    },
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
    '& .Cmt-media-image': {
      marginRight: 24,
      '@media screen and (max-width: 699px)': {
        alignSelf: 'unset',
        marginRight: 0,
        marginBottom: 16,
        width: '100%',
      },
    },
  },
  carouselRoot: {
    marginRight: 0,
    '& .bottom-left .slick-dots': {
      left: 10,
    },
    '& .slick-dots': {
      bottom: 15,
      '& li button:before': {
        backgroundColor: theme.palette.primary.main,
        opacity: 1,
      },
      '& li.slick-active button:before': {
        backgroundColor: theme.palette.warning.main,
      },
    },
  },
  titleRoot: {
    letterSpacing: 0.15,
    fontSize: 16,
    marginBottom: 12,
    fontWeight: theme.typography.fontWeightRegular,
  },
  badgeRoot: {
    color: '#8F8F8F',
    borderRadius: 4,
    fontSize: 12,
    padding: '2px 10px',
    marginBottom: 16,
    display: 'inline-block',
    fontWeight: theme.typography.fontWeightBold,
  },
  subTitleRoot: {
    fontSize: 12,
    color: theme.palette.text.secondary,
    marginBottom: 8,
  },
  iconRoot: {
    fontSize: 18,
    marginRight: 6,
  },
  linkBtn: {
    fontSize: 14,
    color: theme.palette.primary.main,
    letterSpacing: 1.25,
    fontWeight: theme.typography.fontWeightBold,
    cursor: 'pointer',
    display: 'inline-block',
  },
  priceRoot: {
    fontSize: 16,
    color: theme.palette.primary.main,
    marginBottom: 5,
    fontWeight: theme.typography.fontWeightRegular,
  },
  footerComponentRoot: {
    textAlign: 'right',
    [theme.breakpoints.down('xs')]: {
      marginLeft: 0,
      marginTop: 16,
      textAlign: 'left',
    },
  },
  imageThumbRoot: {
    marginRight: 24,
    borderRadius: theme.shape.borderRadius,
    height: 150,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 200,
    },
  },
  containerStyle: {
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 250,
    },
    [theme.breakpoints.up('md')]: {
      width: 315,
    },
    '@media screen and (max-width: 699px)': {
      width: '100%',
    },
    '& .slick-slide img': {
      borderRadius: 4,
      display: 'block !important',
    },
  },
}));

const PropertyItem = ({ authUser, item, onPropertyClick }) => {
  const classes = useStyles();

  const getMediaUri = () => {
    const authToken = `?x-auth-token=${authUser.token}&x-auth-user=${authUser.email}`;
    // const mediaURI = item.avatar.mediaEndpoint;
    const mediaURI = '/thumb/' + item?.postID;

    return `${STREAM_URL}${mediaURI}${authToken}`;
  };

  const getPostType = () => fakeDb.postType.filter((type) => type.name === item.postType).map((opt) => opt.slug);

  const getTitle = () => (
    <React.Fragment>
      <Box className={classes.badgeRoot} component="span" bgcolor={'#EBEBEB'}>
        {getPostType(item.postType)}
      </Box>
      <Typography component="div" variant="h4" mb={1} className={classes.titleRoot}>
        {item.description}
      </Typography>
    </React.Fragment>
  );

  const getContent = () => (
    <Box component="p" display="flex" flexDirection="row" mb={4} fontSize={12}>
      <Box component="span" mr={{ xs: 3, md: 4 }}>
        {item.insight ? item.insight.likes : 0}
        <Box component="span" color="text.secondary" mr={1}>
          {` Likes`}
        </Box>
      </Box>
      <Box component="span" mr={{ xs: 3, md: 4 }}>
        {item.insight ? item.insight.comments : 0}
        <Box component="span" color="text.secondary" mr={1}>
          {` Comments`}
        </Box>
      </Box>
      <Box component="span" mr={{ xs: 3, md: 4 }}>
        {item.insight ? item.insight.views : 0}
        <Box component="span" color="text.secondary" mr={1}>
          {` Views`}
        </Box>
      </Box>
    </Box>
  );

  const getFooter = () => (
    <React.Fragment>
      <Typography component="div" variant="h6" className={classes.priceRoot}>
        {`item.price`}
      </Typography>
      <Box component="span" fontSize={12} color="text.secondary">
        {`item.pricePerSqFt`}
      </Box>
    </React.Fragment>
  );

  return (
    <CmtMediaObject
      className={classes.mediaObjectRoot}
      avatar={
        <Box position="relative">
          <CmtImage
            className={classes.imageThumbRoot}
            // here
            // src={'../.'}
            src={getMediaUri()}
            alt={item.title}
          />
          {/*<getMediaUri
            data={item.images}
            dotPosition="bottom-left"
            className={classes.containerStyle}
            settings={{
              slidesToShow: 1,
              slidesToScroll: 1,
            }}
            renderRow={(item, index) => <CmtImage key={index} src={item.image} alt={item.title} />}
          />*/}
        </Box>
      }
      avatarPos="center"
      title={getTitle()}
      content={getContent(item)}
      footerComponent={item.monetize ? getFooter() : null}
      footerComponentProps={{ className: classes.footerComponentRoot }}>
      <Box fontSize={12} color="text.disabled" display="flex" flexDirection="row" alignItems="center" mb={4}>
        <Box display="flex" flexDirection="row" alignItems="center" mr={4}>
          <PermIdentityIcon className={classes.iconRoot} /> {item.username}
        </Box>
        <Box display="flex" flexDirection="row" alignItems="center">
          <ScheduleIcon className={classes.iconRoot} /> {timeFromNow(item.createdAt)}
        </Box>
      </Box>
      <Button color="primary" onClick={() => onPropertyClick(item)}>
        Check In Detail
      </Button>
    </CmtMediaObject>
  );
};

export default PropertyItem;
