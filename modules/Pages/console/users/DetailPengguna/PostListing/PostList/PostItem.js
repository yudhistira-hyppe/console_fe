import React from 'react';
import Box from '@material-ui/core/Box';
import CmtMediaObject from '@coremat/CmtMediaObject';
import CmtImage from '@coremat/CmtImage';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import { fakeDb } from 'modules/FakeDb/fake-db';
import { getMediaUri } from 'helpers/stringHelper';

const { postTabCategories } = fakeDb;

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
    '& .MuiTypography-body2': {
      color: '#00000061',
      fontSize: 12,
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
  imageThumbRoot: {
    width: 167,
    height: 124,
    objectFit: 'cover',
    borderRadius: 4,
  },
  titleRoot: {
    letterSpacing: 0.15,
    fontSize: 16,
    marginBottom: 12,
    fontWeight: theme.typography.fontWeightRegular,
  },
  badgeRoot: {
    color: theme.palette.common.white,
    borderRadius: 30,
    fontSize: 12,
    padding: '2px 10px',
    marginBottom: 16,
    display: 'inline-block',
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
  containerStyle: {
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 75,
    },
    [theme.breakpoints.up('md')]: {
      width: 150,
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

function categoryColor(slug) {
  switch (slug) {
    case 'hyppevid':
      return '#FF8C00';
    case 'hyppediary':
      return '#8DCD03';
    case 'hyppepic':
      return '#eb4034';
  }
}

function categoryName(slug) {
  const cat = postTabCategories.filter((cat) => cat.slug == slug);
  return cat.length > 0 ? cat[0].name : '';
}

const PostItem = ({ item, onPropertyClick }) => {
  const classes = useStyles();
  const getTitle = () => (
    <React.Fragment>
      <Box className={classes.badgeRoot} component="span" bgcolor={categoryColor(item.category)}>
        {categoryName(item.category)}
      </Box>
      <Typography component="div" variant="h4" mb={1} className={classes.titleRoot}>
        {item.title ? item.title : item.description}
      </Typography>
    </React.Fragment>
  );

  const getContent = () => (
    <Box component="p" display="flex" flexDirection="row" mb={1} fontSize={12}>
      <Box component="span" mr={{ xs: 2, md: 3 }}>
        <Box component="span" color="text.secondary" mr={1}>
          Dilihat:
        </Box>
        {item.insight.views}
      </Box>
      <Box component="span" mr={{ xs: 2, md: 3 }}>
        <Box component="span" color="text.secondary" mr={1}>
          Disukai:
        </Box>
        {item.insight.likes}
      </Box>
      <Box component="span" mr={{ xs: 2, md: 3 }}>
        <Box component="span" color="text.secondary" mr={1}>
          Dibagikan:
        </Box>
        {item.insight.shares}
      </Box>
      <Box component="span" mr={{ xs: 2, md: 3 }}>
        <Box component="span" color="text.secondary" mr={1}>
          Komentar:
        </Box>
        {item.insight.comments}
      </Box>
    </Box>
  );

  const getFooter = () => (
    <React.Fragment>
      {/* <Typography component="div" variant="h6" className={classes.priceRoot}>
        {item.price}
      </Typography> */}
      <Box component="div" fontSize={12} color="text.secondary">
        Terdaftar: Tidak
      </Box>
      <Box component="div" fontSize={12} color="text.secondary">
        Dijual: -
      </Box>
    </React.Fragment>
  );

  return (
    <CmtMediaObject
      className={classes.mediaObjectRoot}
      avatar={<CmtImage className={classes.imageThumbRoot} src={getMediaUri(item)} alt={item.title} />}
      avatarPos="center"
      title={getTitle()}
      subTitle={getContent()}
      subTitleProps={{ className: classes.subTitleRoot }}
      content={item.publishedDate}
      footerComponent={getFooter()}
      footerComponentProps={{ className: classes.footerComponentRoot }}
      onClick={() => onPropertyClick(item)}></CmtMediaObject>
  );
};

export default PostItem;
