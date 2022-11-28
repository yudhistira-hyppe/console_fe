import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Checkbox from '@mui/material/Checkbox';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from '@mui/material/TextField';
import useStyles from '../../../../help-center/bantuan-pengguna/index.style';
import { Box, Typography, Chip, FormGroup, FormControlLabel } from '@material-ui/core';
import { Divider, Radio, RadioGroup, Stack } from '@mui/material';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers-pro';
import { debounce } from 'lodash';
import DelayedTextField from 'modules/Components/CommonComponent/DelayedTextField';

const SearchSection = ({ filter, handleChange }) => {
  const classes = useStyles();
  const [week, setWeek] = React.useState(null);
  const [value, setValue] = React.useState([null, null]);
  function getWeeksAfter(date, amount) {
    return date && amount ? date.add(amount, 'week') : undefined;
  }
  const handleChangeDelay = (e) => handleChange(e.target.name, e.target.value);

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
            <Typography style={{ fontSize: '13px' }}>Deskripsi Konten</Typography>
          </AccordionSummary>
          <AccordionDetails style={{ padding: 0 }}>
            <DelayedTextField
              fullWidth
              waitForInput={true}
              placeholder="Cari Konten"
              name="description"
              filterValue={filter.description}
              onChange={(e) => handleChangeDelay(e)}
            />
          </AccordionDetails>
          <Divider style={{ marginTop: 16 }} />
        </Accordion>

        <Accordion elevation={0} defaultExpanded disableGutters>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ padding: '0px' }}>
            <Typography style={{ fontSize: '13px' }}>Nama Pengguna</Typography>
          </AccordionSummary>
          <AccordionDetails style={{ padding: 0 }}>
            <DelayedTextField
              fullWidth
              waitForInput={true}
              placeholder="Cari Keterangan"
              name="username"
              filterValue={filter.username}
              onChange={(e) => handleChangeDelay(e)}
            />
          </AccordionDetails>
          <Divider style={{ marginTop: 16 }} />
        </Accordion>

        <Accordion elevation={0} defaultExpanded disableGutters>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ padding: '0px' }}>
            <Typography style={{ fontSize: '13px' }}>Status Sertifikat</Typography>
          </AccordionSummary>
          <AccordionDetails style={{ padding: 0 }}>
            <FormGroup onChange={(e) => handleChange('status', e.target.value)}>
              <FormControlLabel
                label={'Terdaftar'}
                value="terdaftar"
                control={<Checkbox defaultChecked={false} checked={filter.status.includes('terdaftar')} color="secondary" />}
              />
              <FormControlLabel
                label={'Bebas'}
                value="bebas"
                control={<Checkbox defaultChecked={false} checked={filter.status.includes('bebas')} color="secondary" />}
              />
            </FormGroup>
          </AccordionDetails>
          <Divider style={{ marginTop: 16 }} />
        </Accordion>

        <Accordion elevation={0} defaultExpanded disableGutters>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ padding: '0px' }}>
            <Typography style={{ fontSize: '13px' }}>Tipe</Typography>
          </AccordionSummary>
          <AccordionDetails style={{ padding: 0 }}>
            <FormGroup onChange={(e) => handleChange('type', e.target.value)}>
              <FormControlLabel
                label={'HyppeStory'}
                value="story"
                control={<Checkbox defaultChecked={false} checked={filter.type.includes('story')} color="secondary" />}
              />
              <FormControlLabel
                label={'HyppeVid'}
                value="vid"
                control={<Checkbox defaultChecked={false} checked={filter.type.includes('vid')} color="secondary" />}
              />
              <FormControlLabel
                label={'HyppeDiary'}
                value="diary"
                control={<Checkbox defaultChecked={false} checked={filter.type.includes('diary')} color="secondary" />}
              />
              <FormControlLabel
                label={'HyppePic'}
                value="pic"
                control={<Checkbox defaultChecked={false} checked={filter.type.includes('pic')} color="secondary" />}
              />
            </FormGroup>
          </AccordionDetails>
          <Divider style={{ marginTop: 16 }} />
        </Accordion>

        <Accordion elevation={0} defaultExpanded disableGutters>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ padding: '0px' }}>
            <Typography style={{ fontSize: '13px' }}>Kategori</Typography>
          </AccordionSummary>
          <AccordionDetails style={{ padding: 0 }}>
            <FormGroup onChange={(e) => handleChange('category', e.target.value)}>
              <FormControlLabel
                label={'Berita'}
                value="berita"
                control={<Checkbox defaultChecked={false} checked={filter.category.includes('berita')} color="secondary" />}
              />
              <FormControlLabel
                label={'Film'}
                value="film"
                control={<Checkbox defaultChecked={false} checked={filter.category.includes('film')} color="secondary" />}
              />
            </FormGroup>
          </AccordionDetails>
          <Divider style={{ marginTop: 16 }} />
        </Accordion>

        <Accordion elevation={0} defaultExpanded disableGutters>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ padding: '0px' }}>
            <Typography style={{ fontSize: '13px' }}>Status penjualan</Typography>
          </AccordionSummary>
          <AccordionDetails style={{ padding: 0 }}>
            <FormGroup onChange={(e) => handleChange('is_sell', e.target.value)}>
              <FormControlLabel
                label={'Dijual'}
                value="dijual"
                control={<Checkbox defaultChecked={false} checked={filter.is_sell.includes('dijual')} color="secondary" />}
              />
              <FormControlLabel
                label={'Tidak Dijual'}
                value="tidak dijual"
                control={
                  <Checkbox defaultChecked={false} checked={filter.is_sell.includes('tidak dijual')} color="secondary" />
                }
              />
            </FormGroup>
          </AccordionDetails>
          <Divider style={{ marginTop: 16 }} />
        </Accordion>

        <Accordion elevation={0} defaultExpanded disableGutters>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ padding: '0px' }}>
            <Typography style={{ fontSize: '13px' }}>Harga Jual</Typography>
          </AccordionSummary>
          <AccordionDetails style={{ padding: 0 }}>
            <Stack direction="column" gap="20px">
              <DelayedTextField
                fullWidth
                waitForInput={true}
                filterValue={filter.min_price}
                type="number"
                placeholder="Harga Minimum"
                onChange={(e) => handleChange('min_price', e.target.value)}
                autoComplete="off"
              />
              <DelayedTextField
                fullWidth
                waitForInput={true}
                filterValue={filter.max_price}
                type="number"
                placeholder="Harga Maksimum"
                onChange={(e) => handleChange('max_price', e.target.value)}
                autoComplete="off"
              />
            </Stack>
          </AccordionDetails>
          <Divider style={{ marginTop: 16 }} />
        </Accordion>

        <Accordion elevation={0} defaultExpanded disableGutters>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ padding: '0px' }}>
            <Typography style={{ fontSize: '13px' }}>Tanggal Pembuatan</Typography>
          </AccordionSummary>
          <AccordionDetails style={{ padding: 0 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs} localeText={{ start: 'Start Date', end: 'End Date' }}>
              <DateRangePicker
                value={filter.createdAt}
                onChange={(newValue) => {
                  handleChange('createdAt', [newValue[0]?.format('YYYY-MM-DD'), newValue[1]?.format('YYYY-MM-DD') || null]);
                }}
                renderInput={(startProps, endProps) => (
                  <>
                    <Stack direction={'row'} spacing={1}>
                      <TextField autoComplete="off" {...startProps} />
                      <TextField autoComplete="off" {...endProps} />
                    </Stack>
                  </>
                )}
              />
            </LocalizationProvider>
          </AccordionDetails>
          <Divider style={{ marginTop: 16 }} />
        </Accordion>

        <Accordion elevation={0} defaultExpanded disableGutters>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ padding: '0px' }}>
            <Typography style={{ fontSize: '13px' }}>Tanggal Pendaftaran (Ownership)</Typography>
          </AccordionSummary>
          <AccordionDetails style={{ padding: 0 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs} localeText={{ start: 'Start Date', end: 'End Date' }}>
              <DateRangePicker
                value={filter.ownedAt}
                onChange={(newValue) => {
                  handleChange('ownedAt', [newValue[0]?.format('YYYY-MM-DD'), newValue[1]?.format('YYYY-MM-DD') || null]);
                }}
                renderInput={(startProps, endProps) => (
                  <>
                    <Stack direction={'row'} spacing={1}>
                      <TextField autoComplete="off" {...startProps} />
                      <TextField autoComplete="off" {...endProps} />
                    </Stack>
                  </>
                )}
              />
            </LocalizationProvider>
          </AccordionDetails>
        </Accordion>
      </Box>
    </>
  );
};

export default SearchSection;
