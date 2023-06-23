import { Typography } from '@material-ui/core';
import { CheckBox, Close, Search } from '@material-ui/icons';
import {
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
import { useGetAreasQuery } from 'api/user/insight';
import React, { useEffect, useState } from 'react';
import ScrollBar from 'react-perfect-scrollbar';

const PopoverArea = ({ anchorEl, handleClose, inputValue, handleInputChange }) => {
  const open = Boolean(anchorEl);
  const [search, setSearch] = useState('');
  const [selectedArea, setSelectedArea] = useState([]);
  const { data: areas, isLoading: loadingArea } = useGetAreasQuery();

  useEffect(() => {
    if (inputValue?.area?.length >= 1) {
      setTimeout(() => {
        setSelectedArea(inputValue?.area);
      }, 500);
    }
    setSearch('');
  }, [open]);

  const filteredArea = areas?.filter((item) => item?.stateName.toLowerCase()?.includes(search.toLowerCase()));

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
          <Typography style={{ fontWeight: 'bold' }}>Lokasi</Typography>
          <IconButton
            size="small"
            onClick={() => {
              handleClose();
              setTimeout(() => {
                setSelectedArea([]);
              }, 500);
            }}>
            <Close style={{ fontSize: 20 }} />
          </IconButton>
        </Stack>

        <TextField
          size="small"
          placeholder="Cari Lokasi..."
          color="secondary"
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start" style={{ paddingRight: 6 }}>
                <Search />
              </InputAdornment>
            ),
          }}
          sx={{ '& input': { height: 32 } }}
          style={{ padding: '0 16px 16px' }}
        />

        <ScrollBar style={{ height: 200, padding: '0 16px' }}>
          <Grid container>
            {loadingArea ? (
              <Typography>Loading data...</Typography>
            ) : (
              filteredArea?.map((item, key) => (
                <Grid key={key} item xs={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="secondary"
                        checked={selectedArea?.map((area) => area?._id).includes(item?._id)}
                        onChange={() =>
                          setSelectedArea((prev) => {
                            return prev?.find((area) => area?._id === item?._id)
                              ? prev?.filter((area) => area?._id !== item?._id)
                              : [...prev, item];
                          })
                        }
                      />
                    }
                    label={<Typography style={{ color: '#9B9B9B', fontSize: 14 }}>{item?.stateName}</Typography>}
                  />
                </Grid>
              ))
            )}
          </Grid>
        </ScrollBar>

        <Divider style={{ margin: '16px 0' }} flexItem />

        <Stack direction="row" alignItems="center" justifyContent="flex-end" spacing={2} style={{ padding: '0 16px 16px' }}>
          <Button
            variant="outlined"
            color="secondary"
            style={{ borderRadius: 6, padding: '8px 14px' }}
            onClick={() => setSelectedArea([])}>
            <Typography style={{ textTransform: 'capitalize', fontWeight: 'bold', fontSize: 14 }}>Reset</Typography>
          </Button>
          <Button
            variant="contained"
            color="secondary"
            style={{ borderRadius: 6, padding: '8px 14px' }}
            onClick={() => {
              handleClose();
              handleInputChange('area', selectedArea);
            }}
            disabled={selectedArea?.length < 1}>
            <Typography style={{ textTransform: 'capitalize', fontWeight: 'bold', fontSize: 14 }}>Terapkan</Typography>
          </Button>
        </Stack>
      </Stack>
    </Popover>
  );
};

export default PopoverArea;
