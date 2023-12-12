import React, { useEffect, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Checkbox from '@mui/material/Checkbox';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from '@mui/material/TextField';
import useStyles from '../index.style';
import { Box, Typography, Chip, FormGroup, FormControlLabel } from '@material-ui/core';
import { Divider, IconButton, InputAdornment, Popover, Stack } from '@mui/material';
import {
  useGetCategoryTicketsQuery,
  useGetLevelTicketsQuery,
  useGetSumberTicketsQuery,
} from 'api/console/helpCenter/bantuan-pengguna';
import DelayedTextField from 'modules/Components/CommonComponent/DelayedTextField';
import { DateRange as DateRangePicker } from 'react-date-range';
import { DateRange, RemoveCircleOutline } from '@material-ui/icons';
import moment from 'moment';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

const SearchSection = ({ filter, handleChange }) => {
  const classes = useStyles();
  const { data: listSumber, isLoading: loadingSumber } = useGetSumberTicketsQuery();
  const { data: listCategory, isLoading: loadingCategory } = useGetCategoryTicketsQuery();
  const { data: listLevel, isLoading: loadingLevel } = useGetLevelTicketsQuery();
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
      <Box className={classes.inBuildAppCard} p={5} pt={2} style={{ width: '100%', maxWidth: 270 }}>
        <Accordion elevation={0} defaultExpanded disableGutters>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ padding: '0px' }}>
            <Typography style={{ fontSize: '13px' }}>Nomor Tiket</Typography>
          </AccordionSummary>
          <AccordionDetails style={{ padding: '0px' }}>
            <DelayedTextField
              fullWidth
              waitForInput={true}
              placeholder="Cari No.Tiket"
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
            <Typography style={{ fontSize: '13px' }}>Tanggal Tiket</Typography>
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
            <Typography style={{ fontSize: '13px' }}>Sumber</Typography>
          </AccordionSummary>
          <AccordionDetails style={{ padding: 0 }}>
            <FormGroup>
              {loadingSumber ? (
                <Typography>loading...</Typography>
              ) : listSumber?.data ? (
                listSumber?.data?.map((item, key) => (
                  <FormControlLabel
                    key={key}
                    label={item?.sourceName}
                    control={
                      <Checkbox
                        defaultChecked={false}
                        color="secondary"
                        onClick={() => handleChange('sumber', JSON.stringify({ _id: item?._id, name: item?.sourceName }))}
                        checked={filter.sumber.map((i) => i?.name).includes(item?.sourceName)}
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
            <Typography style={{ fontSize: '13px' }}>Kategori</Typography>
          </AccordionSummary>
          <AccordionDetails style={{ padding: 0 }}>
            <FormGroup>
              {loadingCategory ? (
                <Typography>loading...</Typography>
              ) : listCategory?.data ? (
                listCategory?.data?.map((item, key) => (
                  <FormControlLabel
                    key={key}
                    label={item?.nameCategory}
                    control={
                      <Checkbox
                        defaultChecked={false}
                        color="secondary"
                        onClick={() =>
                          handleChange('category', JSON.stringify({ _id: item?._id, name: item?.nameCategory }))
                        }
                        checked={filter.kategori.map((i) => i?.name).includes(item?.nameCategory)}
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
            <Typography style={{ fontSize: '13px' }}>Level</Typography>
          </AccordionSummary>
          <AccordionDetails style={{ padding: 0 }}>
            <FormGroup>
              {loadingLevel ? (
                <Typography>loading...</Typography>
              ) : listLevel?.data ? (
                listLevel?.data?.map((item, key) => (
                  <FormControlLabel
                    key={key}
                    label={item?.descLevel}
                    control={
                      <Checkbox
                        defaultChecked={false}
                        color="secondary"
                        onClick={() => handleChange('level', JSON.stringify({ _id: item?._id, name: item?.descLevel }))}
                        checked={filter.level.map((i) => i?.name).includes(item?.descLevel)}
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
                label={'Baru'}
                value="Baru"
                control={<Checkbox defaultChecked={false} color="secondary" checked={filter.status.includes('Baru')} />}
              />
              <FormControlLabel
                label={'Dalam Proses'}
                value="Dalam Proses"
                control={
                  <Checkbox defaultChecked={false} color="secondary" checked={filter.status.includes('Dalam Proses')} />
                }
              />
              <FormControlLabel
                label={'Selesai'}
                value="Selesai"
                control={<Checkbox defaultChecked={false} color="secondary" checked={filter.status.includes('Selesai')} />}
              />
            </FormGroup>
          </AccordionDetails>
          <Divider style={{ marginTop: 16 }} />
        </Accordion>

        <Accordion elevation={0} defaultExpanded disableGutters>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ padding: '0px' }}>
            <Typography style={{ fontSize: '13px' }}>Penerima Tugas</Typography>
          </AccordionSummary>
          <AccordionDetails style={{ padding: '0px' }}>
            <DelayedTextField
              fullWidth
              waitForInput={true}
              color="secondary"
              placeholder="Cari Penerima Tugas"
              name="penerima"
              filterValue={filter.assignto}
              onChange={(e) => handleChange(e.target.name, e.target.value)}
            />
          </AccordionDetails>
        </Accordion>
      </Box>
    </>
  );
};

export default SearchSection;
