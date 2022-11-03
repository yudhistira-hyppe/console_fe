// react
import React, { useState } from 'react';

// material ui
import makeStyles from '@material-ui/core/styles/makeStyles';
import Box from '@material-ui/core/Box';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { MenuItem, Popover, Select, Stack } from '@mui/material';
import { Typography } from '@material-ui/core';

// template components
import CmtCard from '@coremat/CmtCard';
import CmtCardHeader from '@coremat/CmtCard/CmtCardHeader';
import { Error } from '@material-ui/icons';
import numberWithCommas from 'modules/Components/CommonComponent/NumberWithCommas/NumberWithCommas';

const useStyles = makeStyles((theme) => ({
  cardHeaderRoot: {
    paddingTop: 16,
    paddingBottom: 6,
  },
  titleRoot: {
    fontSize: 12,
    marginBottom: 2,
    color: theme.palette.text.secondary,
    fontWeight: theme.typography.fontWeightBold,
  },
  iconRoot: {
    fontSize: 14,
    display: 'block',
    marginTop: 4,
  },
  dateSelect: {
    '& .MuiSelect-select': {
      padding: '2px 10px',
      fontSize: 12,
    },
    '& .MuiSvgIcon-root': {
      width: 18,
      height: 18,
      top: 5,
    },
  },
}));

const userActiveCard = ({ title, amount, progress, children, secondaryTitle }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const headerSubTitle = (
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
      <div style={{ fontWeight: 'bold', fontSize: 20, marginTop: 10, color: '#B04FF6' }}>{numberWithCommas(amount)}</div>
      {progress && (
        <Box ml={2} fontSize={16} color={progress?.color && null} display="flex" flexDirection="row" alignItems="center">
          <span className="mr-1">{progress?.value && null}</span>
          {parseFloat(progress?.value && null) > 0 ? (
            <ExpandLessIcon className={classes.iconRoot} />
          ) : (
            <ExpandMoreIcon className={classes.iconRoot} />
          )}
        </Box>
      )}
    </div>
  );

  const TitleComp = (
    <Stack direction="row" alignItems="center" justifyContent="space-between">
      <Stack direction="row" alignItems="center" gap={1} position="relative" style={{ height: 40 }}>
        <Typography variant="h4" component="div">
          {title}
        </Typography>
        <Error
          style={{ fontSize: 14, color: '#737373' }}
          onMouseEnter={handlePopoverOpen}
          onMouseLeave={handlePopoverClose}
        />
        <Popover
          id="mouse-over-popover"
          sx={{
            pointerEvents: 'none',
          }}
          open={open}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          onClose={handlePopoverClose}
          disableRestoreFocus>
          <Box width={200} p="15px 20px" color="#ffffff" bgcolor="#282828" borderRadius="4px">
            Pengguna yang aktif menggunakan aplikasi dalam kurun waktu tertentu
          </Box>
        </Popover>
      </Stack>
      <Select defaultValue={7} className={classes.dateSelect}>
        <MenuItem value={7}>7 Hari</MenuItem>
        <MenuItem value={14}>14 Hari</MenuItem>
        <MenuItem value={30}>30 Hari</MenuItem>
        <MenuItem value={90}>90 Hari</MenuItem>
      </Select>
    </Stack>
  );

  return (
    <CmtCard>
      <CmtCardHeader
        className={classes.cardHeaderRoot}
        titleProps={{
          variant: 'h6',
          component: 'div',
          className: classes.titleRoot,
        }}
        title={TitleComp}
        subTitle={headerSubTitle}
      />
      {children}
    </CmtCard>
  );
};

export default userActiveCard;
