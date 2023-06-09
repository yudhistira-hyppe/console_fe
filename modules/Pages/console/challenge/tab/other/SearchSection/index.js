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
import DelayedTextField from 'modules/Components/CommonComponent/DelayedTextField';
import { DateRange as DateRangePicker } from 'react-date-range';
import { DateRange, RemoveCircleOutline } from '@material-ui/icons';
import moment from 'moment';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

const SearchSection = ({ filter, handleChange }) => {
  const classes = useStyles();
  const [week, setWeek] = useState(null);
  const [value, setValue] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);
  const [isDate, setDate] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    if (!filter.createdAt[0] && !filter.createdAt[1]) {
      setWeek(null);
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
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <>
      <Box className={classes.inBuildAppCard} p={5} pt={2} maxWidth={270}>
        <Accordion elevation={0} defaultExpanded disableGutters>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ padding: '0px' }}>
            <Typography style={{ fontSize: '13px' }}>Nama Challenge</Typography>
          </AccordionSummary>
          <AccordionDetails style={{ padding: 0 }}>
            <DelayedTextField
              fullWidth
              waitForInput={true}
              placeholder="Cari Challenge"
              name="search"
              filterValue={filter.search}
              onChange={(e) => handleChange('search', e.target.value)}
              color="secondary"
            />
          </AccordionDetails>
          <Divider style={{ marginTop: 16 }} />
        </Accordion>

        <Accordion elevation={0} defaultExpanded disableGutters>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ padding: '0px', minHeight: '0px' }}>
            <Typography style={{ fontSize: '13px' }}>Terakhir Ditambahkan</Typography>
          </AccordionSummary>
          <AccordionDetails style={{ padding: '0px' }}>
            <Stack direction={'column'} spacing={1} mb={3}>
              <Chip
                clickable
                onClick={() => {
                  if (week === 1) {
                    setWeek(null);
                    handleChange('createdAt', ['', '']);
                    setDate(false);
                  } else {
                    setDate(true);
                    handleChange('createdAt', [
                      moment().subtract(7, 'd').format('YYYY-MM-DD'),
                      moment().format('YYYY-MM-DD'),
                    ]);
                    setWeek(1);
                    setValue([
                      {
                        startDate: new Date().setDate(new Date().getDate() - 7),
                        endDate: new Date(),
                        key: 'selection',
                      },
                    ]);
                  }
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
                  if (week === 2) {
                    setWeek(null);
                    handleChange('createdAt', ['', '']);
                    setDate(false);
                  } else {
                    setDate(true);
                    handleChange('createdAt', [
                      moment().subtract(14, 'd').format('YYYY-MM-DD'),
                      moment().format('YYYY-MM-DD'),
                    ]);
                    setWeek(2);
                    setValue([
                      {
                        startDate: new Date().setDate(new Date().getDate() - 14),
                        endDate: new Date(),
                        key: 'selection',
                      },
                    ]);
                  }
                }}
                size="small"
                style={{ width: 'fit-content', height: 35, padding: '0 8px' }}
                variant={week === 2 ? 'default' : 'outlined'}
              />
              <Chip
                label="1 Bulan"
                clickable
                onClick={() => {
                  if (week === 4) {
                    setWeek(null);
                    handleChange('createdAt', ['', '']);
                    setDate(false);
                  } else {
                    setDate(true);
                    handleChange('createdAt', [
                      moment().subtract(30, 'd').format('YYYY-MM-DD'),
                      moment().format('YYYY-MM-DD'),
                    ]);
                    setWeek(4);
                    setValue([
                      {
                        startDate: new Date().setDate(new Date().getDate() - 30),
                        endDate: new Date(),
                        key: 'selection',
                      },
                    ]);
                  }
                }}
                size="small"
                style={{ width: 'fit-content', height: 35, padding: '0 8px' }}
                variant={week === 4 ? 'default' : 'outlined'}
              />
              <Chip
                label="3 Bulan"
                clickable
                onClick={() => {
                  if (week === 12) {
                    setWeek(null);
                    handleChange('createdAt', ['', '']);
                    setDate(false);
                  } else {
                    setDate(true);
                    handleChange('createdAt', [
                      moment().subtract(90, 'd').format('YYYY-MM-DD'),
                      moment().format('YYYY-MM-DD'),
                    ]);
                    setWeek(12);
                    setValue([
                      {
                        startDate: new Date().setDate(new Date().getDate() - 90),
                        endDate: new Date(),
                        key: 'selection',
                      },
                    ]);
                  }
                }}
                size="small"
                style={{ width: 'fit-content', height: 35, padding: '0 8px' }}
                variant={week === 12 ? 'default' : 'outlined'}
              />
            </Stack>

            <Stack direction="row" alignItems="center" spacing={1}>
              <TextField
                value={
                  isDate
                    ? `${moment(value[0]?.startDate).format('DD/MM/YYYY')} - ${moment(value[0]?.endDate).format(
                        'DD/MM/YYYY',
                      )}`
                    : ''
                }
                placeholder="Pilih Tanggal"
                autoComplete="off"
                color="secondary"
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
                    handleChange('createdAt', ['', '']);
                    setDate(false);
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
                  setWeek(null);
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
            <Typography style={{ fontSize: '13px' }}>Tipe Challenge</Typography>
          </AccordionSummary>
          <AccordionDetails style={{ padding: 0 }}>
            <FormGroup onChange={(e) => handleChange('type', e.target.value)}>
              <FormControlLabel
                label="Konten"
                value="Konten"
                control={<Checkbox color="secondary" checked={filter?.type?.includes('Konten')} />}
              />
              <FormControlLabel
                label="Akun"
                value="Akun"
                control={<Checkbox color="secondary" checked={filter?.type?.includes('Akun')} />}
              />
            </FormGroup>
          </AccordionDetails>
          <Divider style={{ marginTop: 16 }} />
        </Accordion>

        <Accordion elevation={0} defaultExpanded disableGutters>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ padding: '0px' }}>
            <Typography style={{ fontSize: '13px' }}>Status Challenge</Typography>
          </AccordionSummary>
          <AccordionDetails style={{ padding: 0 }}>
            <FormGroup onChange={(e) => handleChange('status', e.target.value)}>
              <FormControlLabel
                label="Sedang Berjalan"
                value="Sedang Berjalan"
                control={<Checkbox color="secondary" checked={filter?.status?.includes('Sedang Berjalan')} />}
              />
              <FormControlLabel
                label="Akan Datang"
                value="Akan Datang"
                control={<Checkbox color="secondary" checked={filter?.status?.includes('Akan Datang')} />}
              />
              <FormControlLabel
                label="Selesai"
                value="Selesai"
                control={<Checkbox color="secondary" checked={filter?.status?.includes('Selesai')} />}
              />
            </FormGroup>
          </AccordionDetails>
          <Divider style={{ marginTop: 16 }} />
        </Accordion>

        <Accordion elevation={0} defaultExpanded disableGutters>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ padding: '0px' }}>
            <Typography style={{ fontSize: '13px' }}>Cara Bergabung</Typography>
          </AccordionSummary>
          <AccordionDetails style={{ padding: 0 }}>
            <FormGroup onChange={(e) => handleChange('join', e.target.value)}>
              <FormControlLabel
                label="Semua Pengguna"
                value="Semua Pengguna"
                control={<Checkbox color="secondary" checked={filter?.join?.includes('Semua Pengguna')} />}
              />
              <FormControlLabel
                label="Dengan Undangan"
                value="Dengan Undangan"
                control={<Checkbox color="secondary" checked={filter?.join?.includes('Dengan Undangan')} />}
              />
            </FormGroup>
          </AccordionDetails>
        </Accordion>
      </Box>
    </>
  );
};

export default SearchSection;
