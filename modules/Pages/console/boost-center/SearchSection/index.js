import React, { useEffect } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Checkbox from '@mui/material/Checkbox';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from '@mui/material/TextField';
import useStyles from '../../help-center/bantuan-pengguna/index.style';
import { Box, Typography, Chip, FormGroup, FormControlLabel } from '@material-ui/core';
import { Divider, Radio, RadioGroup, Stack } from '@mui/material';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers-pro';
import { debounce } from 'lodash';
import DelayedTextField from 'modules/Components/CommonComponent/DelayedTextField';
import moment from 'moment';

const SearchSection = ({ filter, handleChange }) => {
  const classes = useStyles();

  return (
    <>
      <Box className={classes.inBuildAppCard} p={5} pt={2} maxWidth={270}>
        <Accordion elevation={0} defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ padding: '0px', minHeight: '0px' }}>
            <Typography style={{ fontSize: '13px' }}>Tanggal Pembuatan</Typography>
          </AccordionSummary>
          <AccordionDetails style={{ padding: '0px' }}>
            <Stack direction={'column'} spacing={1} mb={3}>
              <Chip
                label="3 Hari"
                clickable
                onClick={() => {
                  handleChange('createdAt', [moment().subtract(3, 'd').format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')]);
                }}
                size="small"
                style={{ width: 'fit-content', height: 35, padding: '0 8px' }}
                variant="outlined"
              />
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
        </Accordion>

        <Accordion elevation={0} defaultExpanded disableGutters>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ padding: '0px' }}>
            <Typography style={{ fontSize: '13px' }}>Status Sertifikat</Typography>
          </AccordionSummary>
          <AccordionDetails style={{ padding: 0 }}>
            <FormGroup onChange={(e) => handleChange('status', e.target.value)}>
              <FormControlLabel
                label={<Typography style={{ fontSize: 14 }}>Otomatis</Typography>}
                value="otomatis"
                control={<Checkbox defaultChecked={false} checked={filter.status.includes('otomatis')} color="secondary" />}
              />
              <FormControlLabel
                label={<Typography style={{ fontSize: 14 }}>Pagi (08:00 - 12:00 WIB)</Typography>}
                value="pagi"
                control={<Checkbox defaultChecked={false} checked={filter.status.includes('pagi')} color="secondary" />}
              />
              <FormControlLabel
                label={<Typography style={{ fontSize: 14 }}>Siang (13:00 - 18:00 WIB)</Typography>}
                value="siang"
                control={<Checkbox defaultChecked={false} checked={filter.status.includes('siang')} color="secondary" />}
              />
              <FormControlLabel
                label={<Typography style={{ fontSize: 14 }}>Malam (19:00 - 07:00 WIB)</Typography>}
                value="malam"
                control={<Checkbox defaultChecked={false} checked={filter.status.includes('malam')} color="secondary" />}
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
                label={'Dijadwalkan'}
                value="dijadwalkan"
                control={<Checkbox defaultChecked={false} checked={filter.type.includes('dijadwalkan')} color="secondary" />}
              />
              <FormControlLabel
                label={'Sedang Berlangsung'}
                value="sedang berlangsung"
                control={
                  <Checkbox defaultChecked={false} checked={filter.type.includes('sedang berlangsung')} color="secondary" />
                }
              />
              <FormControlLabel
                label={'Selesai'}
                value="selesai"
                control={<Checkbox defaultChecked={false} checked={filter.type.includes('selesai')} color="secondary" />}
              />
            </FormGroup>
          </AccordionDetails>
        </Accordion>
      </Box>
    </>
  );
};

export default SearchSection;
