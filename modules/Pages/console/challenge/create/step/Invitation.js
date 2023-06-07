import { Typography } from '@material-ui/core';
import { InfoOutlined } from '@material-ui/icons';
import { Card, Grid, MenuItem, Stack, TextField, Tooltip } from '@mui/material';
import React from 'react';

const ComponentStepInvitation = ({ inputValue, handleInputChange }) => {
  return (
    <Card sx={{ padding: 3 }}>
      <Stack direction="row" alignItems="center" spacing={1}>
        <Typography style={{ fontWeight: 'bold' }}>Cara Bergabung</Typography>
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

      <Grid container mt={3} spacing={3}>
        <Grid item xs={12} md={4}>
          <Stack direction="column" spacing={1}>
            <Typography>Tipe</Typography>
            <TextField
              select
              color="secondary"
              value={inputValue?.type_invitation || ''}
              onChange={(e) => {
                handleInputChange('type_invitation', e.target.value);
              }}
              SelectProps={{
                renderValue: (selected) => (
                  <Typography>
                    {selected === '' && 'Pilih Tipe'}
                    {selected === 'all' && 'Semua Pengguna'}
                    {selected === 'invitation' && 'Dengan Undangan'}
                  </Typography>
                ),
                displayEmpty: true,
              }}>
              <MenuItem value="all">
                <Stack direction="column">
                  <Typography>Semua Pengguna</Typography>
                  <Typography style={{ fontSize: 12, color: '#9B9B9B' }}>
                    Challenge akan diikuti oleh semua pengguna
                  </Typography>
                </Stack>
              </MenuItem>
              <MenuItem value="invitation">
                <Stack direction="column">
                  <Typography>Dengan Undangan</Typography>
                  <Typography style={{ fontSize: 12, color: '#9B9B9B' }}>
                    Challenge hanya akan diikuti oleh pengguna yang diundang
                  </Typography>
                </Stack>
              </MenuItem>
            </TextField>
          </Stack>
        </Grid>
        {inputValue?.type_invitation === 'invitation' && (
          <Grid item xs={12} md={2}>
            <Stack direction="column" spacing={1}>
              <Typography>Total Partisipan</Typography>
              <Typography
                style={{
                  width: 118,
                  padding: '15px 0',
                  textAlign: 'center',
                  backgroundColor: '#EEEEEE',
                  borderRadius: 6,
                }}>
                0
              </Typography>
            </Stack>
          </Grid>
        )}
      </Grid>
    </Card>
  );
};

export default ComponentStepInvitation;
