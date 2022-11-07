import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  tableRow: {
    '& .MuiTableCell-root': {
      '&:first-of-type': {
        paddingLeft: '24px',
      },
      '&:last-of-type': {
        paddingRight: '24px',
      },
      '&.MuiTableCell-body': {
        color: '#00000099',
      },
    },
  },
}));

export default useStyles;
