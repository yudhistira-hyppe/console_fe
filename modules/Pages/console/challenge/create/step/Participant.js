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
              control={<Checkbox color="secondary" />}
              label={<Typography style={{ color: '#9B9B9B' }}>Tidak Terverifikasi</Typography>}
            />
            <FormControlLabel
              control={<Checkbox color="secondary" />}
              label={<Typography style={{ color: '#9B9B9B' }}>Terverifikasi</Typography>}
            />
          </FormGroup>
        </Stack>

        <Stack direction="column" spacing={1}>
          <Typography>Rentang Umur</Typography>
          <FormGroup row style={{ gap: 16 }}>
            <FormControlLabel
              control={<Checkbox color="secondary" />}
              label={<Typography style={{ color: '#9B9B9B' }}>{`< 14`}</Typography>}
            />
            <FormControlLabel
              control={<Checkbox color="secondary" />}
              label={<Typography style={{ color: '#9B9B9B' }}>14 - 28</Typography>}
            />
            <FormControlLabel
              control={<Checkbox color="secondary" />}
              label={<Typography style={{ color: '#9B9B9B' }}>29 - 43</Typography>}
            />
            <FormControlLabel
              control={<Checkbox color="secondary" />}
              label={<Typography style={{ color: '#9B9B9B' }}>{`> 44`}</Typography>}
            />
            <FormControlLabel
              control={<Checkbox color="secondary" />}
              label={<Typography style={{ color: '#9B9B9B' }}>Lainnya</Typography>}
            />
          </FormGroup>
        </Stack>

        <Stack direction="column" spacing={1}>
          <Typography>Jenis Kelamin</Typography>
          <FormGroup row style={{ gap: 16 }}>
            <FormControlLabel
              control={<Checkbox color="secondary" />}
              label={<Typography style={{ color: '#9B9B9B' }}>Laki-laki</Typography>}
            />
            <FormControlLabel
              control={<Checkbox color="secondary" />}
              label={<Typography style={{ color: '#9B9B9B' }}>Perempuan</Typography>}
            />
            <FormControlLabel
              control={<Checkbox color="secondary" />}
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
