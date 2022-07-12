import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import makeStyles from '@material-ui/core/styles/makeStyles';
import clsx from 'clsx';
import DeleteIcon from '@material-ui/icons/Delete';
// import ReplyIcon from '@material-ui/icons/Reply';

const useStyles = makeStyles(() => ({
  contactCellOptionsRoot: {
    position: 'relative',
    display: 'none',
    alignItems: 'center',
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  replyOptionRoot: {
    transition: 'all 0.3s ease',
    transform: 'translateX(200%)',
  },
  actionOptionRoot: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    transition: 'all 0.3s ease',
    opacity: 0,
    visibility: 'hidden',
    transform: 'translateX(100%)',
  },
}));

const ContactCellOptions = ({ data, onClickDeleteTicket }) => {
  const classes = useStyles();

  return (
    <Box className={clsx(classes.contactCellOptionsRoot, 'contact-options')}>
      {/* <Box className={clsx(classes.replyOptionRoot, 'reply-option')}>
        <Box ml={1}>
          <Tooltip title="Reply">
            <IconButton size="small" onClick={() => console.log('reply')}>
              <ReplyIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box> */}
      <Box className={clsx(classes.actionOptionRoot, 'action-option')}>
        <Box ml={1}>
          <Tooltip title="Delete">
            <IconButton size="small" onClick={() => onClickDeleteTicket(data._id)}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </Box>
  );
};

ContactCellOptions.propTypes = {
  data: PropTypes.object.isRequired,
  onClickDeleteTicket: PropTypes.func,
};

export default ContactCellOptions;
