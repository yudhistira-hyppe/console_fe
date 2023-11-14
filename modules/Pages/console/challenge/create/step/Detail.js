import { Typography } from '@material-ui/core';
import { InfoOutlined } from '@material-ui/icons';
import { Card, Grid, IconButton, InputAdornment, MenuItem, Stack, Switch, TextField, Tooltip } from '@mui/material';
import { DatePicker, DateTimePicker } from '@mui/x-date-pickers';
import { useGetJenisChallengeQuery } from 'api/console/utilitas/challenge';
import dayjs from 'dayjs';
import { isNumber } from 'lodash';
import React, { useEffect, useState } from 'react';
import ModalStartHour from '../component/ModalStartHour';

const ComponentStepDetail = ({ inputValue, handleInputChange }) => {
  const { data: listJenis, isLoading: loadingJenis } = useGetJenisChallengeQuery({ limit: 100, page: 0 });
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (inputValue?.startdate && inputValue?.cycle >= 1 && inputValue?.cycle_day >= 1) {
      handleInputChange(
        'enddate',
        inputValue?.startdate.add((inputValue?.cycle ? inputValue?.cycle : 0) * inputValue?.cycle_day, 'day'),
      );

      if (!inputValue?.starthour || !inputValue?.starthour?.isValid()) {
        handleInputChange('starthour', inputValue?.startdate.hour(dayjs().get('hour')).minute(dayjs().get('minute')));
      } else {
        handleInputChange('starthour', inputValue?.startdate);
      }
    } else {
      handleInputChange('enddate', undefined);
      handleInputChange('starthour', undefined);
    }
  }, [inputValue?.cycle, inputValue?.cycle_day, inputValue?.startdate]);

  return (
    <Card sx={{ padding: 3 }}>
      <Typography style={{ fontWeight: 'bold' }}>Detail Challenge</Typography>
      <Grid container spacing={3} mt={3}>
        <Grid item xs={12} md={5}>
          <Stack direction="column" spacing={1}>
            <Typography>
              Nama Challenge<span style={{ color: 'red' }}>*</span>
            </Typography>
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
            <Typography>
              Jenis Challenge<span style={{ color: 'red' }}>*</span>
            </Typography>
            <TextField
              select
              color="secondary"
              value={inputValue?.kind || ''}
              onChange={(e) => {
                handleInputChange('kind', e.target.value);
                handleInputChange('cycle', 0);
                handleInputChange('cycle_day', 0);
                handleInputChange('startdate', null);
                handleInputChange('enddate', null);
                handleInputChange('starthour', null);
              }}
              SelectProps={{
                renderValue: (selected) => (
                  <Typography>{selected === '' ? 'Pilih Jenis Challenge' : selected?.name}</Typography>
                ),
                displayEmpty: true,
                MenuProps: {
                  PaperProps: {
                    style: {
                      maxHeight: 280,
                    },
                  },
                },
              }}>
              {loadingJenis ? (
                <MenuItem>Loading data...</MenuItem>
              ) : (
                listJenis?.data?.map((item, key) => (
                  <MenuItem value={item} key={key}>
                    <Stack direction="column">
                      <Typography>{item?.name || '-'}</Typography>
                      <Typography style={{ fontSize: 12, color: '#9B9B9B' }}>{item?.description || '-'}</Typography>
                    </Stack>
                  </MenuItem>
                ))
              )}
            </TextField>
          </Stack>
        </Grid>
        <Grid item xs={12} md={5}>
          <Stack direction="column" spacing={1}>
            <Typography>
              Durasi Siklus Challenge<span style={{ color: 'red' }}>*</span>
            </Typography>
            <TextField
              color="secondary"
              value={inputValue?.cycle_day || 0}
              sx={{
                '> div': {
                  paddingLeft: 0,
                },
              }}
              InputProps={{
                disabled: true,
                startAdornment: (
                  <InputAdornment
                    position="start"
                    style={{ backgroundColor: '#E0E0E0', height: 56, maxHeight: 56, width: 100 }}>
                    <Typography style={{ width: '100%', textAlign: 'center' }}>Hari</Typography>
                  </InputAdornment>
                ),
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
                          color: !inputValue?.cycle_day || inputValue?.cycle_day < 1 ? '#C9C9C9' : '#AB22AF',
                          border:
                            !inputValue?.cycle_day || inputValue?.cycle_day < 1 ? '1px solid #C9C9C9' : '1px solid #AB22AF',
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
                          color: '#AB22AF',
                          border: '1px solid #AB22AF',
                        }}>
                        +
                      </IconButton>
                    </Stack>
                  </InputAdornment>
                ),
              }}
            />
            <small style={{ color: '#9B9B9B' }}>Tentukan per-berapa hari siklus leaderboard akan direset</small>
          </Stack>
        </Grid>
        <Grid item xs={12} md={7}></Grid>
        <Grid item xs={12} md={5}>
          <Stack direction="column" spacing={1}>
            <Typography>
              Tentukan Jumlah Siklus Challenge<span style={{ color: 'red' }}>*</span>
            </Typography>
            <TextField
              color="secondary"
              value={inputValue?.cycle || 0}
              sx={{
                '> div': {
                  paddingLeft: 0,
                },
              }}
              InputProps={{
                disabled: true,
                startAdornment: (
                  <InputAdornment
                    position="start"
                    style={{ backgroundColor: '#E0E0E0', height: 56, maxHeight: 56, width: 100 }}>
                    <Typography style={{ width: '100%', textAlign: 'center' }}>Siklus</Typography>
                  </InputAdornment>
                ),
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
                          color: !inputValue?.cycle || inputValue?.cycle < 1 ? '#C9C9C9' : '#AB22AF',
                          border: !inputValue?.cycle || inputValue?.cycle < 1 ? '1px solid #C9C9C9' : '1px solid #AB22AF',
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
                          color: '#AB22AF',
                          border: '1px solid #AB22AF',
                        }}>
                        +
                      </IconButton>
                    </Stack>
                  </InputAdornment>
                ),
              }}
            />
            <small style={{ color: '#9B9B9B' }}>Tentukan berapa kali siklus challenge akan diputar</small>
          </Stack>

          {inputValue?.cycle >= 1 && inputValue?.cycle_day >= 1 && (
            <Stack direction="row" mt={3} style={{ padding: 12, backgroundColor: '#EDEDED', borderRadius: 6 }}>
              <Typography style={{ color: '#737373' }}>
                Total Durasi Kompetisi akan berlangsung selama{' '}
                <strong style={{ color: '#3F3F3F' }}>
                  {(inputValue?.cycle ? inputValue?.cycle : 0) * inputValue?.cycle_day} hari
                </strong>
              </Typography>
            </Stack>
          )}
        </Grid>
        <Grid item xs={12} md={7}></Grid>
        <Grid item xs={12} md={5}>
          <Stack direction="row">
            <Stack direction="column" spacing={1}>
              <Typography>
                Tanggal Mulai<span style={{ color: 'red' }}>*</span>
              </Typography>
              <DatePicker
                value={inputValue?.startdate || null}
                minDate={dayjs().add(1, 'day').toDate()}
                onChange={(newValue) => {
                  if (newValue !== null && newValue?.isValid()) {
                    handleInputChange('startdate', newValue.hour(dayjs().get('hour')).minute(dayjs().get('minute')));
                  } else {
                    handleInputChange('startdate', undefined);
                    handleInputChange('enddate', undefined);
                    handleInputChange('starthour', undefined);
                  }
                }}
                inputFormat="DD/MM/YYYY"
                renderInput={(params) => <TextField color="secondary" {...params} />}
              />
            </Stack>
            <Stack direction="column" spacing={1}>
              <Typography>Tanggal Berakhir</Typography>
              <DatePicker
                value={inputValue?.enddate || null}
                onChange={() => {}}
                inputFormat="DD/MM/YYYY"
                renderInput={(params) => <TextField {...params} style={{ backgroundColor: '#EAEAEA' }} disabled />}
                disabled
              />
            </Stack>
          </Stack>
        </Grid>
        <Grid item xs={12} md={5}>
          <Stack direction="column" spacing={1}>
            <Typography>
              Waktu Mulai<span style={{ color: 'red' }}>*</span>
            </Typography>
            <DateTimePicker
              value={inputValue?.starthour || null}
              onChange={(newValue) => {
                handleInputChange('starthour', newValue);

                if (inputValue?.enddate) {
                  handleInputChange(
                    'startdate',
                    dayjs(inputValue?.startdate).hour(newValue.get('hour')).minute(newValue.get('minute')),
                  );
                  handleInputChange(
                    'enddate',
                    dayjs(inputValue?.enddate).hour(newValue.get('hour')).minute(newValue.get('minute')),
                  );
                }
              }}
              open={false}
              onOpen={() => setOpenModal(true)}
              inputFormat="HH:mm"
              views={['hours', 'minutes']}
              renderInput={(params) => (
                <TextField
                  color="secondary"
                  style={{
                    backgroundColor:
                      inputValue?.startdate && inputValue?.cycle && inputValue?.cycle_day ? 'transparent' : '#EAEAEA',
                  }}
                  {...params}
                />
              )}
              style={{
                backgroundColor:
                  inputValue?.startdate && inputValue?.cycle && inputValue?.cycle_day ? 'transparent' : '#EAEAEA',
              }}
              InputProps={{
                onKeyDown: (event) => {
                  event.preventDefault();
                },
              }}
              disabled={!inputValue?.enddate}
            />
          </Stack>
        </Grid>
        <Grid item xs={12} md={10}>
          <Stack direction="column" spacing={1}>
            <Typography>
              Deskripsi Challenge<span style={{ color: 'red' }}>*</span>
            </Typography>
            <TextField
              placeholder="Tulis Nama Challenge"
              color="secondary"
              multiline
              rows={4}
              value={inputValue?.description || ''}
              onChange={(e) => handleInputChange('description', e.target.value)}
              inputProps={{ maxLength: 3000 }}
            />
            <small style={{ color: '#9B9B9B' }}>{inputValue?.description?.length || 0}/3000 Karakter</small>
          </Stack>
        </Grid>
        <Grid item xs={12} md={5}>
          <Stack direction="column" spacing={1}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography>Tampilkan Status Pengguna</Typography>
              <Tooltip
                title={
                  <Typography style={{ fontSize: 12, padding: 8 }}>
                    Gunakan opsi ini untuk menampilkan peringkat partisipan pada leaderboard.
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

      <ModalStartHour
        showModal={openModal}
        selectedItem={inputValue?.starthour}
        onClose={() => setOpenModal(false)}
        onSubmit={(val) => {
          handleInputChange('starthour', dayjs(inputValue?.startdate).hour(val.hour).minute(val.minute));

          if (inputValue?.enddate) {
            handleInputChange('startdate', dayjs(inputValue?.startdate).hour(val.hour).minute(val.minute));
            handleInputChange('enddate', dayjs(inputValue?.enddate).hour(val.hour).minute(val.minute));
          }
          setOpenModal(false);
        }}
      />
    </Card>
  );
};

export default ComponentStepDetail;
