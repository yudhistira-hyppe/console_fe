// import './styles.css';
import CmtAdvCard from '@coremat/CmtAdvCard';
import CmtAdvCardContent from '@coremat/CmtAdvCard/CmtAdvCardContent';
import CmtCardHeader from '@coremat/CmtCard/CmtCardHeader';
import { Box, makeStyles, Typography } from '@material-ui/core';
import { Error } from '@material-ui/icons';
import { MenuItem, Popover, Select, Stack } from '@mui/material';
import { useGetOwnershipChartQuery } from 'api/console/dashboard';
import React, { useState } from 'react';
import { PieChart, Pie, Sector, Cell, Tooltip } from 'recharts';

const useStyles = makeStyles({
  cardAdvRoot: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  cardHeaderRoot: {
    paddingTop: 16,
    paddingBottom: 6,
  },
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

const StatusKepemilikan = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const { data: ownershipChart } = useGetOwnershipChartQuery();

  const fixedData = () => {
    let array = [];

    ownershipChart?.data?.map((item) => {
      array.push({
        ...item,
        persentase: Number(item.persentase.toFixed(2)),
      });
    });

    return array;
  };

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const TitleComp = (
    <Stack direction="row" alignItems="center" gap={1} position="relative" style={{ height: 40 }}>
      <Typography variant="h4" component="div">
        Status Kepemilikan
      </Typography>
      <Error style={{ fontSize: 14, color: '#737373' }} onMouseEnter={handlePopoverOpen} onMouseLeave={handlePopoverClose} />
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
        <Box width={180} p="15px 20px" color="#ffffff" bgcolor="#282828" borderRadius="4px">
          Merekam jumlah keseluruhan pengguna yang mendaftarkan kepemilikan konten maupun yang tidak mendaftarkan kontennya
          dalam kurun waktu tertentu
        </Box>
      </Popover>
    </Stack>
  );

  return (
    <>
      <CmtAdvCard className={classes.cardAdvRoot}>
        <CmtCardHeader
          className={classes.cardHeaderRoot}
          titleProps={{
            variant: 'h4',
            component: 'div',
          }}
          title={TitleComp}
        />
        <center>
          <PieChart width={250} height={260}>
            <Pie data={fixedData()} innerRadius={70} outerRadius={100} fill="#8884d8" paddingAngle={1} dataKey="persentase">
              {fixedData()?.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.id === 'TIDAK BERSERTIFIKAT' ? 'rgba(225, 102, 24, 1)' : 'rgba(69, 195, 229, 1)'}
                />
              ))}
            </Pie>
            <Tooltip
              labelStyle={{ color: 'black' }}
              cursor={false}
              content={(data) => {
                return (
                  data.payload?.[0] && (
                    <Box className={classes.tooltip}>
                      {data.payload?.[0]?.payload?.id}: {data.payload?.[0]?.payload?.persentase}%
                    </Box>
                  )
                );
              }}
            />
          </PieChart>
        </center>
        <Stack direction="column" gap="6px" ml="24px" mb="16px">
          <Stack direction="row" alignItems="center">
            <Box bgcolor={'rgba(69, 195, 229, 1)'} className={classes.avatar} />
            <Box fontSize={14} fontWeight={700} color="text.primary">
              Bersetifikat
            </Box>
          </Stack>
          <Stack direction="row" alignItems="center">
            <Box bgcolor={'rgba(225, 102, 24, 1)'} className={classes.avatar} />
            <Box fontSize={14} fontWeight={700} color="text.primary">
              Tidak Bersetifikat
            </Box>
          </Stack>
        </Stack>
      </CmtAdvCard>
    </>
  );
};

export default StatusKepemilikan;
