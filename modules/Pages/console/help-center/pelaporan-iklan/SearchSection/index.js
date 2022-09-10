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
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Stack } from '@mui/material';

const SearchSection = ({ value, setValue }) => {
  const classes = useStyles();

  return (
    <>
      <Box className={classes.inBuildAppCard} p={5} maxWidth={'25%'}>
        <Accordion elevation={0} defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ padding: '0px', minHeight: '0px' }}>
            <Typography style={{ fontSize: '13px' }}>Tanggal Masuk</Typography>
          </AccordionSummary>
          <AccordionDetails style={{ padding: '0px' }}>
            <Stack direction={'column'} spacing={1} mb={3}>
              <Chip label="7 Hari" size="small" style={{ width: '30%' }} variant="outlined" />
              <Chip label="14 Hari" size="small" style={{ width: '30%' }} variant="outlined" />
              <Chip label="1 Bulan" size="small" style={{ width: '30%' }} variant="outlined" />
              <Chip label="3 Bulan" size="small" style={{ width: '30%' }} variant="outlined" />
            </Stack>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={value}
                onChange={(newValue) => {
                  setValue(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
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
            <Typography style={{ fontSize: '13px' }}>Konten Dilaporkan</Typography>
          </AccordionSummary>
          <AccordionDetails style={{ padding: 0 }}>
            <TextField style={{ width: '100%' }} placeholder="Cari" />
          </AccordionDetails>
        </Accordion>

        <Accordion elevation={0} defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ padding: '0px' }}>
            <Typography style={{ fontSize: '13px' }}>Jumlah Pelaporan</Typography>
          </AccordionSummary>
          <AccordionDetails style={{ padding: '10 0' }}>
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
          <AccordionDetails style={{ padding: '10 0' }}>
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
          <AccordionDetails style={{ padding: '10 0' }}>
            <FormGroup>
              <FormControlLabel label={'Menyesatkan atau Scam'} control={<Checkbox defaultChecked={false} />} />
              <FormControlLabel
                label={'Konten yang melanggar, Berbahaya, Atau Mengandung Kekerasan'}
                control={<Checkbox defaultChecked={false} />}
              />
              <FormControlLabel label={'Konten Seksual Yang Tidak Pantas'} control={<Checkbox defaultChecked={false} />} />
              <FormControlLabel
                label={'Dukungan Ilegal Atau Yang Tidak Semestinya'}
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
