import React, { useEffect, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Checkbox from '@mui/material/Checkbox';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from '@mui/material/TextField';
import useStyles from '../../../../help-center/bantuan-pengguna/index.style';
import { Box, Typography, Chip, FormGroup, FormControlLabel } from '@material-ui/core';
import { Divider, IconButton, InputAdornment, Popover, Radio, RadioGroup, Stack } from '@mui/material';
import { DateRange as DateRangePicker } from 'react-date-range';
import { DateRange, RemoveCircleOutline } from '@material-ui/icons';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import moment from 'moment';
import DelayedTextField from 'modules/Components/CommonComponent/DelayedTextField';
import { useGetGenreMusicQuery, useGetMoodMusicQuery, useGetThemeMusicQuery } from 'api/console/database/media';

const SearchSection = ({ filter, handleChange }) => {
  const classes = useStyles();
  const [value, setValue] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isDate, setDate] = useState(false);
  const handleChangeDelay = (e) => handleChange(e.target.name, e.target.value);

  const { data: genres, isFetching: loadingGenre } = useGetGenreMusicQuery();
  const { data: themes, isFetching: loadingTheme } = useGetThemeMusicQuery();
  const { data: moods, isFetching: loadingMood } = useGetMoodMusicQuery();

  useEffect(() => {
    if (!filter.createdAt[0] && !null) {
      setValue([
        {
          startDate: new Date(),
          endDate: new Date(),
          key: 'selection',
        },
      ]);
      setDate(false);
    }
  }, [filter.createdAt]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setValue([
      {
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
      },
    ]);
  };

  const handleClose = () => {
    setAnchorEl(null);
    // handleChange('createdAt', [null, null]);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <>
      <Box className={classes.inBuildAppCard} p={5} pt={2} maxWidth={270}>
        {/* <Accordion elevation={0} defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ padding: '0px', minHeight: '0px' }}>
            <Typography style={{ fontSize: '13px' }}>Tanggal Pengajuan</Typography>
          </AccordionSummary>
          <AccordionDetails style={{ padding: '0px' }}>
            <Stack direction={'column'} spacing={1} mb={3}>
              <Chip
                clickable
                onClick={() => {
                  handleChange('ticket_date', 7);
                  setWeek(1), setValue([null, null]);
                }}
                label="7 Hari"
                size="small"
                style={{ width: 'fit-content', height: 35, padding: '0 8px' }}
                variant={week == 1 ? 'default' : 'outlined'}
              />
              <Chip
                label="14 Hari"
                clickable
                onClick={() => {
                  handleChange('ticket_date', 14);
                  setWeek(2), setValue([null, null]);
                }}
                size="small"
                style={{ width: 'fit-content', height: 35, padding: '0 8px' }}
                variant={week === 2 ? 'default' : 'outlined'}
              />
              <Chip
                label="1 Bulan"
                clickable
                onClick={() => {
                  handleChange('ticket_date', 30);
                  setWeek(4), setValue([null, null]);
                }}
                size="small"
                style={{ width: 'fit-content', height: 35, padding: '0 8px' }}
                variant={week === 4 ? 'default' : 'outlined'}
              />
              <Chip
                label="3 Bulan"
                clickable
                onClick={() => {
                  handleChange('ticket_date', 90);
                  setWeek(12), setValue([null, null]);
                }}
                size="small"
                style={{ width: 'fit-content', height: 35, padding: '0 8px' }}
                variant={week === 12 ? 'default' : 'outlined'}
              />
            </Stack>

            <LocalizationProvider dateAdapter={AdapterDayjs} localeText={{ start: 'Start Date', end: 'End Date' }}>
              <DateRangePicker
                value={value}
                maxDate={getWeeksAfter(value[0], week)}
                onChange={(newValue) => {
                  handleChange('ticket_range', [newValue[0]?.format('YYYY-MM-DD'), newValue[1]?.format('YYYY-MM-DD')]);
                  setValue(newValue);
                  setWeek(null);
                }}
                renderInput={(startProps, endProps) => (
                  <>
                    <Stack direction={'row'} spacing={1}>
                      <TextField size="small" autoComplete="off" {...startProps} />
                      <TextField size="small" autoComplete="off" {...endProps} />
                    </Stack>
                  </>
                )}
              />
            </LocalizationProvider>
          </AccordionDetails>
        </Accordion> */}

        <Accordion elevation={0} defaultExpanded disableGutters>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ padding: '0px' }}>
            <Typography style={{ fontSize: '13px' }}>Judul Musik</Typography>
          </AccordionSummary>
          <AccordionDetails style={{ padding: 0 }}>
            <DelayedTextField
              fullWidth
              waitForInput={true}
              placeholder="Cari Musik"
              name="song"
              filterValue={filter.song}
              onChange={(e) => handleChangeDelay(e)}
            />
          </AccordionDetails>
          <Divider style={{ marginTop: 16 }} />
        </Accordion>

        <Accordion elevation={0} defaultExpanded disableGutters>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ padding: '0px' }}>
            <Typography style={{ fontSize: '13px' }}>Nama Artist</Typography>
          </AccordionSummary>
          <AccordionDetails style={{ padding: 0 }}>
            <DelayedTextField
              fullWidth
              waitForInput={true}
              placeholder="Cari Artis"
              name="artist"
              filterValue={filter.artist}
              onChange={(e) => handleChangeDelay(e)}
            />
          </AccordionDetails>
          <Divider style={{ marginTop: 16 }} />
        </Accordion>

        <Accordion elevation={0} defaultExpanded disableGutters>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ padding: '0px' }}>
            <Typography style={{ fontSize: '13px' }}>Tanggal Dibuat</Typography>
          </AccordionSummary>
          <AccordionDetails style={{ padding: 0 }}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <TextField
                value={
                  isDate
                    ? `${moment(value[0]?.startDate).format('DD/MM/YYYY')} - ${moment(value[0]?.endDate).format(
                        'DD/MM/YYYY',
                      )}`
                    : ''
                }
                color="secondary"
                placeholder="Pilih Tanggal"
                autoComplete="off"
                onClick={handleClick}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <DateRange />
                    </InputAdornment>
                  ),
                }}
              />
              {isDate && (
                <IconButton
                  style={{ height: 30, width: 30 }}
                  onClick={() => {
                    setValue([
                      {
                        startDate: new Date(),
                        endDate: new Date(),
                        key: 'selection',
                      },
                    ]);
                    setDate(false);
                    handleChange('createdAt', [null, null]);
                  }}>
                  <RemoveCircleOutline color="primary" />
                </IconButton>
              )}
            </Stack>

            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}>
              <DateRangePicker
                onChange={(item) => {
                  setValue([item.selection]);
                  handleChange('createdAt', [
                    moment(item.selection.startDate).format('YYYY-MM-DD'),
                    item.selection.endDate ? moment(item.selection.endDate).format('YYYY-MM-DD') : '',
                  ]);
                  setDate(true);
                }}
                dragSelectionEnabled={false}
                moveRangeOnFirstSelection={false}
                editableDateInputs={true}
                ranges={value}
                direction="horizontal"
              />
            </Popover>
          </AccordionDetails>
          <Divider style={{ marginTop: 16 }} />
        </Accordion>

        <Accordion elevation={0} defaultExpanded disableGutters>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ padding: '0px' }}>
            <Typography style={{ fontSize: '13px' }}>Tema</Typography>
          </AccordionSummary>
          <AccordionDetails style={{ padding: 0 }}>
            <FormGroup onChange={(e) => handleChange('theme', e.target.value)}>
              {loadingTheme ? (
                <Typography>Loading data...</Typography>
              ) : themes?.data?.length >= 1 ? (
                themes?.data?.map((item, key) => (
                  <FormControlLabel
                    key={key}
                    label={item?.name}
                    value={JSON.stringify(item)}
                    control={
                      <Checkbox
                        defaultChecked={false}
                        checked={filter.theme?.map((t) => t.name).includes(item?.name)}
                        color="secondary"
                      />
                    }
                  />
                ))
              ) : (
                <Typography>Tidak ada data.</Typography>
              )}
            </FormGroup>
          </AccordionDetails>
          <Divider style={{ marginTop: 16 }} />
        </Accordion>

        <Accordion elevation={0} defaultExpanded disableGutters>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ padding: '0px' }}>
            <Typography style={{ fontSize: '13px' }}>Genre</Typography>
          </AccordionSummary>
          <AccordionDetails style={{ padding: 0 }}>
            <FormGroup onChange={(e) => handleChange('genre', e.target.value)}>
              {loadingGenre ? (
                <Typography>Loading data...</Typography>
              ) : genres?.data?.length >= 1 ? (
                genres?.data?.map((item, key) => (
                  <FormControlLabel
                    key={key}
                    label={item?.name}
                    value={JSON.stringify(item)}
                    control={
                      <Checkbox
                        defaultChecked={false}
                        checked={filter.genre?.map((t) => t.name).includes(item?.name)}
                        color="secondary"
                      />
                    }
                  />
                ))
              ) : (
                <Typography>Tidak ada data.</Typography>
              )}
            </FormGroup>
          </AccordionDetails>
          <Divider style={{ marginTop: 16 }} />
        </Accordion>

        <Accordion elevation={0} defaultExpanded disableGutters>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ padding: '0px' }}>
            <Typography style={{ fontSize: '13px' }}>Suasana Hati</Typography>
          </AccordionSummary>
          <AccordionDetails style={{ padding: 0 }}>
            <FormGroup onChange={(e) => handleChange('mood', e.target.value)}>
              {loadingMood ? (
                <Typography>Loading data...</Typography>
              ) : moods?.data?.length >= 1 ? (
                moods?.data?.map((item, key) => (
                  <FormControlLabel
                    key={key}
                    label={item?.name}
                    value={JSON.stringify(item)}
                    control={
                      <Checkbox
                        defaultChecked={false}
                        checked={filter.mood?.map((t) => t.name).includes(item?.name)}
                        color="secondary"
                      />
                    }
                  />
                ))
              ) : (
                <Typography>Tidak ada data.</Typography>
              )}
            </FormGroup>
          </AccordionDetails>
          <Divider style={{ marginTop: 16 }} />
        </Accordion>

        <Accordion elevation={0} defaultExpanded disableGutters>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ padding: '0px' }}>
            <Typography style={{ fontSize: '13px' }}>Status</Typography>
          </AccordionSummary>
          <AccordionDetails style={{ padding: 0 }}>
            <FormGroup onChange={(e) => handleChange('status', e.target.value)}>
              <FormControlLabel
                label={'Aktif'}
                value="true"
                control={<Checkbox defaultChecked={false} checked={filter.status.includes('true')} color="secondary" />}
              />
              <FormControlLabel
                label={'Tidak Aktif'}
                value="false"
                control={<Checkbox defaultChecked={false} checked={filter.status.includes('false')} color="secondary" />}
              />
            </FormGroup>
          </AccordionDetails>
        </Accordion>
      </Box>
    </>
  );
};

export default SearchSection;
