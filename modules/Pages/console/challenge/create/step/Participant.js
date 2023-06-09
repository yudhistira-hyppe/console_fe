import { Typography } from '@material-ui/core';
import { InfoOutlined } from '@material-ui/icons';
import {
  Autocomplete,
  Box,
  Card,
  Checkbox,
  Chip,
  FormControlLabel,
  FormGroup,
  MenuItem,
  Select,
  Stack,
  TextField,
  Tooltip,
} from '@mui/material';
import React, { useState } from 'react';
import PopoverArea from '../component/PopoverArea';

const ComponentStepParticipant = ({ inputValue, handleInputChange }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Card sx={{ padding: 3 }}>
      <Stack direction="column" spacing={3}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography style={{ fontWeight: 'bold' }}>Tipe Partisipan</Typography>
          <Tooltip
            title={
              <Stack direction="column" p="8px">
                <Typography style={{ fontSize: 12 }}>
                  <strong>Dengan Undangan</strong>: Hanya user yang diundang yang dapat mengikuti challenge
                </Typography>
                <Typography style={{ fontSize: 12 }}>
                  <strong>Semua Pengguna</strong>: Semua user dapat mengikuti challenge
                </Typography>
              </Stack>
            }
            arrow>
            <InfoOutlined style={{ fontSize: 14 }} />
          </Tooltip>
        </Stack>

        <Stack direction="column" spacing={1}>
          <Typography>Tipe Akun</Typography>
          <FormGroup row style={{ gap: 16 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={inputValue?.account_type?.includes('unverified') || false}
                  onChange={() =>
                    handleInputChange(
                      'account_type',
                      inputValue?.account_type
                        ? inputValue?.account_type?.find((item) => item === 'unverified')
                          ? inputValue?.account_type?.filter((item) => item !== 'unverified')
                          : [...inputValue?.account_type, 'unverified']
                        : ['unverified'],
                    )
                  }
                  color="secondary"
                />
              }
              label={<Typography style={{ color: '#9B9B9B' }}>Tidak Terverifikasi</Typography>}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={inputValue?.account_type?.includes('verified') || false}
                  onChange={() =>
                    handleInputChange(
                      'account_type',
                      inputValue?.account_type
                        ? inputValue?.account_type?.find((item) => item === 'verified')
                          ? inputValue?.account_type?.filter((item) => item !== 'verified')
                          : [...inputValue?.account_type, 'verified']
                        : ['verified'],
                    )
                  }
                  color="secondary"
                />
              }
              label={<Typography style={{ color: '#9B9B9B' }}>Terverifikasi</Typography>}
            />
          </FormGroup>
        </Stack>

        <Stack direction="column" spacing={1}>
          <Typography>Rentang Umur</Typography>
          <FormGroup row style={{ gap: 16 }}>
            {['<14', '14-28', '29-43', '>44', 'lainnya'].map((item, key) => (
              <FormControlLabel
                key={key}
                control={
                  <Checkbox
                    color="secondary"
                    checked={inputValue?.age_range?.includes(item) || false}
                    onChange={() =>
                      handleInputChange(
                        'age_range',
                        inputValue?.age_range
                          ? inputValue?.age_range?.find((val) => val === item)
                            ? inputValue?.age_range?.filter((val) => val !== item)
                            : [...inputValue?.age_range, item]
                          : [item],
                      )
                    }
                  />
                }
                label={<Typography style={{ color: '#9B9B9B', textTransform: 'capitalize' }}>{item}</Typography>}
              />
            ))}
          </FormGroup>
        </Stack>

        <Stack direction="column" spacing={1}>
          <Typography>Jenis Kelamin</Typography>
          <FormGroup row style={{ gap: 16 }}>
            <FormControlLabel
              control={
                <Checkbox
                  color="secondary"
                  checked={inputValue?.gender?.includes('L') || false}
                  onChange={() =>
                    handleInputChange(
                      'gender',
                      inputValue?.gender
                        ? inputValue?.gender?.find((val) => val === 'L')
                          ? inputValue?.gender?.filter((val) => val !== 'L')
                          : [...inputValue?.gender, 'L']
                        : ['L'],
                    )
                  }
                />
              }
              label={<Typography style={{ color: '#9B9B9B' }}>Laki-laki</Typography>}
            />
            <FormControlLabel
              control={
                <Checkbox
                  color="secondary"
                  checked={inputValue?.gender?.includes('P') || false}
                  onChange={() =>
                    handleInputChange(
                      'gender',
                      inputValue?.gender
                        ? inputValue?.gender?.find((val) => val === 'P')
                          ? inputValue?.gender?.filter((val) => val !== 'P')
                          : [...inputValue?.gender, 'P']
                        : ['P'],
                    )
                  }
                />
              }
              label={<Typography style={{ color: '#9B9B9B' }}>Perempuan</Typography>}
            />
            <FormControlLabel
              control={
                <Checkbox
                  color="secondary"
                  checked={inputValue?.gender?.includes('O') || false}
                  onChange={() =>
                    handleInputChange(
                      'gender',
                      inputValue?.gender
                        ? inputValue?.gender?.find((val) => val === 'O')
                          ? inputValue?.gender?.filter((val) => val !== 'O')
                          : [...inputValue?.gender, 'O']
                        : ['O'],
                    )
                  }
                />
              }
              label={<Typography style={{ color: '#9B9B9B' }}>Lainnya</Typography>}
            />
          </FormGroup>
        </Stack>

        <Stack direction="column" spacing={1}>
          <Typography>Target Lokasi Pengguna</Typography>
          <Select
            value={inputValue?.area || []}
            multiple
            onOpen={handleClick}
            placeholder="Lokasi Pengguna"
            color="secondary"
            onSelect={() => console.log('waktu select')}
            open={false}
            renderValue={(selected) =>
              selected?.length < 1 ? (
                <Typography style={{ color: '#9B9B9B' }}>Pilih Lokasi Pengguna</Typography>
              ) : (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected?.map((value, key) => (
                    <Chip key={key} label={value?.stateName} />
                  ))}
                </Box>
              )
            }
            sx={{
              width: 450,
              '& .MuiInputBase-input': {
                padding: '14px 10px',
              },
            }}
            displayEmpty
          />

          <PopoverArea
            anchorEl={anchorEl}
            handleClose={handleClose}
            inputValue={inputValue}
            handleInputChange={handleInputChange}
          />
        </Stack>
      </Stack>
    </Card>
  );
};

export default ComponentStepParticipant;
