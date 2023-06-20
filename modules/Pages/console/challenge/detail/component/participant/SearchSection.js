import React, { useEffect, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Checkbox from '@mui/material/Checkbox';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import useStyles from '../../../../help-center/bantuan-pengguna/index.style';
import { Box, Typography, Chip, FormGroup, FormControlLabel } from '@material-ui/core';
import { Divider, IconButton, InputAdornment, Popover, Radio, RadioGroup, Stack } from '@mui/material';
import DelayedTextField from 'modules/Components/CommonComponent/DelayedTextField';
import { DateRange as DateRangePicker } from 'react-date-range';
import { DateRange, RemoveCircleOutline, Search } from '@material-ui/icons';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

const SearchSection = ({ filter, handleChange }) => {
  const classes = useStyles();
  const handleChangeDelay = (e) => handleChange(e.target.name, e.target.value);

  return (
    <>
      <Box className={classes.inBuildAppCard} p={5} pt={2} maxWidth={270}>
        <Accordion elevation={0} defaultExpanded disableGutters>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ padding: '0px' }}>
            <Typography style={{ fontSize: '13px' }}>Username Akun</Typography>
          </AccordionSummary>
          <AccordionDetails style={{ padding: 0 }}>
            <DelayedTextField
              fullWidth
              waitForInput={true}
              placeholder="Cari Username"
              name="username"
              filterValue={filter.username}
              onChange={(e) => handleChangeDelay(e)}
              color="secondary"
            />
          </AccordionDetails>
          <Divider style={{ marginTop: 16 }} />
        </Accordion>

        <Accordion elevation={0} defaultExpanded disableGutters>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ padding: '0px' }}>
            <Typography style={{ fontSize: '13px' }}>Jenis Kelamin</Typography>
          </AccordionSummary>
          <AccordionDetails style={{ padding: 0 }}>
            <FormGroup onChange={(e) => handleChange('gender', e.target.value)}>
              <FormControlLabel
                label={'Perempuan'}
                value="Perempuan"
                control={<Checkbox checked={filter.gender.includes('Perempuan')} color="secondary" />}
              />
              <FormControlLabel
                label={'Laki-laki'}
                value="Laki-laki"
                control={<Checkbox checked={filter.gender.includes('Laki-laki')} color="secondary" />}
              />
              <FormControlLabel
                label={'Lainnya'}
                value="Lainnya"
                control={<Checkbox checked={filter.gender.includes('Lainnya')} color="secondary" />}
              />
            </FormGroup>
          </AccordionDetails>
          <Divider style={{ marginTop: 16 }} />
        </Accordion>

        <Accordion elevation={0} defaultExpanded disableGutters>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ padding: '0px' }}>
            <Typography style={{ fontSize: '13px' }}>Rentang Umur</Typography>
          </AccordionSummary>
          <AccordionDetails style={{ padding: 0 }}>
            <RadioGroup onChange={(e) => handleChange('age', e.target.value)}>
              <FormControlLabel
                label={'< 14'}
                value="< 14"
                control={<Radio checked={filter.age === '< 14'} color="secondary" />}
              />
              <FormControlLabel
                label={'15 - 28'}
                value="15 - 28"
                control={<Radio checked={filter.age === '15 - 28'} color="secondary" />}
              />
              <FormControlLabel
                label={'29 - 43'}
                value="29 - 43"
                control={<Radio checked={filter.age === '29 - 43'} color="secondary" />}
              />
              <FormControlLabel
                label={'> 44'}
                value="> 44"
                control={<Radio checked={filter.age === '> 44'} color="secondary" />}
              />
            </RadioGroup>
          </AccordionDetails>
          <Divider style={{ marginTop: 16 }} />
        </Accordion>

        <Accordion elevation={0} defaultExpanded disableGutters>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ padding: '0px' }}>
            <Typography style={{ fontSize: '13px' }}>Tipe Akun</Typography>
          </AccordionSummary>
          <AccordionDetails style={{ padding: 0 }}>
            <FormGroup onChange={(e) => handleChange('type', e.target.value)}>
              <FormControlLabel
                label={'Tidak Terverifikasi'}
                value="BASIC"
                control={<Checkbox checked={filter.type.includes('BASIC')} color="secondary" />}
              />
              <FormControlLabel
                label={'Terverifikasi'}
                value="PREMIUM"
                control={<Checkbox checked={filter.type.includes('PREMIUM')} color="secondary" />}
              />
            </FormGroup>
          </AccordionDetails>
        </Accordion>
      </Box>
    </>
  );
};

export default SearchSection;
