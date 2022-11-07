import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Checkbox from '@mui/material/Checkbox';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from '@mui/material/TextField';
import useStyles from '../../../help-center/bantuan-pengguna/index.style';
import { Box, Typography, Chip, FormGroup, FormControlLabel } from '@material-ui/core';
import { Stack } from '@mui/material';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { debounce } from 'lodash';

const CheckboxItem = ({ label, value, onClick, checked }) => (
    <FormControlLabel
      label={label}
      control={<Checkbox checked={checked} defaultChecked={false} value={value} onClick={onClick} />}
    />
);

const status = [
    { label: 'Tinjau', value: 'onReview' },
    { label: 'Dijadwalkan', value: 'onScheduled' },
    { label: 'Tayang', value: 'onShow' },
    { label: 'Ditolak', value: 'denied' }
]

const kredit = [
    { label: '> 200 Kredit', value: '> 200' },
    { label: '201-500 Kredit', value: '201-500' },
    { label: '501-750 Kredit', value: '501-750' },
    { label: '751-1.000 Kredit', value: '751-1.000' }
]

const SearchSection = ({ handleChange, filter }) => {
  const classes = useStyles();
  const [week, setWeek] = React.useState(null);
  const [value, setValue] = React.useState([null, null]);
  function getWeeksAfter(date, amount) {
    return date && amount ? date.add(amount, 'week') : undefined;
  }
 
  const handleSearch = debounce((e) => handleChange(e.target.name, e.target.value), 500);

  return (
    <>
      <Box className={classes.inBuildAppCard} p={5}>
        <Accordion elevation={0} defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ padding: '0px', minHeight: '0px' }}>
            <Typography style={{ fontSize: '13px' }}>Tanggal Pembuatan</Typography>
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
                style={{ width: '35%' }}
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
                style={{ width: '35%' }}
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
                style={{ width: '35%' }}
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
                style={{ width: '35%' }}
                variant={week === 12 ? 'default' : 'outlined'}
              />
            </Stack>
          </AccordionDetails>
        </Accordion>

        <Accordion elevation={0} defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ padding: '0px' }}>
            <Typography style={{ fontSize: '13px' }}>Status</Typography>
          </AccordionSummary>
          <AccordionDetails style={{ padding: 0 }}>
            <FormGroup>
              {
                status?.map((el, key) => (
                    <CheckboxItem 
                        label={el.label}
                        value={el.value}
                        onClick={() => handleChange('status', el.value)}
                        checked={filter.status === el.value}
                    />
                ))
              }
            </FormGroup>
          </AccordionDetails>
        </Accordion>

        <Accordion elevation={0} defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ padding: '0px' }}>
            <Typography style={{ fontSize: '13px' }}>Penggunaan Kredut</Typography>
          </AccordionSummary>
          <AccordionDetails style={{ padding: 0 }}>
            <FormGroup>
              {
                kredit?.map((el, key) => (
                    <CheckboxItem 
                        label={el.label}
                        value={el.value}
                        checked={filter.penggunaan_kredit === el.value}
                        onClick={() => handleChange('penggunaan_kredit', el.value)}
                    />
                ))
              }
            </FormGroup>
          </AccordionDetails>
        </Accordion>

      </Box>
    </>
  );
};

export default SearchSection;
