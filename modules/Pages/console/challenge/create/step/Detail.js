import { Typography } from '@material-ui/core';
import { InfoOutlined } from '@material-ui/icons';
import { Card, Grid, IconButton, InputAdornment, MenuItem, Stack, Switch, TextField, Tooltip } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { isNumber } from 'lodash';
import React from 'react';

const ComponentStepDetail = ({ inputValue, handleInputChange }) => {
  return (
    <Card sx={{ padding: 3 }}>
      <Typography style={{ fontWeight: 'bold' }}>Detail Challenge</Typography>
      <Grid container spacing={3} mt={3}>
        <Grid item xs={12} md={5}>
          <Stack direction="column" spacing={1}>
            <Typography>Nama Challenge</Typography>
            <TextField
              placeholder="Tulis Nama Challenge"
              color="secondary"
              value={inputValue?.name || ''}
              inputProps={{ maxLength: 30 }}
              onChange={(e) => handleInputChange('name', e.target.value)}
            />
            <small style={{ color: '#9B9B9B' }}>{inputValue?.name?.length || 0}/30 Karakter</small>
          </Stack>
        </Grid>
        <Grid item xs={12} md={5}>
          <Stack direction="column" spacing={1}>
            <Typography>Jenis Challenge</Typography>
            <TextField
              select
              color="secondary"
              value={inputValue?.kind || ''}
              onChange={(e) => {
                handleInputChange('kind', e.target.value);
                handleInputChange('week', 0);
              }}
              SelectProps={{
                renderValue: (selected) => (
                  <Typography>
                    {selected === '' && 'Pilih Jenis Challenge'}
                    {selected === 'main' && 'Challenge Utama'}
                    {selected === 'other' && 'Challenge Lainnya'}
                  </Typography>
                ),
                displayEmpty: true,
              }}>
              <MenuItem value="main">
                <Stack direction="column">
                  <Typography>Challenge Utama</Typography>
                  <Typography style={{ fontSize: 12, color: '#9B9B9B' }}>Challenge yang tidak bisa dihapus</Typography>
                </Stack>
              </MenuItem>
              <MenuItem value="other">
                <Stack direction="column">
                  <Typography>Challenge Lainnya</Typography>
                  <Typography style={{ fontSize: 12, color: '#9B9B9B' }}>
                    Challenge yang bisa selesai atau dihapus
                  </Typography>
                </Stack>
              </MenuItem>
            </TextField>
          </Stack>
        </Grid>
        <Grid item xs={12} md={5}>
          <Stack direction="column" spacing={1}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography>Durasi</Typography>
              <Tooltip
                title={
                  <Typography style={{ fontSize: 12, padding: 8 }}>Atur durasi challenge yang akan berlangsung</Typography>
                }
                arrow>
                <InfoOutlined style={{ fontSize: 14 }} />
              </Tooltip>
            </Stack>
            <TextField
              color="secondary"
              value={`${inputValue?.week || 0} Minggu`}
              InputProps={{
                disabled: true,
                endAdornment: (
                  <InputAdornment>
                    <Stack direction="row" spacing={1}>
                      <IconButton
                        onClick={() => handleInputChange('week', (isNumber(inputValue?.week) ? inputValue?.week : 0) - 1)}
                        size="small"
                        style={{
                          width: 24,
                          height: 24,
                          fontSize: 28,
                          paddingBottom: 8,
                          border: !inputValue?.week || inputValue?.week < 1 ? '1px solid #C9C9C9' : '1px solid #3F3F3F',
                        }}
                        disabled={!inputValue?.week || inputValue?.week < 1}>
                        -
                      </IconButton>
                      <IconButton
                        onClick={() => handleInputChange('week', (isNumber(inputValue?.week) ? inputValue?.week : 0) + 1)}
                        size="small"
                        style={{
                          width: 24,
                          height: 24,
                          fontSize: 24,
                          border:
                            (inputValue?.kind === 'main' && inputValue?.week >= 104) ||
                            (inputValue?.kind === 'other' && inputValue?.week >= 54)
                              ? '1px solid #C9C9C9'
                              : '1px solid #3F3F3F',
                        }}
                        disabled={
                          (inputValue?.kind === 'main' && inputValue?.week >= 104) ||
                          (inputValue?.kind === 'other' && inputValue?.week >= 54)
                        }>
                        +
                      </IconButton>
                    </Stack>
                  </InputAdornment>
                ),
              }}
            />
            <small style={{ color: '#9B9B9B' }}>Challenge akan di reset setiap 7 hari</small>
          </Stack>
        </Grid>
        <Grid item xs={12} md={2.5}>
          <Stack direction="column" spacing={1}>
            <Typography>Tanggal Mulai</Typography>
            <DatePicker
              value={inputValue?.startdate || null}
              minDate={dayjs().add(1, 'day').toDate()}
              onChange={(newValue) => {
                handleInputChange('startdate', newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </Stack>
        </Grid>
        <Grid item xs={12} md={2.5}>
          <Stack direction="column" spacing={1}>
            <Typography>Tanggal Berakhir</Typography>
            <DatePicker
              value={
                inputValue?.startdate
                  ? inputValue?.week
                    ? inputValue?.startdate.add(inputValue?.week * 7, 'day').toDate()
                    : null
                  : null
              }
              onChange={(newValue) => {
                handleInputChange('startdate', newValue);
              }}
              renderInput={(params) => <TextField {...params} disabled />}
              disabled
            />
          </Stack>
        </Grid>
        <Grid item xs={12} md={10}>
          <Stack direction="column" spacing={1}>
            <Typography>Deskripsi Challenge</Typography>
            <TextField
              placeholder="Tulis Nama Challenge"
              color="secondary"
              multiline
              rows={4}
              value={inputValue?.description || ''}
              onChange={(e) => handleInputChange('description', e.target.value)}
              inputProps={{ maxLength: 300 }}
            />
            <small style={{ color: '#9B9B9B' }}>{inputValue?.description?.length || 0}/300 Karakter</small>
          </Stack>
        </Grid>
        <Grid item xs={12} md={5}>
          <Stack direction="column" spacing={1}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography>Tampilkan Status Pengguna</Typography>
              <Tooltip
                title={
                  <Typography style={{ fontSize: 12, padding: 8 }}>
                    Status pengguna (poin) yang telah dikumpulkan dihalaman leaderboard challenge
                  </Typography>
                }
                arrow>
                <InfoOutlined style={{ fontSize: 14 }} />
              </Tooltip>
            </Stack>
            <Switch
              checked={inputValue?.show_status_user || false}
              color="secondary"
              onChange={() => handleInputChange('show_status_user', !inputValue?.show_status_user)}
            />
          </Stack>
        </Grid>
      </Grid>
    </Card>
  );
};

export default ComponentStepDetail;
