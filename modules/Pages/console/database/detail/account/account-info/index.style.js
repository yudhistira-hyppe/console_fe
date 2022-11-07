import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  accountInfoContent: {
    '&.MuiTypography-root': {
      wordBreak: 'break-all',
    },
  },
}));

export default useStyles;
