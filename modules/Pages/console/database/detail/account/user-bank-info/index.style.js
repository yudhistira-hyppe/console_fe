import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  tab: {
    '&.MuiTab-root': {
      minWidth: '60px',
      padding: '8px',
      justifyContent: 'end',
      textTransform: 'capitalize',
      fontSize: '16px',
      fontFamily: 'Lato',
      fontWeight: '700',
      marginRight: 26,
      color: 'black',
      marginBottom: 12,

      '&.Mui-selected': {
        color: '#AB22AF',
      },
    },
  },
  userInfoLabel: {
    '&.MuiTypography-root': {
      color: 'rgba(0, 0, 0, 0.6)',
    },
  },
  userInfoContent: {
    '&.MuiTypography-root': {
      fontWeight: '400',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      width: 160,
    },
  },
}));

export default useStyles;
