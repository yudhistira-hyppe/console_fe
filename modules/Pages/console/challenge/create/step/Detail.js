import { Typography } from '@material-ui/core';
import { InfoOutlined } from '@material-ui/icons';
import { Card, Grid, IconButton, InputAdornment, MenuItem, Stack, Switch, TextField, Tooltip } from '@mui/material';
import { DatePicker, DateTimePicker } from '@mui/x-date-pickers';
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
                handleInputChange('cycle', 0);
                handleInputChange('cycle_day', 0);
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
            <Typography>Siklus Perulangan</Typography>
            <TextField
              color="secondary"
              value={inputValue?.cycle || 0}
              InputProps={{
                disabled: true,
                endAdornment: (
                  <InputAdornment position="end">
                    <Stack direction="row" spacing={1}>
                      <IconButton
                        onClick={() => handleInputChange('cycle', (isNumber(inputValue?.cycle) ? inputValue?.cycle : 0) - 1)}
                        size="small"
                        style={{
                          width: 24,
                          height: 24,
                          fontSize: 28,
                          paddingBottom: 8,
                          border: !inputValue?.cycle || inputValue?.cycle < 1 ? '1px solid #C9C9C9' : '1px solid #3F3F3F',
                        }}
                        disabled={!inputValue?.cycle || inputValue?.cycle < 1}>
                        -
                      </IconButton>
                      <IconButton
                        onClick={() => handleInputChange('cycle', (isNumber(inputValue?.cycle) ? inputValue?.cycle : 0) + 1)}
                        size="small"
                        style={{
                          width: 24,
                          height: 24,
                          fontSize: 24,
                          border:
                            (inputValue?.kind === 'main' && inputValue?.cycle >= 104) ||
                            (inputValue?.kind === 'other' && inputValue?.cycle >= 54)
                              ? '1px solid #C9C9C9'
                              : '1px solid #3F3F3F',
                        }}
                        disabled={
                          (inputValue?.kind === 'main' && inputValue?.cycle >= 104) ||
                          (inputValue?.kind === 'other' && inputValue?.cycle >= 54)
                        }>
                        +
                      </IconButton>
                    </Stack>
                  </InputAdornment>
                ),
              }}
            />
            <small style={{ color: '#9B9B9B' }}>Berapa kali leaderboard akan direset</small>
          </Stack>
        </Grid>
        <Grid item xs={12} md={7}></Grid>
        <Grid item xs={12} md={5}>
          <Stack direction="column" spacing={1}>
            <Typography>Lama Siklus</Typography>
            <TextField
              color="secondary"
              value={`${inputValue?.cycle_day || 0} Hari`}
              InputProps={{
                disabled: true,
                endAdornment: (
                  <InputAdornment position="end">
                    <Stack direction="row" spacing={1}>
                      <IconButton
                        onClick={() =>
                          handleInputChange('cycle_day', (isNumber(inputValue?.cycle_day) ? inputValue?.cycle_day : 0) - 1)
                        }
                        size="small"
                        style={{
                          width: 24,
                          height: 24,
                          fontSize: 28,
                          paddingBottom: 8,
                          border:
                            !inputValue?.cycle_day || inputValue?.cycle_day < 1 ? '1px solid #C9C9C9' : '1px solid #3F3F3F',
                        }}
                        disabled={!inputValue?.cycle_day || inputValue?.cycle_day < 1}>
                        -
                      </IconButton>
                      <IconButton
                        onClick={() =>
                          handleInputChange('cycle_day', (isNumber(inputValue?.cycle_day) ? inputValue?.cycle_day : 0) + 1)
                        }
                        size="small"
                        style={{
                          width: 24,
                          height: 24,
                          fontSize: 24,
                          border:
                            (inputValue?.kind === 'main' && inputValue?.cycle_day >= 104) ||
                            (inputValue?.kind === 'other' && inputValue?.cycle_day >= 54)
                              ? '1px solid #C9C9C9'
                              : '1px solid #3F3F3F',
                        }}
                        disabled={
                          (inputValue?.kind === 'main' && inputValue?.cycle_day >= 104) ||
                          (inputValue?.kind === 'other' && inputValue?.cycle_day >= 54)
                        }>
                        +
                      </IconButton>
                    </Stack>
                  </InputAdornment>
                ),
              }}
            />
            <small style={{ color: '#9B9B9B' }}>
              Leaderboad pada challenge akan direset berdasarakan hari yang ditetukan
            </small>
          </Stack>

          {inputValue?.cycle_day >= 1 && (
            <Typography style={{ color: '#FC5555', fontWeight: 'bold', marginTop: 24 }}>
              Durasi challenge akan berlangsung selama{' '}
              {((inputValue?.cycle ? inputValue?.cycle : 0) + 1) * inputValue?.cycle_day} hari
            </Typography>
          )}
        </Grid>
        <Grid item xs={12} md={7}></Grid>
        <Grid item xs={12} md={5}>
          <Stack direction="row">
            <Stack direction="column" spacing={1}>
              <Typography>Tanggal Mulai</Typography>
              <DatePicker
                value={inputValue?.startdate || null}
                minDate={dayjs().add(1, 'day').toDate()}
                onChange={(newValue) => {
                  handleInputChange('startdate', newValue);
                }}
                inputFormat="DD/MM/YYYY"
                renderInput={(params) => <TextField color="secondary" {...params} />}
              />
            </Stack>
            <Stack direction="column" spacing={1}>
              <Typography>Tanggal Berakhir</Typography>
              <DatePicker
                value={
                  inputValue?.startdate
                    ? inputValue?.cycle_day
                      ? inputValue?.startdate
                          .add(((inputValue?.cycle ? inputValue?.cycle : 0) + 1) * inputValue?.cycle_day, 'day')
                          .toDate()
                      : null
                    : null
                }
                inputFormat="DD/MM/YYYY"
                renderInput={(params) => <TextField {...params} style={{ backgroundColor: '#E0E0E0' }} disabled />}
                disabled
              />
            </Stack>
          </Stack>
        </Grid>
        <Grid item xs={12} md={5}>
          <Stack direction="column" spacing={1}>
            <Typography>Waktu Mulai</Typography>
            <DateTimePicker
              value={inputValue?.starthour || null}
              onChange={(newValue) => {
                handleInputChange('starthour', newValue);
              }}
              inputFormat="HH:mm WIB"
              views={['hours', 'minutes']}
              renderInput={(params) => <TextField color="secondary" {...params} />}
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
