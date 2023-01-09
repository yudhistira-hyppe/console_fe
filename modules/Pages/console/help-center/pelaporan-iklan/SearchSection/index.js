import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Checkbox from '@mui/material/Checkbox';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from '@mui/material/TextField';
import useStyles from '../../bantuan-pengguna/index.style';
import { Box, Typography, Chip, FormGroup, FormControlLabel } from '@material-ui/core';
import { Divider, Radio, RadioGroup, Stack } from '@mui/material';
import { DateRangePicker } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { debounce } from 'lodash';
import { useGetReportReasonQuery } from 'api/console/helpCenter/iklan';
import DelayedTextField from 'modules/Components/CommonComponent/DelayedTextField';

const SearchSection = ({ filter, handleChange }) => {
  const classes = useStyles();
  const [week, setWeek] = React.useState(null);
  const [value, setValue] = React.useState([null, null]);
  function getWeeksAfter(date, amount) {
    return date && amount ? date.add(amount, 'week') : undefined;
  }

  const handleChangeDelay = debounce((e) => handleChange(e.target.name, e.target.value), 500);

  const { data: reason, isFetching: loadingReason } = useGetReportReasonQuery({ type: 'content' });

  return (
    <>
      <Box className={classes.inBuildAppCard} p={5} pt={2} style={{ width: 270 }}>
        <Accordion elevation={0} defaultExpanded disableGutters>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ padding: '0px' }}>
            <Typography style={{ fontSize: '13px' }}>Iklan Dilaporkan</Typography>
          </AccordionSummary>
          <AccordionDetails style={{ padding: 0 }}>
            <DelayedTextField
              fullWidth
              waitForInput={true}
              placeholder="Cari Iklan"
              color="secondary"
              name="search"
              filterValue={filter.search}
              onChange={(e) => handleChange(e.target.name, e.target.value)}
            />
          </AccordionDetails>
          <Divider style={{ marginTop: 16 }} />
        </Accordion>

        <Accordion elevation={0} defaultExpanded disableGutters>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ padding: '0px' }}>
            <Typography style={{ fontSize: '13px' }}>Jumlah Pelaporan</Typography>
          </AccordionSummary>
          <AccordionDetails style={{ padding: 0 }}>
            <RadioGroup value={filter.range} onChange={(e) => handleChange('range', e.target.value)}>
              <FormControlLabel value="1-50" label={'1-50'} control={<Radio color="secondary" />} />
              <FormControlLabel value="51-100" label={'51-100'} control={<Radio color="secondary" />} />
              <FormControlLabel value="101-150" label={'101-150'} control={<Radio color="secondary" />} />
              <FormControlLabel value="151-200" label={'151-200'} control={<Radio color="secondary" />} />
            </RadioGroup>
            <Stack direction="row" spacing={1} mt={1}>
              <DelayedTextField
                fullWidth
                waitForInput={true}
                placeholder="From"
                name="startreport"
                filterValue={filter.rangeReport[0]}
                onChange={(e) => handleChange(e.target.name, Number(e.target.value))}
                color="secondary"
                inputProps={{
                  min: 0,
                  onKeyPress: (event) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                  },
                }}
              />
              <DelayedTextField
                fullWidth
                waitForInput={true}
                placeholder="To"
                name="endreport"
                filterValue={filter.rangeReport[1]}
                onChange={(e) => handleChange(e.target.name, Number(e.target.value))}
                color="secondary"
                inputProps={{
                  min: 0,
                  onKeyPress: (event) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                  },
                }}
              />
            </Stack>
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
                control={<Checkbox defaultChecked={false} color="secondary" checked={filter.status?.includes('BARU')} />}
              />
              <FormControlLabel
                label={'Dipulihkan'}
                value="TIDAK DITANGGUHKAN"
                control={
                  <Checkbox
                    defaultChecked={false}
                    color="secondary"
                    checked={filter.status?.includes('TIDAK DITANGGUHKAN')}
                  />
                }
              />
              <FormControlLabel
                label={'Ditangguhkan'}
                value="DITANGGUHKAN"
                control={
                  <Checkbox defaultChecked={false} color="secondary" checked={filter.status?.includes('DITANGGUHKAN')} />
                }
              />
              <FormControlLabel
                label={'Ditandai Sensitif'}
                value="FLAGING"
                control={<Checkbox defaultChecked={false} color="secondary" checked={filter.status?.includes('FLAGING')} />}
              />
            </FormGroup>
          </AccordionDetails>
          <Divider style={{ marginTop: 16 }} />
        </Accordion>

        <Accordion elevation={0} defaultExpanded disableGutters>
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
                    value={JSON.stringify({ _id: item?._id, name: item?.description })}
                    label={<Typography style={{ fontSize: 12 }}>{item?.description}</Typography>}
                    control={
                      <Checkbox
                        defaultChecked={false}
                        color="secondary"
                        checked={filter.reason.map((item) => item?.name).includes(item?.description)}
                      />
                    }
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
