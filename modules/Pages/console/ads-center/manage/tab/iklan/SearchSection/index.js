import React, { useEffect, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Checkbox from '@mui/material/Checkbox';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from '@mui/material/TextField';
import useStyles from '../../../../../help-center/bantuan-pengguna/index.style';
import { Box, Typography, Chip, FormGroup, FormControlLabel } from '@material-ui/core';
import { Divider, IconButton, InputAdornment, Popover, Radio, RadioGroup, Stack } from '@mui/material';
import DelayedTextField from 'modules/Components/CommonComponent/DelayedTextField';
import { DateRange as DateRangePicker } from 'react-date-range';
import { DateRange, RemoveCircleOutline } from '@material-ui/icons';
import moment from 'moment';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { useGetListSessionBoostQuery } from 'api/console/boost';
import { useGetAdsTypeListQuery } from 'api/console/utilitas/ads';

const SearchSection = ({ filter, handleChange }) => {
  const classes = useStyles();
  const [value, setValue] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);
  const [isDate, setDate] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const { data: adsType, isFetching: loadingType } = useGetAdsTypeListQuery({ page: 0, limit: 10 });

  useEffect(() => {
    if (!filter.createdAt[0] && !filter.createdAt[1]) {
      setValue([
        {
          startDate: new Date(),
          endDate: new Date(),
          key: 'selection',
        },
      ]);
      setDate(false);
    }
  }, [filter.createdAt]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <>
      <Box className={classes.inBuildAppCard} p={5} pt={2} width="100%" maxWidth={270}>
        <Accordion elevation={0} defaultExpanded disableGutters>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ padding: '0px' }}>
            <Typography style={{ fontSize: '13px' }}>Nama Iklan</Typography>
          </AccordionSummary>
          <AccordionDetails style={{ padding: 0 }}>
            <DelayedTextField
              fullWidth
              waitForInput={true}
              placeholder="Cari Nama Iklan"
              name="search"
              filterValue={filter.search}
              onChange={(e) => handleChange('search', e.target.value)}
              color="secondary"
            />
          </AccordionDetails>
          <Divider style={{ marginTop: 16 }} />
        </Accordion>

        <Accordion elevation={0} defaultExpanded disableGutters>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ padding: '0px', minHeight: '0px' }}>
            <Typography style={{ fontSize: '13px' }}>Tanggal Mulai</Typography>
          </AccordionSummary>
          <AccordionDetails style={{ padding: '0px' }}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <TextField
                value={
                  isDate
                    ? `${moment(value[0]?.startDate).format('DD/MM/YYYY')} - ${moment(value[0]?.endDate).format(
                        'DD/MM/YYYY',
                      )}`
                    : ''
                }
                placeholder="Pilih Tanggal"
                autoComplete="off"
                color="secondary"
                onClick={handleClick}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <DateRange />
                    </InputAdornment>
                  ),
                }}
              />
              {isDate && (
                <IconButton
                  style={{ height: 30, width: 30 }}
                  onClick={() => {
                    setValue([
                      {
                        startDate: new Date(),
                        endDate: new Date(),
                        key: 'selection',
                      },
                    ]);
                    handleChange('createdAt', ['', '']);
                    handleChange('labelTanggal', '');
                    setDate(false);
                  }}>
                  <RemoveCircleOutline color="primary" />
                </IconButton>
              )}
            </Stack>

            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}>
              <DateRangePicker
                onChange={(item) => {
                  setValue([item.selection]);
                  handleChange('createdAt', [
                    moment(item.selection.startDate).format('YYYY-MM-DD'),
                    item.selection.endDate ? moment(item.selection.endDate).format('YYYY-MM-DD') : '',
                  ]);
                  handleChange(
                    'labelTanggal',
                    `${moment(item.selection.startDate).format('DD-MM-YYYY')} - ${
                      item.selection.endDate ? moment(item.selection.endDate).format('DD-MM-YYYY') : ''
                    }`,
                  );
                  setDate(true);
                }}
                dragSelectionEnabled={false}
                moveRangeOnFirstSelection={false}
                editableDateInputs={true}
                ranges={value}
                direction="horizontal"
                rangeColors={['#AB22AF']}
              />
            </Popover>
          </AccordionDetails>
          <Divider style={{ marginTop: 16 }} />
        </Accordion>

        <Accordion elevation={0} defaultExpanded disableGutters>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ padding: '0px' }}>
            <Typography style={{ fontSize: '13px' }}>Tipe Iklan</Typography>
          </AccordionSummary>
          <AccordionDetails style={{ padding: 0 }}>
            <FormGroup onChange={(e) => handleChange('type', e.target.value)}>
              {loadingType ? (
                <Typography>Loading data...</Typography>
              ) : (
                adsType?.data?.map((item, key) => (
                  <FormControlLabel
                    label={item?.nameType || '-'}
                    value={JSON.stringify({
                      _id: item?._id,
                      name: item?.nameType,
                    })}
                    control={
                      <Checkbox
                        defaultChecked={false}
                        color="secondary"
                        checked={filter?.type?.map((fi) => fi?._id)?.includes(item?._id)}
                      />
                    }
                  />
                ))
              )}
            </FormGroup>
          </AccordionDetails>
        </Accordion>

        <Accordion elevation={0} defaultExpanded disableGutters>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ padding: '0px' }}>
            <Typography style={{ fontSize: '13px' }}>Plan Tayang</Typography>
          </AccordionSummary>
          <AccordionDetails style={{ padding: 0 }}>
            <RadioGroup value={filter.labelPlan} onChange={(e) => handleChange('rangePlan', e.target.value)}>
              <FormControlLabel
                label={'< 50'}
                value="< 50"
                control={<Radio defaultChecked={false} color="secondary" checked={filter?.labelPlan === '< 50'} />}
              />
              <FormControlLabel
                label={'50 - 99'}
                value="50 - 99"
                control={<Radio defaultChecked={false} color="secondary" checked={filter?.labelPlan === '50 - 99'} />}
              />
              <FormControlLabel
                label={'100 - 500'}
                value="100 - 500"
                control={<Radio defaultChecked={false} color="secondary" checked={filter?.labelPlan === '100 - 500'} />}
              />
              <FormControlLabel
                label={'> 500'}
                value="> 500"
                control={<Radio defaultChecked={false} color="secondary" checked={filter?.labelPlan === '> 500'} />}
              />
            </RadioGroup>
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
                label={'Aktif'}
                value="Aktif"
                control={<Checkbox defaultChecked={false} color="secondary" checked={filter?.status?.includes('Aktif')} />}
              />
              <FormControlLabel
                label={'Tidak Aktif'}
                value="Tidak Aktif"
                control={
                  <Checkbox defaultChecked={false} color="secondary" checked={filter?.status?.includes('Tidak Aktif')} />
                }
              />
              <FormControlLabel
                label={'Ditinjau'}
                value="Ditinjau"
                control={
                  <Checkbox defaultChecked={false} color="secondary" checked={filter?.status?.includes('Ditinjau')} />
                }
              />
              <FormControlLabel
                label={'Draf'}
                value="Draf"
                control={<Checkbox defaultChecked={false} color="secondary" checked={filter?.status?.includes('Draf')} />}
              />
            </FormGroup>
          </AccordionDetails>
        </Accordion>
      </Box>
    </>
  );
};

export default SearchSection;
