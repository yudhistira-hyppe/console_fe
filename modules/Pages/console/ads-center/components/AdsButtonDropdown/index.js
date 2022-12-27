import React from 'react';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@mui/material/MenuItem';
import { Button, Grow, Popper, Paper, Chip } from '@material-ui/core';
import { KeyboardArrowDown } from '@material-ui/icons';
import { ArrowForward } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  arrowColor: {
    color: 'rgba(0, 0, 0, 0.38)',
  },
  lato: {
    fontFamily: 'Lato',
  },
  bold: {
    fontWeight: 'bold',
  },
  deniedBadge: {
    backgroundColor: '#6767671A',
    color: '#676767D9',
  },
  scheduledBadge: {
    backgroundColor: '#71A5001A',
    color: '#71A500D9',
  },
  menuItemText: {
    color: '#00000099',
    fontFamily: 'Lato',
    fontSize: 'small',
  },
}));

const AdsButtonDropdown = ({ status, setStatus, setShowModal, showModal, buttonColor, setButtonColor, disabled }) => {
  const classes = useStyles();
  const anchorRef = React.useRef(null);
  const [open, setOpen] = React.useState(false);
  const prevOpen = React.useRef(open);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    const newStatus = event.target.id;
    switch (newStatus) {
      case 'Tayang':
        setButtonColor({ background: '#0095F2' });
        setShowModal({
          ...showModal,
          show: true,
          type: newStatus,
        });
        break;
      case 'Dijadwalkan':
        setShowModal({
          ...showModal,
          show: true,
          type: newStatus,
        });
        break;
      case 'Tinjau':
        setStatus(newStatus);
        setButtonColor({ background: '#E92A63' });
        break;
      case 'Ditolak':
        setShowModal({
          ...showModal,
          show: true,
          type: newStatus,
        });
        break;
      case 'Habis':
        setStatus(newStatus);
        setButtonColor({ background: '#FF8C00' });
        break;
      default:
        break;
    }
    setOpen(false);
  };

  const handleListKeyDown = (event) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  };

  return (
    <>
      <Button
        ref={anchorRef}
        variant="contained"
        id="composition-button"
        aria-controls={open ? 'composition-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        style={{ backgroundColor: buttonColor.background, color: '#fff' }}
        onClick={handleToggle}
        aria-haspopup="true"
        endIcon={<KeyboardArrowDown />}
        disabled={disabled}>
        {status}
      </Button>

      <Popper open={open} anchorEl={anchorRef.current} placement="bottom-start" transition>
        {({ TransitionProps, placement }) => (
          <Grow {...TransitionProps} style={{ transformOrigin: placement === 'right-start' ? 'left top' : 'left bottom' }}>
            <Paper elevation={3}>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="composition-menu"
                  aria-labelledby="composition-button"
                  onKeyDown={handleListKeyDown}>
                  <MenuItem id="Dijadwalkan" onClick={handleClose} className={classes.menuItemText}>
                    Iklan Layak Untuk Tayang
                    <ArrowForward fontSize="small" className="mx-2" htmlColor="rgba(0, 0, 0, 0.38)" />
                    <Chip label="Dijadwalkan" className={`${classes.lato} ${classes.bold} ${classes.scheduledBadge}`} />
                  </MenuItem>

                  <MenuItem id="Ditolak" onClick={handleClose} className={classes.menuItemText}>
                    Iklan Tidak Layak Tayang
                    <ArrowForward fontSize="small" className="mx-2" htmlColor="rgba(0, 0, 0, 0.38)" />
                    <Chip label="Ditolak" className={`${classes.lato} ${classes.bold} ${classes.deniedBadge}`} />
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
};

export default AdsButtonDropdown;
