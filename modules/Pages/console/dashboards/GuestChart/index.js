import { Typography, makeStyles } from '@material-ui/core';
import { Error } from '@material-ui/icons';
import { Box, Card, Popover, Stack } from '@mui/material';
import { useGetTotalGuestQuery } from 'api/console/dashboard';
import React, { useState } from 'react';
import { Cell, Pie, PieChart, Tooltip } from 'recharts';

const useStyles = makeStyles({
  tooltip: {
    position: 'relative',
    borderRadius: 6,
    padding: '4px 12px',
    backgroundColor: 'rgb(40, 40, 40)',
    color: '#FFFFFF',
    fontSize: 14,
    textTransform: 'capitalize',
  },
  avatar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 10,
    width: 10,
    borderRadius: '50%',
    cursor: 'pointer',
    marginRight: 15,
  },
});

const GuestChart = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const classes = useStyles();
  const { data: guestTotal, isLoading: loadingGuest } = useGetTotalGuestQuery();

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  return (
    <Card style={{ padding: '16px 24px 0' }}>
      <Stack direction="column">
        <Stack direction="row" alignItems="center" gap={1} position="relative" style={{ height: 40 }}>
          <Typography variant="h4" component="div">
            Total Guest
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
              Coming Soon
            </Box>
          </Popover>
        </Stack>

        <Stack direction="row" alignItems="center" gap={2}>
          <PieChart width={150} height={176}>
            <Pie data={guestTotal?.data} innerRadius={35} outerRadius={60} fill="#8884d8" paddingAngle={1} dataKey="total">
              {guestTotal?.data?.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry?.id === 'TERDAFTAR' ? '#23036A' : '#AB22AF'} />
              ))}
            </Pie>
            <Tooltip
              labelStyle={{ color: 'black' }}
              cursor={false}
              content={(data) => {
                return (
                  data.payload?.[0] && (
                    <Box className={classes.tooltip}>
                      {data.payload?.[0]?.payload?.id === 'TERDAFTAR' ? 'Terdaftar' : 'Tidak Terdaftar'}:{' '}
                      {data.payload?.[0]?.payload?.total}
                    </Box>
                  )
                );
              }}
            />
          </PieChart>

          <Stack direction="column" gap="6px" ml="24px" mb="16px">
            <Stack direction="row" alignItems="center">
              <Box bgcolor={'#AB22AF'} className={classes.avatar} />
              <Box fontSize={14} fontWeight={700} color="text.primary">
                Tidak Terdaftar
              </Box>
            </Stack>
            <Stack direction="row" alignItems="center">
              <Box bgcolor={'#23036A'} className={classes.avatar} />
              <Box fontSize={14} fontWeight={700} color="text.primary">
                Terdaftar
              </Box>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
};

export default GuestChart;
