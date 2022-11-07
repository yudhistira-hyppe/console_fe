import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
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
}));

export default useStyles;
