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
      marginRight: 50,
    },
  },
  tabPanel: {
    '&.MuiTabPanel-root': {
      padding: '24px 0',
    },
  },
}));

export default useStyles;
