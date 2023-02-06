import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CmtCardHeader from '@coremat/CmtCard/CmtCardHeader';
import CmtAdvCardContent from '@coremat/CmtAdvCard/CmtAdvCardContent';
import CmtAdvCard from '@coremat/CmtAdvCard';
import { alpha, makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import CmtList from '@coremat/CmtList';
import ActivitySizeItem from './ActivitySizeItem';
import ActivitySizeGraph from './ActivitySizeGraph';
import { MenuItem, Popover, Select, Stack } from '@mui/material';
import { Typography } from '@material-ui/core';
import { Error } from '@material-ui/icons';
import { useGetPostAnalyticQuery } from 'api/console/dashboard';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
  cardHeaderRoot: {
    paddingTop: 16,
    paddingBottom: 16,
  },
  cardContentRoot: {
    '& .MuiGrid-container': {
      alignItems: 'center',
    },
  },
  subTitleRoot: {
    fontSize: 12,
    color: theme.palette.text.secondary,
  },
  badgeRoot: {
    fontSize: 14,
    letterSpacing: 0.25,
    backgroundColor: alpha(theme.palette.success.main, 0.15),
    color: theme.palette.success.main,
    padding: '2px 10px',
    borderRadius: 30,
  },
  optionList: {
    display: 'flex',
    flexWrap: 'wrap',
    marginBottom: 24,

    '& > *:not(:last-child)': {
      marginRight: 20,
      [theme.breakpoints.up('md')]: {
        marginRight: 30,
      },
    },
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

const measuredActivityTitle = [
  {
    label: 'HyppeStory',
    bgColor: 'rgba(35, 173, 192, 1)',
    // color: '#8DCD03',
  },
  {
    label: 'HyppeVid',
    bgColor: 'rgba(61, 76, 155, 1)',
    // color: '#FF8C00',
  },
  {
    label: 'HyppeDiary',
    bgColor: 'rgba(142, 73, 240, 1)',
    // color: '#0795F4',
  },
  {
    label: 'HyppePic',
    bgColor: 'rgba(255, 140, 0, 1)',
    // color: '#7F39FB',
  },
];

const ActivitySize = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [payload, setPayload] = useState({
    startdate: moment().subtract(6, 'day').format('YYYY-MM-DD'),
    enddate: moment().format('YYYY-MM-DD'),
  });

  const { data: postAnalytic } = useGetPostAnalyticQuery(payload);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handlePayload = (value) => {
    setPayload({ ...payload, startdate: moment().subtract(value, 'day').format('YYYY-MM-DD') });
  };

  const TitleComp = (
    <Stack direction="row" alignItems="center" justifyContent="space-between">
      <Stack direction="row" alignItems="center" gap={1} position="relative" style={{ height: 40 }}>
        <Typography variant="h4" component="div">
          Aktifitas
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
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          onClose={handlePopoverClose}
          disableRestoreFocus>
          <Box width={300} p="15px 20px" color="#ffffff" bgcolor="#282828" borderRadius="4px">
            Merekam aktivitas pengguna yang menggunakan fitur aplikasi dalam kurun waktu tertentu
          </Box>
        </Popover>
      </Stack>
      <Select
        defaultValue={6}
        className={classes.dateSelect}
        color="secondary"
        onChange={(e) => handlePayload(e.target.value)}>
        <MenuItem value={6}>7 Hari</MenuItem>
        <MenuItem value={13}>14 Hari</MenuItem>
        <MenuItem value={29}>30 Hari</MenuItem>
        <MenuItem value={89}>90 Hari</MenuItem>
      </Select>
    </Stack>
  );

  return (
    <CmtAdvCard>
      <CmtCardHeader
        className={classes.cardHeaderRoot}
        titleProps={{
          variant: 'h4',
          component: 'div',
        }}
        title={TitleComp}
      />
      <CmtAdvCardContent className={classes.cardContentRoot}>
        <CmtList
          className={classes.optionList}
          data={measuredActivityTitle}
          renderRow={(item, index) => <ActivitySizeItem key={index} item={item} />}
        />
        <Box>
          <ActivitySizeGraph data={postAnalytic?.data || []} />
        </Box>
      </CmtAdvCardContent>
    </CmtAdvCard>
  );
};

export default ActivitySize;
