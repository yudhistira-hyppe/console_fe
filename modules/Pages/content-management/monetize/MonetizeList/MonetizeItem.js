import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import clsx from 'clsx';
import { alpha, makeStyles } from '@material-ui/core/styles';
import { IconButton, Switch, Tooltip } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { RemoveRedEye, Delete, Edit, TrendingUp } from '@material-ui/icons';
import CmtImage from '../../../../../@coremat/CmtImage';
import { useAuth } from 'authentication';
import { STREAM_URL } from 'authentication/auth-provider/config';

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
    color: 'rgba(0, 0, 0, 0.6)',
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

const MonetizeItem = ({ row }) => {
  const { authUser } = useAuth();
  const classes = useStyles();
  const label = { inputProps: { 'aria-label': 'Switch Monetize' } };

  const getMediaUri = () => {
    const authToken = `?x-auth-token=${authUser.token}&x-auth-user=${authUser.email}`;
    const mediaURI = '/thumb/' + row?.postID;

    return `${STREAM_URL}${mediaURI}${authToken}`;
  };
  return (
    <TableRow className={classes.tableRowRoot}>
      <TableCell className={classes.tableCellRoot}>
        <div className="flex flex-row align-items-center align-content-center">
          {/* <CmtImage alt={row.name} src={row.contentImage} /> */}
          <div
            style={{
              width: '100px',
              height: '100px',
              backgroundImage: `url('${getMediaUri()}')`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              backgroundSize: 'cover',
            }}></div>
          <div className="ml-1">{row.title}</div>
        </div>
      </TableCell>
      <TableCell className={classes.tableCellRoot}>{row?.createdAt}</TableCell>
      <TableCell className={classes.tableCellRoot}>{row?.postType}</TableCell>
      <TableCell className={classes.tableCellRoot}>{row?._id}</TableCell>
      <TableCell className={classes.tableCellRoot}>{row?._id}</TableCell>
      <TableCell className={classes.tableCellRoot}>
        <div className="flex flex-row align-items-center">
          <div>{row?.saleAmount}</div>
          <Edit />
        </div>
      </TableCell>
      <TableCell className={classes.tableCellRoot}>
        <TrendingUp />
      </TableCell>
    </TableRow>
  );
};

export default MonetizeItem;
