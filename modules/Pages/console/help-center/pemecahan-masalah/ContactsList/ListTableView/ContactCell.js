import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import clsx from 'clsx';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Box from '@material-ui/core/Box';
import CmtAvatar from '@coremat/CmtAvatar';
import Typography from '@material-ui/core/Typography';
import useStyles from './ContactCell.style';
import { STREAM_URL } from 'authentication/auth-provider/config';
import { useAuth } from 'authentication';
import ContactCellOptions from './ContactCellOptions';

const ContactCell = ({ item, onClickTicket, onClickDeleteTicket }) => {
  const classes = useStyles();
  const { authUser } = useAuth();

  const getMediaUri = (mediaEndpoint) => {
    const authToken = `?x-auth-token=${authUser.token}&x-auth-user=${authUser.email}`;

    return `${STREAM_URL}${mediaEndpoint}${authToken}`;
  };

  const getStatus = (status) => {
    if (status === 'onprogress') return 'Berjalan';
    if (status === 'close') return 'Selesai';
  };

  const formattedDate = (date) => {
    const currentYear = new Date().getFullYear();
    const ticketYear = new Date(date).getFullYear();
    if (ticketYear < currentYear) {
      return moment(date).locale('id').utc().format('DD/MM/YY');
    }
    return moment(date).locale('id').utc().format('DD MMMM');
  };

  return (
    <TableRow className={classes.tableRowRoot} onClick={() => onClickTicket(item._id)}>
      <TableCell className={classes.tableCellRoot}>
        <Box display="flex" alignItems="center">
          <Box mr={{ xs: 4, md: 5 }}>
            <CmtAvatar size={56} src={getMediaUri(item.avatar.mediaEndpoint)} alt={name} />
          </Box>
          <Box>
            <Typography className={classes.userName}>{item.userrequest}</Typography>
            <Typography className={classes.title} component="div" variant="h4">
              {item.subject}
            </Typography>
            <Typography className={classes.body}>{item.body}</Typography>
          </Box>
        </Box>
      </TableCell>
      <TableCell className={clsx(classes.tableCellRoot, classes.tableCellStatus)}>
        <div className={`status-${item.status}`}>{getStatus(item.status)}</div>
      </TableCell>
      <TableCell className={clsx(classes.tableCellRoot)}>
        <Box className={clsx(classes.tableCellDate, 'date-info')}>{formattedDate(item.datetime)}</Box>
        <ContactCellOptions data={item} onClickDeleteTicket={onClickDeleteTicket} />
      </TableCell>
    </TableRow>
  );
};

ContactCell.propTypes = {
  item: PropTypes.object.isRequired,
  onClickTicket: PropTypes.func,
  onClickDeleteTicket: PropTypes.func,
};

export default ContactCell;
