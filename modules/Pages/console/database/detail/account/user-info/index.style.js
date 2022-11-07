import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  userInfoLabel: {
    '&.MuiTypography-root': {
      color: 'rgba(0, 0, 0, 0.6)',
    },
  },
  userInfoContent: {
    '&.MuiTypography-root': {
      fontWeight: '400',
    },
  },
}));

export default useStyles;
