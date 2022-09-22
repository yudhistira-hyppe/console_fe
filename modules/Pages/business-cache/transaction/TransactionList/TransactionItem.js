import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import clsx from 'clsx';
import { alpha, makeStyles } from '@material-ui/core/styles';
import { IconButton, Tooltip } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import CmtDropdownMenu from '../../../../@coremat/CmtDropdownMenu';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CmtAvatar from '../../../../@coremat/CmtAvatar';
import CmtMediaObject from '../../../../@coremat/CmtMediaObject';
import { STREAM_URL } from '../../../../authentication/auth-provider/config';
import { formatCurrency } from 'helpers/stringHelper';

const useStyles = makeStyles((theme) => ({
  tableRowRoot: {
    position: 'relative',
    transition: 'all .2s',
    borderTop: `solid 1px ${theme.palette.borderColor.main}`,
    '&:last-child': {
      borderBottom: `solid 1px ${theme.palette.borderColor.main}`,
    },
  },
  tableCellRoot: {
    padding: 16,
    fontSize: 14,
    fontFamily: 'Lato',
    letterSpacing: 0.25,
    color: 'black',
    borderBottom: '0 none',
    position: 'relative',
    '&:first-child': {
      paddingLeft: 24,
    },
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
    width: '80px',
  },
  subInfo: {
    fontFamily: 'Lato',
    fontSize: '12px',
    lineHeight: '16px',
    letterSpacing: '0.25px',
    color: 'rgba(0, 0, 0, 0.6)',
  },
}));

function getBgColor(status) {
  const color = {
    sent: '#9BE7FD',
    receive: '#D7F5B1',
  };
  return color[status];
}

const TransactionItem = ({ row }) => {
  const classes = useStyles();
  return (
    <TableRow className={classes.tableRowRoot}>
      <TableCell className={classes.tableCellRoot}>
        {row.timestamp}
        <div className={classes.subInfo}>{row.time}</div>
      </TableCell>
      <TableCell className={classes.tableCellRoot}>{row.type}</TableCell>
      <TableCell className={classes.tableCellRoot}>
        {row.description}
        <div className={classes.subInfo}>{row.fromDesc}</div>
      </TableCell>
      <TableCell
        className={classes.tableCellRoot}
        style={row.status == 'sent' ? { color: '#E00930' } : { color: '#5D9405' }}>
        {formatCurrency(row.amount)}
      </TableCell>
      <TableCell className={clsx(classes.tableCellRoot, 'success')}>
        <Box className={classes.badgeRoot} component="span" bgcolor={getBgColor(row.status)}>
          <div
            style={
              row.status == 'sent' ? { color: '#0356AF', textAlign: 'center' } : { color: '#5D9405', textAlign: 'center' }
            }>
            {row.status.toUpperCase()}
          </div>
        </Box>
      </TableCell>
    </TableRow>
  );
};

export default TransactionItem;
