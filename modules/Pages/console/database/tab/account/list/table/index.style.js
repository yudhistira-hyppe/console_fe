import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  table: {
    '&.MuiTable-root': {
      minWidth: 'max-content',
    },
  },
  tableRow: {
    cursor: 'pointer',
    '& .MuiTableCell-root': {
      padding: '16px 10px',
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
  tableChip: {
    '&.MuiChip-root': {
      fontSize: '10px',
    },
  },
  pagination: {
    '& .MuiPagination-ul': {
      justifyContent: 'center',
    },
  },
  textEllipsis: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
}));

export default useStyles;
