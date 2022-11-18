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
import { Radio, RadioGroup, Stack } from '@mui/material';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { debounce } from 'lodash';

const SearchSection = ({ filter, handleChange }) => {
  const classes = useStyles();
  const [week, setWeek] = React.useState(null);
  const [value, setValue] = React.useState([null, null]);
  function getWeeksAfter(date, amount) {
    return date && amount ? date.add(amount, 'week') : undefined;
  }
  const handleChangeDelay = debounce((e) => handleChange(e.target.name, e.target.value), 500);

  return (
    <>
      <Box className={classes.inBuildAppCard} p={5} pt={2} maxWidth={270}>
        <Accordion elevation={0} defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ padding: '0px' }}>
            <Typography style={{ fontSize: '13px' }}>Akun Pemohonan</Typography>
          </AccordionSummary>
          <AccordionDetails style={{ padding: 0 }}>
            <TextField
              name="search"
              style={{ width: '100%' }}
              placeholder="Cari username"
              onChange={(e) => handleChangeDelay(e)}
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
        </Accordion>

        <Accordion elevation={0} defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ padding: '0px' }}>
            <Typography style={{ fontSize: '13px' }}>Status</Typography>
          </AccordionSummary>
          <AccordionDetails style={{ padding: 0 }}>
            <FormGroup onChange={(e) => handleChange('status', e.target.value)}>
              <FormControlLabel
                label={'Baru'}
                value="BARU"
                control={<Checkbox defaultChecked={false} color="secondary" />}
              />
              <FormControlLabel
                label={'Dipulihkan'}
                value="TIDAK DITANGGUHKAN"
                control={<Checkbox defaultChecked={false} color="secondary" />}
              />
              <FormControlLabel
                label={'Ditangguhkan'}
                value="DITANGGUHKAN"
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
