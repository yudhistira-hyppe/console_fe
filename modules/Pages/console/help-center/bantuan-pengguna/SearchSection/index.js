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
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { debounce } from 'lodash';
import {
  useGetCategoryTicketsQuery,
  useGetLevelTicketsQuery,
  useGetSumberTicketsQuery,
} from 'api/console/helpCenter/bantuan-pengguna';

const SearchSection = ({ handleChange }) => {
  const classes = useStyles();
  const [week, setWeek] = React.useState(null);
  const [value, setValue] = React.useState([null, null]);
  function getWeeksAfter(date, amount) {
    return date && amount ? date.add(amount, 'week') : undefined;
  }
  const { data: listSumber, isLoading: loadingSumber } = useGetSumberTicketsQuery();
  const { data: listCategory, isLoading: loadingCategory } = useGetCategoryTicketsQuery();
  const { data: listLevel, isLoading: loadingLevel } = useGetLevelTicketsQuery();
  const handleSearch = debounce((e) => handleChange(e.target.name, e.target.value), 500);

  return (
    <>
      <Box className={classes.inBuildAppCard} p={5} pt={2} style={{ width: 270 }}>
        <Accordion elevation={0} defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ padding: '0px' }}>
            <Typography style={{ fontSize: '13px' }}>Pencarian Tiket</Typography>
          </AccordionSummary>
          <AccordionDetails style={{ padding: '0px' }}>
            <TextField
              name="search"
              style={{ width: '100%' }}
              placeholder="Cari No. Tiket / Judul Permasalahan"
              onChange={(e) => handleSearch(e)}
            />
          </AccordionDetails>
        </Accordion>

        <Accordion elevation={0} defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ padding: '0px', minHeight: '0px' }}>
            <Typography style={{ fontSize: '13px' }}>Tanggal Masuk</Typography>
          </AccordionSummary>
          <AccordionDetails style={{ padding: '0px' }}>
            <Stack direction={'column'} gap="12px" mb={3}>
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
        </Accordion>

        <Accordion elevation={0} defaultExpanded>
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
                    control={<Checkbox defaultChecked={false} onClick={() => handleChange('category', item?._id)} />}
                  />
                ))
              ) : (
                <Typography>Tidak ada data.</Typography>
              )}
            </FormGroup>
          </AccordionDetails>
        </Accordion>

        <Accordion elevation={0} defaultExpanded>
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
                    control={<Checkbox defaultChecked={false} onClick={() => handleChange('category', item?._id)} />}
                  />
                ))
              ) : (
                <Typography>Tidak ada data.</Typography>
              )}
            </FormGroup>
          </AccordionDetails>
        </Accordion>

        <Accordion elevation={0} defaultExpanded>
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
                    control={<Checkbox defaultChecked={false} onClick={() => handleChange('category', item?._id)} />}
                  />
                ))
              ) : (
                <Typography>Tidak ada data.</Typography>
              )}
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

        <Accordion elevation={0} defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ padding: '0px' }}>
            <Typography style={{ fontSize: '13px' }}>Penerima Tugas</Typography>
          </AccordionSummary>
          <AccordionDetails style={{ padding: '0px' }}>
            <TextField
              name="penerima"
              style={{ width: '100%' }}
              placeholder="Pilih Anggota"
              onChange={(e) => handleSearch(e)}
            />
          </AccordionDetails>
        </Accordion>
      </Box>
    </>
  );
};

export default SearchSection;
