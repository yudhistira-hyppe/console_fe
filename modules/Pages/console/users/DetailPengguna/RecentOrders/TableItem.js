import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { alpha, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  tableRowRoot: {
    position: 'relative',
    transition: 'all .2s',
    borderTop: `solid 1px ${theme.palette.borderColor.main}`,
    '&:hover': {
      backgroundColor: alpha(theme.palette.primary.main, 0.08),
      transform: 'translateY(-4px)',
      boxShadow: `0 3px 10px 0 ${alpha(theme.palette.common.dark, 0.2)}`,
      borderTopColor: 'transparent',
      '& $tableCellRoot': {
        color: theme.palette.text.primary,
        '&:last-child': {
          color: theme.palette.error.main,
        },
        '&.success': {
          color: theme.palette.success.main,
        },
      },
    },
    '&:last-child': {
      borderBottom: `solid 1px ${theme.palette.borderColor.main}`,
    },
  },
  tableCellRoot: {
    padding: 16,
    fontSize: 14,
    letterSpacing: 0.25,
    color: theme.palette.text.secondary,
    borderBottom: '0 none',
    position: 'relative',
    '&:first-child': {
      paddingLeft: 24,
    },
    // '&:last-child': {
    //   textAlign: 'right',
    //   color: theme.palette.error.main,
    //   paddingRight: 24,
    // },
    '&.success': {
      color: theme.palette.success.main,
    },
    '& .Cmt-media-object': {
      alignItems: 'center',
    },
  },
  badgeRoot: {
    color: theme.palette.common.white,
    borderRadius: 30,
    fontSize: 12,
    padding: '2px 10px',
    display: 'inline-block',
  },
}));

const actions = [
  {
    label: 'View Order',
  },
  {
    label: 'More',
  },
];

function getBgColor(status) {
  const color = {
    cancelled: '#E00930',
    completed: '#0795F4',
    delayed: '#03DAC5',
    onHold: '#FF8C00',
  };
  return color[status];
}

function jenisTransaksi(id) {
  switch (id) {
    case 1:
      return 'Pendapatan';
    case 2:
      return 'Pengeluaran';
    case 3:
      return 'Penarikan';
  }
}

const TableItem = ({ row }) => {
  const classes = useStyles();

  return (
    <TableRow className={classes.tableRowRoot}>
      <TableCell className={classes.tableCellRoot}>{row.orderDate}</TableCell>
      <TableCell className={classes.tableCellRoot}>{jenisTransaksi(row.jenis)}</TableCell>
      <TableCell className={classes.tableCellRoot}>{row.nominal}</TableCell>
      <TableCell className={classes.tableCellRoot}>{row.remarks}</TableCell>
    </TableRow>
  );
};

export default TableItem;
