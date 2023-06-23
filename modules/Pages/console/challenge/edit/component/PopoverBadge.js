import { Typography } from '@material-ui/core';
import { CheckBox, Close, Search } from '@material-ui/icons';
import {
  Avatar,
  Button,
  Checkbox,
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
import React, { useEffect, useState } from 'react';
import ScrollBar from 'react-perfect-scrollbar';

const PopoverBadge = ({ anchorEl, handleClose, itemKey, inputValue, handleInputChange }) => {
  const open = Boolean(anchorEl);
  const [search, setSearch] = useState('');
  const { data: listBadge, isLoading: loadingBadge } = useGetListBadgeQuery({ page: 0, limit: 10 });

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

        <ScrollBar style={{ height: 350, padding: '0 24px 16px 16px' }}>
          <Grid container spacing={2}>
            {loadingBadge ? (
              <Typography>Loading data...</Typography>
            ) : (
              listBadge?.data?.map((item, key) => (
                <Grid
                  key={key}
                  item
                  xs={6}
                  onClick={() => {
                    let prevVal = inputValue?.winner_ranking_badge;
                    prevVal[itemKey]['profile'] = item?._id;
                    prevVal[itemKey][`url_profile`] = item?.badgeProfile;
                    prevVal[itemKey]['other'] = item?._id;
                    prevVal[itemKey][`url_other`] = item?.badgeOther;

                    handleInputChange('winner_ranking_badge', prevVal);
                    handleClose();
                  }}>
                  <Stack
                    direction="column"
                    alignItems="center"
                    justifyContent="space-between"
                    spacing={2}
                    sx={{
                      height: '165px',
                      border: '2px solid #737373',
                      borderRadius: '8px',
                      padding: '12px',
                      '&:hover': {
                        borderColor: '#AB22AF',
                        cursor: 'pointer',
                        backgroundColor: '#ab22af1c',
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
              ))
            )}
          </Grid>
        </ScrollBar>
      </Stack>
    </Popover>
  );
};

export default PopoverBadge;
