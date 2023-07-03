import { Typography } from '@material-ui/core';
import { CheckBox, Close, Delete, Search } from '@material-ui/icons';
import {
  Avatar,
  Button,
  Checkbox,
  CircularProgress,
  Divider,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  Popover,
  Stack,
  TextField,
} from '@mui/material';
import { useGetListBadgeQuery } from 'api/console/utilitas/badge';
import DelayedTextField from 'modules/Components/CommonComponent/DelayedTextField';
import React, { useEffect, useState } from 'react';
import ScrollBar from 'react-perfect-scrollbar';

const PopoverBadge = ({ anchorEl, handleClose, itemKey, inputValue, handleInputChange }) => {
  const open = Boolean(anchorEl);
  const [search, setSearch] = useState('');
  const { data: listBadge, isFetching: loadingBadge } = useGetListBadgeQuery({
    page: 0,
    limit: 40,
    ascending: false,
    search: search,
  });

  useEffect(() => {
    setTimeout(() => setSearch(''), 200);
  }, [anchorEl]);

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      sx={{
        '& .MuiPopover-paper': {
          borderRadius: '8px',
          boxShadow: '0 0 10px 5px rgba(0,0,0,0.14)',
        },
      }}>
      <Stack direction="column" style={{ width: 450 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" style={{ padding: 16 }}>
          <Typography style={{ fontWeight: 'bold' }}>Leaderboard Badge</Typography>
          <IconButton
            size="small"
            onClick={() => {
              handleClose();
            }}>
            <Close style={{ fontSize: 20 }} />
          </IconButton>
        </Stack>

        <DelayedTextField
          fullWidth
          waitForInput={true}
          placeholder="Cari berdasarkan nama badge"
          filterValue={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: '0 24px 16px 16px' }}
          InputProps={{
            endAdornment: search?.length >= 1 && (
              <InputAdornment position="start">
                <IconButton aria-label="toggle password visibility" edge="end" onClick={() => setSearch('')}>
                  <Delete style={{ fontSize: 16 }} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          color="secondary"
        />

        {loadingBadge ? (
          <Stack direction="column" alignItems="center" justifyContent="center" height={350} spacing={2}>
            <CircularProgress color="secondary" />
            <Typography style={{ fontFamily: 'Normal' }}>loading data...</Typography>
          </Stack>
        ) : (
          <ScrollBar style={{ height: 350, padding: '0 24px 16px 16px' }}>
            <Grid container spacing={2}>
              {listBadge?.data?.map((item, key) => (
                <Grid
                  key={key}
                  item
                  xs={6}
                  onClick={() => {
                    if (!inputValue?.winner_ranking_badge?.map((item) => item?.profile).includes(item?._id)) {
                      let prevVal = inputValue?.winner_ranking_badge;
                      prevVal[itemKey]['profile'] = item?._id;
                      prevVal[itemKey][`url_profile`] = item?.badgeProfile;
                      prevVal[itemKey]['other'] = item?._id;
                      prevVal[itemKey][`url_other`] = item?.badgeOther;

                      handleInputChange('winner_ranking_badge', prevVal);
                      handleClose();
                    }
                  }}>
                  <Stack
                    direction="column"
                    alignItems="center"
                    justifyContent="space-between"
                    spacing={2}
                    sx={{
                      height: '165px',
                      border: inputValue?.winner_ranking_badge?.map((item) => item?.profile).includes(item?._id)
                        ? '2px solid #DDDDDD'
                        : '2px solid #737373',
                      background: inputValue?.winner_ranking_badge?.map((item) => item?.profile).includes(item?._id)
                        ? '#EEEEEE'
                        : 'transparent',
                      borderRadius: '8px',
                      padding: '12px',
                      '&:hover': {
                        borderColor: inputValue?.winner_ranking_badge?.map((item) => item?.profile).includes(item?._id)
                          ? ''
                          : '#AB22AF',
                        cursor: inputValue?.winner_ranking_badge?.map((item) => item?.profile).includes(item?._id)
                          ? 'not-allowed'
                          : 'pointer',
                        backgroundColor: inputValue?.winner_ranking_badge?.map((item) => item?.profile).includes(item?._id)
                          ? ''
                          : '#ab22af1c',
                      },
                    }}>
                    <Typography style={{ fontWeight: 'bold', fontSize: 14, height: 42, overflow: 'hidden' }}>
                      {item?.name || '-'}
                    </Typography>
                    <Stack direction="row" spacing={2}>
                      <Avatar src={item?.badgeProfile} alt="" style={{ height: 80, width: 80 }} />
                      <Avatar src={item?.badgeOther} alt="" style={{ height: 80, width: 80 }} />
                    </Stack>
                  </Stack>
                </Grid>
              ))}
            </Grid>
          </ScrollBar>
        )}
      </Stack>
    </Popover>
  );
};

export default PopoverBadge;
