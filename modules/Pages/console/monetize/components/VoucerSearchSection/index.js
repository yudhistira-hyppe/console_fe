import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Checkbox from '@mui/material/Checkbox';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from '@mui/material/TextField';
import useStyles from '../../../help-center/bantuan-pengguna/index.style';
import { Box, Typography, Chip, FormGroup, FormControlLabel } from '@material-ui/core';
import { Divider, Radio, RadioGroup, Stack } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import moment from 'moment';
import DelayedTextField from 'modules/Components/CommonComponent/DelayedTextField';

const SearchSection = ({ filter, handleChange }) => {
  const classes = useStyles();

  return (
    <>
      <Box className={classes.inBuildAppCard} p={5} pt={2} maxWidth={270}>
        <Accordion elevation={0} defaultExpanded disableGutters>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ padding: '0px' }}>
            <Typography style={{ fontSize: '13px' }}>Nama Voucher</Typography>
          </AccordionSummary>
          <AccordionDetails style={{ padding: 0 }}>
            <DelayedTextField
              fullWidth
              waitForInput={true}
              placeholder="Cari voucher"
              name="search"
              filterValue={filter.search}
              onChange={(e) => handleChange(e.target.name, e.target.value)}
            />
          </AccordionDetails>
          <Divider style={{ marginTop: 16 }} />
        </Accordion>

        <Accordion elevation={0} defaultExpanded disableGutters>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ padding: '0px', minHeight: '0px' }}>
            <Typography style={{ fontSize: '13px' }}>Tanggal Transaksi</Typography>
          </AccordionSummary>
          <AccordionDetails style={{ padding: '0px' }}>
            <Stack direction={'column'} spacing={1} mb={3}>
              <Chip
                label="7 Hari"
                clickable
                onClick={() => {
                  handleChange('createdAt', [moment().subtract(7, 'd').format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')]);
                }}
                size="small"
                style={{ width: 'fit-content', height: 35, padding: '0 8px' }}
                variant="outlined"
              />
              <Chip
                label="14 Hari"
                clickable
                onClick={() => {
                  handleChange('createdAt', [
                    moment().subtract(14, 'd').format('YYYY-MM-DD'),
                    moment().format('YYYY-MM-DD'),
                  ]);
                }}
                size="small"
                style={{ width: 'fit-content', height: 35, padding: '0 8px' }}
                variant="outlined"
              />
              <Chip
                label="1 Bulan"
                clickable
                onClick={() => {
                  handleChange('createdAt', [
                    moment().subtract(30, 'd').format('YYYY-MM-DD'),
                    moment().format('YYYY-MM-DD'),
                  ]);
                }}
                size="small"
                style={{ width: 'fit-content', height: 35, padding: '0 8px' }}
                variant="outlined"
              />
              <Chip
                label="3 Bulan"
                clickable
                onClick={() => {
                  handleChange('createdAt', [
                    moment().subtract(90, 'd').format('YYYY-MM-DD'),
                    moment().format('YYYY-MM-DD'),
                  ]);
                }}
                size="small"
                style={{ width: 'fit-content', height: 35, padding: '0 8px' }}
                variant="outlined"
              />
            </Stack>

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
            <Typography style={{ fontSize: '13px' }}>Status Voucher</Typography>
          </AccordionSummary>
          <AccordionDetails style={{ padding: 0 }}>
            <FormGroup onChange={(e) => handleChange('voucher_status', e.target.value)}>
              <FormControlLabel
                label={'Digunakan'}
                value="Digunakan"
                control={
                  <Checkbox defaultChecked={false} color="secondary" checked={filter.voucher_status.includes('Digunakan')} />
                }
              />
              <FormControlLabel
                label={'Kadaluarsa'}
                value="Kadaluarsa"
                control={
                  <Checkbox
                    defaultChecked={false}
                    color="secondary"
                    checked={filter.voucher_status.includes('Kadaluarsa')}
                  />
                }
              />
            </FormGroup>
          </AccordionDetails>
          <Divider style={{ marginTop: 16 }} />
        </Accordion>

        <Accordion elevation={0} defaultExpanded disableGutters>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ padding: '0px' }}>
            <Typography style={{ fontSize: '13px' }}>Masa Berlaku</Typography>
          </AccordionSummary>
          <AccordionDetails style={{ padding: 0 }}>
            <RadioGroup value={filter.period} onChange={(e) => handleChange('period', e.target.value)}>
              <FormControlLabel
                label={'> 30 Hari'}
                value="> 30"
                control={<Radio defaultChecked={false} color="secondary" />}
              />
              <FormControlLabel
                label={'30-60 Hari'}
                value="30-60"
                control={<Radio defaultChecked={false} color="secondary" />}
              />
              <FormControlLabel
                label={'61-90 Hari'}
                value="61-90"
                control={<Radio defaultChecked={false} color="secondary" />}
              />
              <FormControlLabel
                label={'> 90 Hari'}
                value="> 90"
                control={<Radio defaultChecked={false} color="secondary" />}
              />
            </RadioGroup>
          </AccordionDetails>
          <Divider style={{ marginTop: 16 }} />
        </Accordion>

        <Accordion elevation={0} defaultExpanded disableGutters>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ padding: '0px' }}>
            <Typography style={{ fontSize: '13px' }}>Status Pembayaran</Typography>
          </AccordionSummary>
          <AccordionDetails style={{ padding: '0px' }}>
            <FormGroup onChange={(e) => handleChange('payment_status', e.target.value)}>
              <FormControlLabel
                label={'Menuggu'}
                value="WAITING_PAYMENT"
                control={
                  <Checkbox
                    defaultChecked={false}
                    color="secondary"
                    checked={filter.payment_status.includes('WAITING_PAYMENT')}
                  />
                }
              />
              <FormControlLabel
                label={'Lunas'}
                value="Success"
                control={
                  <Checkbox defaultChecked={false} color="secondary" checked={filter.payment_status.includes('Success')} />
                }
              />
              <FormControlLabel
                label={'Gagal'}
                value="Cancel"
                control={
                  <Checkbox defaultChecked={false} color="secondary" checked={filter.payment_status.includes('Cancel')} />
                }
              />
            </FormGroup>
          </AccordionDetails>
        </Accordion>
      </Box>
    </>
  );
};

export default SearchSection;
