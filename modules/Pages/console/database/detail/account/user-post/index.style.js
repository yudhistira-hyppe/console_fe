import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  tab: {
    '&.MuiTab-root': {
      minWidth: '60px',
      padding: '25px',
      justifyContent: 'center',
      fontSize: '14px',
      fontFamily: 'Lato',
      fontWeight: '700',
    },
  },
  tabPanel: {
    '&.MuiTabPanel-root': {
      padding: '24px 0',
    },
  },
  imageThumbRoot: {
    marginRight: 24,
    borderRadius: theme.shape.borderRadius,
    height: 150,
    width: '100%',
    objectFit: 'cover',
    objectPosition: 'center',
    [theme.breakpoints.up('sm')]: {
      width: 200,
    },
  },
  postImage: {
    minWidth: '167px',
    width: '167px',
    height: '124px',
    objectFit: 'cover',
    borderRadius: '4px',
  },
  postDescription: {
    '&.MuiTypography-root': {
      wordBreak: 'break-word',
    },
  },
  titleRoot: {
    letterSpacing: 0.15,
    fontSize: 16,
    marginBottom: 12,
    fontWeight: theme.typography.fontWeightRegular,
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    '-webkit-box-orient': 'vertical',
    '-webkit-line-clamp': 2,
    lineClamp: 2,
    overflow: 'hidden',
    height: 40,
  },
  badgeRoot: {
    color: '#8F8F8F',
    borderRadius: 4,
    fontSize: 12,
    padding: '2px 10px',
    marginBottom: 16,
    display: 'inline-block',
    fontWeight: theme.typography.fontWeightBold,
    width: 'fit-content',
  },
  subTitleRoot: {
    fontSize: 12,
    color: theme.palette.text.secondary,
    marginBottom: 8,
  },
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
}));

export default useStyles;
