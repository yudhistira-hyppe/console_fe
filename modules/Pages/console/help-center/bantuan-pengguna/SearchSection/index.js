import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Checkbox from '@mui/material/Checkbox';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from '@mui/material/TextField';
import useStyles from '../index.style';
import { Box, Typography, Chip, FormGroup, FormControlLabel } from '@material-ui/core';
import { Stack } from '@mui/material';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { debounce } from 'lodash';
import { useGetCategoryTicketsQuery, useGetSumberTicketsQuery } from 'api/console/helpCenter/bantuan-pengguna';

const SearchSection = ({ handleChange }) => {
  const classes = useStyles();
  const [week, setWeek] = React.useState(null);
  const [value, setValue] = React.useState([null, null]);
  function getWeeksAfter(date, amount) {
    return date && amount ? date.add(amount, 'week') : undefined;
  }
  const { data: listSumber } = useGetSumberTicketsQuery();
  const { data: listCategory } = useGetCategoryTicketsQuery();
  const handleSearch = debounce((query) => handleChange('search', query), 500);

  return (
    <>
      <Box className={classes.inBuildAppCard} p={5} style={{ width: 250 }}>
        <Accordion elevation={0} defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ padding: '0px' }}>
            <Typography style={{ fontSize: '13px' }}>Pencarian Tiket</Typography>
          </AccordionSummary>
          <AccordionDetails style={{ padding: '0px' }}>
            <TextField
              style={{ width: '100%' }}
              placeholder="Cari No. Tiket / Judul Permasalahan"
              onChange={(e) => handleSearch(e.target.value)}
            />
          </AccordionDetails>
        </Accordion>

        <Accordion elevation={0} defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ padding: '0px', minHeight: '0px' }}>
            <Typography style={{ fontSize: '13px' }}>Tanggal Masuk</Typography>
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
                style={{ width: '35%' }}
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
                style={{ width: '35%' }}
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
                style={{ width: '35%' }}
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
                style={{ width: '35%' }}
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
                }}
                renderInput={(startProps, endProps) => (
                  <>
                    <Stack direction={'row'} spacing={1}>
                      <TextField {...startProps} />
                      <TextField {...endProps} />
                    </Stack>
                  </>
                )}
              />
            </LocalizationProvider>
          </AccordionDetails>
        </Accordion>

        <Accordion elevation={0} defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ padding: '0px' }}>
            <Typography style={{ fontSize: '13px' }}>Sumber</Typography>
          </AccordionSummary>
          <AccordionDetails style={{ padding: 0 }}>
            <FormGroup>
              {listSumber?.data?.map((item, key) => (
                <FormControlLabel
                  key={key}
                  label={item?.sourceName}
                  control={<Checkbox defaultChecked={false} onClick={() => handleChange('sumber', item?._id)} />}
                />
              ))}
            </FormGroup>
          </AccordionDetails>
        </Accordion>

        <Accordion elevation={0} defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ padding: '0px' }}>
            <Typography style={{ fontSize: '13px' }}>Kategori</Typography>
          </AccordionSummary>
          <AccordionDetails style={{ padding: 0 }}>
            <FormGroup>
              {listCategory?.data?.map((item, key) => (
                <FormControlLabel
                  key={key}
                  label={item?.nameCategory}
                  control={<Checkbox defaultChecked={false} onClick={() => handleChange('category', item?._id)} />}
                />
              ))}
            </FormGroup>
          </AccordionDetails>
        </Accordion>

        <Accordion elevation={0} defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ padding: '0px' }}>
            <Typography style={{ fontSize: '13px' }}>Status</Typography>
          </AccordionSummary>
          <AccordionDetails style={{ padding: 0 }}>
            <FormGroup>
              <FormControlLabel
                label={'Baru'}
                control={<Checkbox defaultChecked={false} onClick={() => handleChange('status', 'new')} />}
              />
              <FormControlLabel
                label={'Dalam Proses'}
                control={<Checkbox defaultChecked={false} onClick={() => handleChange('status', 'onprogress')} />}
              />
              <FormControlLabel
                label={'Selesai'}
                control={<Checkbox defaultChecked={false} onClick={() => handleChange('status', 'close')} />}
              />
            </FormGroup>
          </AccordionDetails>
        </Accordion>

        <Accordion elevation={0}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ padding: '0px' }}>
            <Typography style={{ fontSize: '13px' }}>Penerima Tugas</Typography>
          </AccordionSummary>
          <AccordionDetails style={{ padding: '0px' }}>
            <TextField style={{ width: '100%' }} placeholder="Pilih Anggota" />
          </AccordionDetails>
        </Accordion>
      </Box>
    </>
  );
};

export default SearchSection;
