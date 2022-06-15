import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import clsx from 'clsx';
import { alpha, makeStyles } from '@material-ui/core/styles';
import { IconButton, Switch, Tooltip } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import CmtDropdownMenu from '../../../../@coremat/CmtDropdownMenu';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CmtAvatar from '../../../../@coremat/CmtAvatar';
import CmtMediaObject from '../../../../@coremat/CmtMediaObject';
import { STREAM_URL } from '../../../../authentication/auth-provider/config';
import CmtImage from '../../../../@coremat/CmtImage';
import { RemoveRedEye, Delete } from '@material-ui/icons';

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

const ContentItem = ({ row }) => {
  const classes = useStyles();
  const label = { inputProps: { 'aria-label': 'Switch Monetize' } };
  const actions = [
    {
      icon: <Delete />,
      label: 'Lihat Detail',
    },
    {
      icon: <RemoveRedEye />,
      label: 'Hapus',
    },
  ];
  return (
    <TableRow className={classes.tableRowRoot}>
      <TableCell className={classes.tableCellRoot}>
        <div className="flex flex-row align-items-center align-content-center">
          <CmtImage alt={row.name} src={row.contentImage} />
          <div className="ml-1">{row.contentName}</div>
        </div>
      </TableCell>
      <TableCell className={classes.tableCellRoot}>{row.type}</TableCell>
      <TableCell className={classes.tableCellRoot}>
        {row.date}
        <div>{row.time}</div>
      </TableCell>
      <TableCell className={classes.tableCellRoot}>{row.contentId}</TableCell>
      <TableCell className={classes.tableCellRoot}>{row.views}</TableCell>
      <TableCell className={classes.tableCellRoot}>{row.likes}</TableCell>
      <TableCell className={classes.tableCellRoot}>{row.share}</TableCell>
      <TableCell className={classes.tableCellRoot}>{row.certNumber}</TableCell>
      <TableCell className={classes.tableCellRoot}>
        <Switch {...label} defaultChecked color={'primary'} />
      </TableCell>
      <TableCell>
        <Box display="flex" alignItems="center" justifyContent="flex-end">
          <CmtDropdownMenu
            TriggerComponent={
              <Tooltip title="More">
                <IconButton size="small" style={{ marginLeft: 10 }}>
                  <MoreVertIcon />
                </IconButton>
              </Tooltip>
            }
            items={actions}
            onItemClick={() => {}}
          />
        </Box>
      </TableCell>
    </TableRow>
  );
};

export default ContentItem;
