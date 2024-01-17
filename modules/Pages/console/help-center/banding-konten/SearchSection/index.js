import React, { useEffect, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Checkbox from '@mui/material/Checkbox';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from '@mui/material/TextField';
import useStyles from '../../bantuan-pengguna/index.style';
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
    if (filter.createdAt[0] && filter.createdAt[1]) {
      setValue([
        {
          startDate: moment(filter.createdAt[0]).toDate(),
          endDate: moment(filter.createdAt[1]).toDate(),
          key: 'selection',
        },
      ]);
      setDate(true);
    } else {
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

  console.log(value);

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
            <Typography style={{ fontSize: '13px' }}>Akun Pemohonan</Typography>
          </AccordionSummary>
          <AccordionDetails style={{ padding: 0 }}>
            <DelayedTextField
              fullWidth
              waitForInput={true}
              placeholder="Cari username"
              name="search"
              filterValue={filter.search}
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              color="secondary"
            />
          </AccordionDetails>
          <Divider style={{ marginTop: 16 }} />
        </Accordion>

        <Accordion elevation={0} defaultExpanded disableGutters>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ padding: '0px', minHeight: '0px' }}>
            <Typography style={{ fontSize: '13px' }}>Tanggal Pengajuan</Typography>
          </AccordionSummary>
          <AccordionDetails style={{ padding: '0px' }}>
            <Stack direction={'column'} spacing={1} mb={3}>
              <Chip
                clickable
                onClick={() => {
                  if (week === 1) {
                    setWeek(null);
                    handleChange('createdAt', ['', '']);
                    handleChange('labelTanggal', '');
                    setDate(false);
                  } else {
                    setDate(true);
                    handleChange('createdAt', [
                      moment().subtract(7, 'd').format('YYYY-MM-DD'),
                      moment().format('YYYY-MM-DD'),
                    ]);
                    handleChange('labelTanggal', '7 hari Terakhir');
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
                    handleChange('labelTanggal', '');
                    setDate(false);
                  } else {
                    setDate(true);
                    handleChange('createdAt', [
                      moment().subtract(14, 'd').format('YYYY-MM-DD'),
                      moment().format('YYYY-MM-DD'),
                    ]);
                    handleChange('labelTanggal', '14 Hari Terakhir');
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
                    handleChange('labelTanggal', '');
                    setDate(false);
                  } else {
                    setDate(true);
                    handleChange('createdAt', [
                      moment().subtract(30, 'd').format('YYYY-MM-DD'),
                      moment().format('YYYY-MM-DD'),
                    ]);
                    handleChange('labelTanggal', '1 Bulan Terakhir');
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
                    handleChange('labelTanggal', '');
                    setDate(false);
                  } else {
                    setDate(true);
                    handleChange('createdAt', [
                      moment().subtract(90, 'd').format('YYYY-MM-DD'),
                      moment().format('YYYY-MM-DD'),
                    ]);
                    handleChange('labelTanggal', '3 Bulan Terakhir');
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
                    handleChange('labelTanggal', '');
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
                  handleChange(
                    'labelTanggal',
                    `${moment(item.selection.startDate).format('DD-MM-YYYY')} - ${
                      item.selection.endDate ? moment(item.selection.endDate).format('DD-MM-YYYY') : ''
                    }`,
                  );
                  setDate(true);
                  setWeek(null);
                }}
                onRangeFocusChange={(date) => {
                  if (date?.[1] < 1) {
                    handleClose();
                  }
                }}
                dragSelectionEnabled={false}
                moveRangeOnFirstSelection={false}
                editableDateInputs={true}
                rangeColors={['#AB22AF']}
                ranges={value}
                direction="horizontal"
              />
            </Popover>
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
                label={'Baru'}
                value="Baru"
                control={<Checkbox defaultChecked={false} color="secondary" checked={filter.status.includes('Baru')} />}
              />
              <FormControlLabel
                label={'Dipulihkan'}
                value="Dipulihkan"
                control={
                  <Checkbox defaultChecked={false} color="secondary" checked={filter.status.includes('Dipulihkan')} />
                }
              />
              <FormControlLabel
                label={'Ditangguhkan'}
                value="Ditangguhkan"
                control={
                  <Checkbox defaultChecked={false} color="secondary" checked={filter.status.includes('Ditangguhkan')} />
                }
              />
              <FormControlLabel
                label={'Ditandai Sensitif'}
                value="Ditandai Sensitif"
                control={
                  <Checkbox defaultChecked={false} color="secondary" checked={filter.status.includes('Ditandai Sensitif')} />
                }
              />
              <FormControlLabel
                label={'Dihapus'}
                value="Dihapus"
                control={<Checkbox defaultChecked={false} color="secondary" checked={filter.status.includes('Dihapus')} />}
              />
            </FormGroup>
          </AccordionDetails>
          <Divider style={{ marginTop: 16 }} />
        </Accordion>

        <Accordion elevation={0} defaultExpanded disableGutters>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ padding: '0px' }}>
            <Typography style={{ fontSize: '13px' }}>Alasan Banding</Typography>
          </AccordionSummary>
          <AccordionDetails style={{ padding: 0 }}>
            <FormGroup onChange={(e) => handleChange('reason', e.target.value)}>
              <FormControlLabel
                value={'Konten ini tidak memiliki konten sensitif'}
                label={<Typography style={{ fontSize: 12 }}>Konten ini tidak memiliki konten sensitif</Typography>}
                control={
                  <Checkbox
                    defaultChecked={false}
                    color="secondary"
                    checked={filter.reason.includes('Konten ini tidak memiliki konten sensitif')}
                  />
                }
              />
              <FormControlLabel
                value={'Konten ini memiliki konteks tambahan'}
                label={<Typography style={{ fontSize: 12 }}>Konten ini memiliki konteks tambahan</Typography>}
                control={
                  <Checkbox
                    defaultChecked={false}
                    color="secondary"
                    checked={filter.reason.includes('Konten ini memiliki konteks tambahan')}
                  />
                }
              />
              <FormControlLabel
                value={'Lainnya'}
                label={<Typography style={{ fontSize: 12 }}>Lainnya</Typography>}
                control={<Checkbox defaultChecked={false} color="secondary" checked={filter.reason.includes('Lainnya')} />}
              />
              <FormControlLabel
                value={'This content doesn`t have sensitive content'}
                label={<Typography style={{ fontSize: 12 }}>This content doesn`t have sensitive content</Typography>}
                control={
                  <Checkbox
                    defaultChecked={false}
                    color="secondary"
                    checked={filter.reason.includes('This content doesn`t have sensitive content')}
                  />
                }
              />
              <FormControlLabel
                value={'This content has additional context'}
                label={<Typography style={{ fontSize: 12 }}>This content has additional context</Typography>}
                control={
                  <Checkbox
                    defaultChecked={false}
                    color="secondary"
                    checked={filter.reason.includes('This content has additional context')}
                  />
                }
              />
              <FormControlLabel
                value={'Other'}
                label={<Typography style={{ fontSize: 12 }}>Other</Typography>}
                control={<Checkbox defaultChecked={false} color="secondary" checked={filter.reason.includes('Other')} />}
              />
            </FormGroup>
          </AccordionDetails>
        </Accordion>
      </Box>
    </>
  );
};

export default SearchSection;
