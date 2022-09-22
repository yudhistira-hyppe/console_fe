import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Checkbox from '@mui/material/Checkbox';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from '@mui/material/TextField';
import useStyles from '../../bantuan-pengguna/index.style';
import { Box, Typography, Chip, FormGroup, FormControlLabel } from '@material-ui/core';
import { Stack } from '@mui/material';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';


const SearchSection = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState([null, null]);
  const [week, setWeek] = React.useState(null);
  function getWeeksAfter(date, amount) {
    return date && amount ? date.add(amount, 'week') : undefined;
  }

  return (
    <>
      <Box className={classes.inBuildAppCard} p={5} maxWidth={'25%'}>
        <Accordion elevation={0} defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ padding: '0px', minHeight: '0px' }}>
            <Typography style={{ fontSize: '13px' }}>Tanggal Masuk</Typography>
          </AccordionSummary>
          <AccordionDetails style={{ padding: '0px' }}>
            <Stack direction={'column'} spacing={1} mb={3}>
              <Chip
                clickable
                onClick={() => {
                  setWeek(1), setValue([null, null]);
                }}
                label="7 Hari"
                size="small"
                style={{ width: '30%' }}
                variant={week == 1 ? 'default' : 'outlined'}
              />
              <Chip
                label="14 Hari"
                clickable
                onClick={() => {
                  setWeek(2), setValue([null, null]);
                }}
                size="small"
                style={{ width: '30%' }}
                variant={week === 2 ? 'default' : 'outlined'}
              />
              <Chip
                label="1 Bulan"
                clickable
                onClick={() => {
                  setWeek(4), setValue([null, null]);
                }}
                size="small"
                style={{ width: '30%' }}
                variant={week === 4 ? 'default' : 'outlined'}
              />
              <Chip
                label="3 Bulan"
                clickable
                onClick={() => {
                  setWeek(12), setValue([null, null]);
                }}
                size="small"
                style={{ width: '30%' }}
                variant={week === 12 ? 'default' : 'outlined'}
              />
            </Stack>

            <LocalizationProvider dateAdapter={AdapterDayjs} localeText={{ start: 'Start Date', end: 'End Date' }}>
              <DateRangePicker
                value={value}
                maxDate={getWeeksAfter(value[0], week)}
                onChange={(newValue) => {
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
            <Typography style={{ fontSize: '13px' }}>Akun Pelapor</Typography>
          </AccordionSummary>
          <AccordionDetails style={{ padding: 0 }}>
            <TextField style={{ width: '100%' }} placeholder="Cari" />
          </AccordionDetails>
        </Accordion>

        <Accordion elevation={0} defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ padding: '0px' }}>
            <Typography style={{ fontSize: '13px' }}>Akun Dilaporkan</Typography>
          </AccordionSummary>
          <AccordionDetails style={{ padding: 0 }}>
            <TextField style={{ width: '100%' }} placeholder="Cari" />
          </AccordionDetails>
        </Accordion>

        <Accordion elevation={0} defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ padding: '0px' }}>
            <Typography style={{ fontSize: '13px' }}>Jumlah Pelaporan</Typography>
          </AccordionSummary>
          <AccordionDetails style={{ padding: 0 }}>
            <FormGroup>
              <FormControlLabel label={'1-50'} control={<Checkbox defaultChecked={false} />} />
              <FormControlLabel label={'51-100'} control={<Checkbox defaultChecked={false} />} />
              <FormControlLabel label={'101-150'} control={<Checkbox defaultChecked={false} />} />
              <FormControlLabel label={'151-200'} control={<Checkbox defaultChecked={false} />} />
              <FormControlLabel label={'200 > '} control={<Checkbox defaultChecked={false} />} />
            </FormGroup>
          </AccordionDetails>
        </Accordion>

        <Accordion elevation={0} defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ padding: '0px' }}>
            <Typography style={{ fontSize: '13px' }}>Status</Typography>
          </AccordionSummary>
          <AccordionDetails style={{ padding: 0 }}>
            <FormGroup>
              <FormControlLabel label={'Baru'} control={<Checkbox defaultChecked={false} />} />
              <FormControlLabel label={'Ditangguhkan'} control={<Checkbox defaultChecked={false} />} />
              <FormControlLabel label={'Tidak Ditangguhkan'} control={<Checkbox defaultChecked={false} />} />
              <FormControlLabel label={'Dihapus'} control={<Checkbox defaultChecked={false} />} />
            </FormGroup>
          </AccordionDetails>
        </Accordion>

        <Accordion elevation={0} defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ padding: '0px' }}>
            <Typography style={{ fontSize: '13px' }}>Alasan Pelaporan</Typography>
          </AccordionSummary>
          <AccordionDetails style={{ padding: 0 }}>
            <FormGroup>
              <FormControlLabel label={'Melanggar EULA'} control={<Checkbox defaultChecked={false} />} />
              <FormControlLabel label={'Berisikan Konten Dewasa'} control={<Checkbox defaultChecked={false} />} />
              <FormControlLabel
                label={'Mempromosikan kekerasan ekstrim dan terorisme'}
                control={<Checkbox defaultChecked={false} />}
              />
              <FormControlLabel
                label={'Mempromosikan pelecehan dan ancaman'}
                control={<Checkbox defaultChecked={false} />}
              />
            </FormGroup>
          </AccordionDetails>
        </Accordion>
      </Box>
    </>
  );
};

export default SearchSection;
