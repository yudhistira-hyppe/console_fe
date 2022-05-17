import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';
import TableRow from '@material-ui/core/TableRow';
import { timeFromNow } from '../../../../@jumbo/utils/dateHelper';
import { Block, CheckCircleOutline, Delete, Edit, Mail, MoreHoriz, Visibility } from '@material-ui/icons';
import CmtDropdownMenu from '../../../../@coremat/CmtDropdownMenu';
import CmtAvatar from '../../../../@coremat/CmtAvatar';
import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { useAuth } from '../../../../authentication';
import { SOCKET_IO_URL } from '../../../../authentication/auth-provider/config';

const useStyles = makeStyles((theme) => ({
  titleRoot: {
    marginBottom: 2,
    fontSize: 14,
    letterSpacing: 0.25,
    color: theme.palette.common.dark,
  },
}));

const getProfileActions = (profile) => {
  const actions = [
    { action: 'view', label: 'View', icon: <Visibility /> },
    { action: 'email', label: 'Email', icon: <Mail /> },
  ];

  return actions;
};

const ProfileListRow = ({ row, isSelected, onRowClick, onProfileView }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const onProfileMenuClick = (menu) => {
    if (menu.action === 'view') {
      //onProfileView(row);
    }
  };
  const { authUser, isLoadingUser } = useAuth();
  const labelId = `enhanced-table-checkbox-${row.profileID}`;
  const isItemSelected = isSelected(row.profileID);
  const profileActions = getProfileActions(row);
  const avatar = row.avatar
    ? SOCKET_IO_URL + row.avatar.mediaEndpoint + '?x-auth-token=' + authUser.token + '&x-auth-user=' + authUser.email
    : '';

  return (
    <TableRow
      hover
      onClick={(event) => onRowClick(event, row.profileID)}
      role="checkbox"
      aria-checked={isItemSelected}
      tabIndex={-1}
      key={row.profileID}
      selected={isItemSelected}>
      <TableCell padding="checkbox">
        <Checkbox checked={isItemSelected} inputProps={{ 'aria-labelledby': labelId }} />
      </TableCell>
      <TableCell component="th" id={labelId} scope="row" padding="none">
        <Box display="flex" alignItems="center">
          <Box mr={{ xs: 4, md: 5 }}>
            <CmtAvatar size={40} src={avatar} alt={row.email} />
          </Box>
          <div>
            <Typography className={classes.titleRoot} component="div" variant="h4">
              {row.email}
            </Typography>
          </div>
        </Box>
      </TableCell>
      <TableCell>{row.fullName}</TableCell>
      <TableCell>{row.dob}</TableCell>
      <TableCell>{row.gender}</TableCell>
      <TableCell>{row.status}</TableCell>
      <TableCell>{row.country}</TableCell>
      <TableCell align="center" onClick={(event) => event.stopPropagation()}>
        <CmtDropdownMenu items={profileActions} onItemClick={onProfileMenuClick} TriggerComponent={<MoreHoriz />} />
      </TableCell>
    </TableRow>
  );
};
export default React.memo(ProfileListRow);
