import React from 'react';
import useStyles from '../../../help-center/bantuan-pengguna/index.style';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Box, Typography, Chip, FormGroup, FormControlLabel } from '@material-ui/core';
import { Accordion, AccordionDetails, AccordionSummary, Stack, TextField, Checkbox } from '@mui/material';
import { DateRangePicker, LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const SearchSection = ({ handleChange }) => {
  const classes = useStyles();
  const [week, setWeek] = React.useState(null);
  const [value, setValue] = React.useState([null, null]);
  function getWeeksAfter(date, amount) {
    return date && amount ? date.add(amount, 'week') : undefined;
  }

  return (
    <Box className={classes.inBuildAppCard} p={5}>
      <Accordion elevation={0} defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ padding: '0px', minHeight: '0px' }}>
          <Typography style={{ fontSize: '13px' }}>Tanggal Masuk</Typography>
        </AccordionSummary>
        <AccordionDetails style={{ padding: '0px' }}>
          <Stack direction={'column'} spacing={1} mb={3}>
            <div>
              <Chip
                clickable
                onClick={() => {
                  handleChange('transaction_date', 7);
                  setWeek(1), setValue([null, null]);
                }}
                label="7 Hari"
                size="small"
                variant={week == 1 ? 'default' : 'outlined'}
              />
            </div>
            <div>
              <Chip
                label="14 Hari"
                clickable
                onClick={() => {
                  handleChange('transaction_date', 14);
                  setWeek(2), setValue([null, null]);
                }}
                size="small"
                variant={week === 2 ? 'default' : 'outlined'}
              />
            </div>
            <div>
              <Chip
                label="1 Bulan"
                clickable
                onClick={() => {
                  handleChange('transaction_date', 30);
                  setWeek(4), setValue([null, null]);
                }}
                size="small"
                variant={week === 4 ? 'default' : 'outlined'}
              />
            </div>
            <div>
              <Chip
                label="3 Bulan"
                clickable
                onClick={() => {
                  handleChange('transaction_date', 90);
                  setWeek(12), setValue([null, null]);
                }}
                size="small"
                variant={week === 12 ? 'default' : 'outlined'}
              />
            </div>
          </Stack>

          <LocalizationProvider dateAdapter={AdapterDayjs} localeText={{ start: 'Start Date', end: 'End Date' }}>
            <DateRangePicker
              value={value}
              maxDate={getWeeksAfter(value[0], week)}
              onChange={(newValue) => {
                handleChange('transaction_range', [newValue[0]?.format('YYYY-MM-DD'), newValue[1]?.format('YYYY-MM-DD')]);
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
          <Typography style={{ fontSize: '13px' }}>Masa Berlaku</Typography>
        </AccordionSummary>
        <AccordionDetails style={{ padding: 0 }}>
          <FormGroup>
            <FormControlLabel label={'> 30 Hari'} control={<Checkbox defaultChecked={false} />} />
            <FormControlLabel label={'30-60 Hari'} control={<Checkbox defaultChecked={false} />} />
            <FormControlLabel label={'61-90 Hari'} control={<Checkbox defaultChecked={false} />} />
            <FormControlLabel label={'90 Hari <'} control={<Checkbox defaultChecked={false} />} />
          </FormGroup>
        </AccordionDetails>
      </Accordion>

      <Accordion elevation={0} defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ padding: '0px' }}>
          <Typography style={{ fontSize: '13px' }}>Status Pembayaran</Typography>
        </AccordionSummary>
        <AccordionDetails style={{ padding: '0px' }}>
          <FormGroup>
            <FormControlLabel
              label={'Menuggu'}
              control={
                <Checkbox defaultChecked={false} onChange={() => handleChange('status_payment', 'WAITING_PAYMENT')} />
              }
            />
            <FormControlLabel
              label={'Lunas'}
              control={<Checkbox defaultChecked={false} onChange={() => handleChange('status_payment', 'Success')} />}
            />
            <FormControlLabel
              label={'Gagal'}
              control={<Checkbox defaultChecked={false} onChange={() => handleChange('status_payment', 'Cancel')} />}
            />
          </FormGroup>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default SearchSection;
