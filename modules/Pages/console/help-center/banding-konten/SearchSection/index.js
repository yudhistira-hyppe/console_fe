import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Checkbox from '@mui/material/Checkbox';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from '@mui/material/TextField';
import useStyles from '../../bantuan-pengguna/index.style';
import { Box, Typography, Chip, FormGroup, FormControlLabel } from '@material-ui/core';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Divider, Radio, RadioGroup, Stack } from '@mui/material';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { debounce } from 'lodash';
import DelayedTextField from 'modules/Components/CommonComponent/DelayedTextField';
import moment from 'moment';

const SearchSection = ({ filter, handleChange }) => {
  const classes = useStyles();

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
            <Typography style={{ fontSize: '13px' }}>Status</Typography>
          </AccordionSummary>
          <AccordionDetails style={{ padding: 0 }}>
            <FormGroup onChange={(e) => handleChange('status', e.target.value)}>
              <FormControlLabel
                label={'Baru'}
                value="BARU"
                control={<Checkbox defaultChecked={false} color="secondary" checked={filter.status.includes('BARU')} />}
              />
              <FormControlLabel
                label={'Dipulihkan'}
                value="TIDAK DITANGGUHKAN"
                control={
                  <Checkbox
                    defaultChecked={false}
                    color="secondary"
                    checked={filter.status.includes('TIDAK DITANGGUHKAN')}
                  />
                }
              />
              <FormControlLabel
                label={'Ditangguhkan'}
                value="DITANGGUHKAN"
                control={
                  <Checkbox defaultChecked={false} color="secondary" checked={filter.status.includes('DITANGGUHKAN')} />
                }
              />
              <FormControlLabel
                label={'Ditandai Sensitif'}
                value="FLAGING"
                control={<Checkbox defaultChecked={false} color="secondary" checked={filter.status.includes('FLAGING')} />}
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
                control={<Checkbox defaultChecked={false} color="secondary" />}
              />
              <FormControlLabel
                value={'Konten ini memiliki konteks tambahan'}
                label={<Typography style={{ fontSize: 12 }}>Konten ini memiliki konteks tambahan</Typography>}
                control={<Checkbox defaultChecked={false} color="secondary" />}
              />
              <FormControlLabel
                value={'Lainnya'}
                label={<Typography style={{ fontSize: 12 }}>Lainnya</Typography>}
                control={<Checkbox defaultChecked={false} color="secondary" />}
              />
              <FormControlLabel
                value={'This content doesn`t have sensitive content'}
                label={<Typography style={{ fontSize: 12 }}>This content doesn`t have sensitive content</Typography>}
                control={<Checkbox defaultChecked={false} color="secondary" />}
              />
              <FormControlLabel
                value={'This content has additional context'}
                label={<Typography style={{ fontSize: 12 }}>This content has additional context</Typography>}
                control={<Checkbox defaultChecked={false} color="secondary" />}
              />
              <FormControlLabel
                value={'Other'}
                label={<Typography style={{ fontSize: 12 }}>Other</Typography>}
                control={<Checkbox defaultChecked={false} color="secondary" />}
              />
            </FormGroup>
          </AccordionDetails>
        </Accordion>
      </Box>
    </>
  );
};

export default SearchSection;
