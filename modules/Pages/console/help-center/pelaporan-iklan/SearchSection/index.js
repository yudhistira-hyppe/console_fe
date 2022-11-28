import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Checkbox from '@mui/material/Checkbox';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from '@mui/material/TextField';
import useStyles from '../../bantuan-pengguna/index.style';
import { Box, Typography, Chip, FormGroup, FormControlLabel } from '@material-ui/core';
import { Radio, RadioGroup, Stack } from '@mui/material';
import { DateRangePicker } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { debounce } from 'lodash';
import { useGetReportReasonQuery } from 'api/console/helpCenter/iklan';

const SearchSection = ({ filter, handleChange }) => {
  const classes = useStyles();
  const [week, setWeek] = React.useState(null);
  const [value, setValue] = React.useState([null, null]);
  function getWeeksAfter(date, amount) {
    return date && amount ? date.add(amount, 'week') : undefined;
  }

  const handleChangeDelay = debounce((e) => handleChange(e.target.name, e.target.value), 500);

  const { data: reason, isFetching: loadingReason } = useGetReportReasonQuery();

  return (
    <>
      <Box className={classes.inBuildAppCard} p={5} pt={2} style={{ width: 270 }}>
        {/* <Accordion elevation={0} defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ padding: '0px', minHeight: '0px' }}>
            <Typography style={{ fontSize: '13px' }}>Tanggal Pelaporan</Typography>
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
                onChange={(newValue) => {
                  handleChange('ticket_range', [newValue[0]?.format('YYYY-MM-DD'), newValue[1]?.format('YYYY-MM-DD')]);
                  setValue(newValue);
                  setWeek(null);
                }}
                maxDate={getWeeksAfter(value[0], week)}
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

        {/* <Accordion elevation={0} defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ padding: '0px', margin: 0 }}>
            <Typography style={{ fontSize: '13px' }}>Akun Pelapor</Typography>
          </AccordionSummary>
          <AccordionDetails style={{ padding: 0 }}>
            <TextField style={{ width: '100%' }} placeholder="Cari" />
          </AccordionDetails>
        </Accordion> */}

        <Accordion elevation={0} defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ padding: '0px' }}>
            <Typography style={{ fontSize: '13px' }}>Iklan Dilaporkan</Typography>
          </AccordionSummary>
          <AccordionDetails style={{ padding: 0 }}>
            <TextField name="search" style={{ width: '100%' }} placeholder="Cari" onChange={(e) => handleChangeDelay(e)} />
          </AccordionDetails>
        </Accordion>

        <Accordion elevation={0} defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ padding: '0px' }}>
            <Typography style={{ fontSize: '13px' }}>Jumlah Pelaporan</Typography>
          </AccordionSummary>
          <AccordionDetails style={{ padding: 0 }}>
            <RadioGroup value={filter.range} onChange={(e) => handleChange('range', e.target.value)}>
              <FormControlLabel value="1-50" label={'1-50'} control={<Radio />} />
              <FormControlLabel value="51-100" label={'51-100'} control={<Radio />} />
              <FormControlLabel value="101-150" label={'101-150'} control={<Radio />} />
              <FormControlLabel value="151-200" label={'151-200'} control={<Radio />} />
            </RadioGroup>
            <Stack direction="row" spacing={1} mt={1}>
              <TextField
                size="small"
                value={filter.startreport}
                placeholder="From"
                onChange={(e) => handleChange('startreport', e.target.value)}
              />
              <TextField
                size="small"
                value={filter.endreport}
                placeholder="To"
                onChange={(e) => handleChange('endreport', e.target.value)}
              />
            </Stack>
          </AccordionDetails>
        </Accordion>

        <Accordion elevation={0} defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ padding: '0px' }}>
            <Typography style={{ fontSize: '13px' }}>Status</Typography>
          </AccordionSummary>
          <AccordionDetails style={{ padding: 0 }}>
            <FormGroup value={filter.status} onChange={(e) => handleChange('status', e.target.value)}>
              <FormControlLabel
                label={'Baru'}
                value="BARU"
                control={<Checkbox defaultChecked={false} color="secondary" />}
              />
              <FormControlLabel
                label={'Ditangguhkan'}
                value="DITANGGUHKAN"
                control={<Checkbox defaultChecked={false} color="secondary" />}
              />
              <FormControlLabel
                label={'Tidak Ditangguhkan'}
                value="TIDAK DITANGGUHKAN"
                control={<Checkbox defaultChecked={false} color="secondary" />}
              />
              <FormControlLabel
                label={'Ditandai Sensitif'}
                value="FLAGING"
                control={<Checkbox defaultChecked={false} color="secondary" />}
              />
            </FormGroup>
          </AccordionDetails>
        </Accordion>

        <Accordion elevation={0} defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ padding: '0px' }}>
            <Typography style={{ fontSize: '13px' }}>Alasan Pelaporan</Typography>
          </AccordionSummary>
          <AccordionDetails style={{ padding: 0 }}>
            {loadingReason ? (
              <Typography>loading data...</Typography>
            ) : (
              <FormGroup onChange={(e) => handleChange('reason', e.target.value)}>
                {reason?.data?.map((item, key) => (
                  <FormControlLabel
                    key={key}
                    value={item?._id}
                    label={<Typography style={{ fontSize: 12 }}>{item?.description}</Typography>}
                    control={<Checkbox defaultChecked={false} color="secondary" />}
                  />
                ))}
              </FormGroup>
            )}
          </AccordionDetails>
        </Accordion>
      </Box>
    </>
  );
};

export default SearchSection;
