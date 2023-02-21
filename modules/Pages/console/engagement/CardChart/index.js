import CmtCard from '@coremat/CmtCard';
import React, { useState } from 'react';
import { Stack } from '@mui/system';
import { Popover, Tooltip, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { DateRangePickerDay as MuiDateRangePickerDay } from '@mui/x-date-pickers-pro/DateRangePickerDay';
import Box from '@mui/material/Box';
import { Error } from '@material-ui/icons';

const GraphChart = ({ title, tooltipTitle, content, cardStyle }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const childrenWithProps = React.Children.map(content, (child) => {
    // Checking isValidElement is the safe way and avoids a
    // typescript error too.
    if (React.isValidElement(child)) {
      return React.cloneElement(child);
    }
    return child;
  });

  return (
    <CmtCard style={{ padding: '16px 24px', display: 'flex', flexDirection: 'column', position: 'relative', ...cardStyle }}>
      <Stack direction="row" justifyContent={'space-between'}>
        <Stack flex={1} direction="row" alignItems="center" gap={1}>
          <Typography fontWeight="bold" fontFamily="Lato">
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
            <Box width={300} p="15px 20px" color="#ffffff" bgcolor="#282828" borderRadius="4px">
              {tooltipTitle}
            </Box>
          </Popover>
        </Stack>
      </Stack>
      <div style={{ marginTop: 'auto', height: '100%' }}>{childrenWithProps}</div>
    </CmtCard>
  );
};

export default GraphChart;
