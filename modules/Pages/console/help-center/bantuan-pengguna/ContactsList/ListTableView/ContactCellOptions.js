import React from 'react';
import Box from '@material-ui/core/Box';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import PropTypes from 'prop-types';
import makeStyles from '@material-ui/core/styles/makeStyles';
import clsx from 'clsx';
import DeleteIcon from '@material-ui/icons/Delete';
import ReplyIcon from '@material-ui/icons/Reply';

const useStyles = makeStyles((theme) => ({
  contactCellOptionsRoot: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  starViewRoot: {
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

const ContactCellOptions = ({ data, onClickReply, onClickDelete }) => {
  const classes = useStyles();

  return (
    <Box className={classes.contactCellOptionsRoot} onClick={(e) => e.stopPropagation()}>
      <Box className={clsx(classes.starViewRoot, 'star-view')}>
        <Box ml={1}>
          <Tooltip title="Reply">
            <IconButton size="small" onClick={() => onClickReply({ ...data })}>
              <ReplyIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      <Box className={clsx(classes.actionOptionRoot, 'action-option')}>
        <Box ml={1}>
          <Tooltip title="Delete">
            <IconButton size="small" onClick={() => onClickDelete({ ...data })}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </Box>
  );
};

export default ContactCellOptions;

ContactCellOptions.prototype = {
  data: PropTypes.object.isRequired,
  onClickReply: PropTypes.func,
  onClickDelete: PropTypes.func,
};
