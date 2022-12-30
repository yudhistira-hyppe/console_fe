import React, { useEffect, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Checkbox from '@mui/material/Checkbox';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from '@mui/material/TextField';
import useStyles from '../../../../help-center/bantuan-pengguna/index.style';
import { Box, Typography, Chip, FormGroup, FormControlLabel } from '@material-ui/core';
import { Divider, IconButton, InputAdornment, Popover, Radio, RadioGroup, Stack } from '@mui/material';
import DelayedTextField from 'modules/Components/CommonComponent/DelayedTextField';
import { DateRange as DateRangePicker } from 'react-date-range';
import { DateRange, RemoveCircleOutline } from '@material-ui/icons';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import moment from 'moment';
import { useGetInterestContentQuery } from 'api/console/database/content';
import { useGetAreasQuery } from 'api/user/insight';

const SearchSection = ({ filter, handleChange }) => {
  const classes = useStyles();
  const [value, setValue] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);
  const [dateOnline, setDateOnline] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);
  const [anchorEl, setAnchorEl] = useState({
    create: null,
    online: null,
  });
  const [isDate, setDate] = useState(false);
  const [isOnline, setOnline] = useState(false);
  const handleChangeDelay = (e) => handleChange(e.target.name, e.target.value);

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

  useEffect(() => {
    if (!filter.rangeOnline[0] && !filter.rangeOnline[1]) {
      setDateOnline([
        {
          startDate: new Date(),
          endDate: new Date(),
          key: 'selection',
        },
      ]);
      setOnline(false);
    }
  }, [filter.lastOnline]);

  const openCreated = Boolean(anchorEl.create);
  const openOnline = Boolean(anchorEl.online);
  const id = openCreated || openOnline ? 'simple-popover' : undefined;

  const { data: areas, isLoading: loadingArea } = useGetAreasQuery();

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
            <Typography style={{ fontSize: '13px' }}>Tanggal Daftar</Typography>
          </AccordionSummary>
          <AccordionDetails style={{ padding: 0 }}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <TextField
                value={
                  isDate
                    ? `${moment(value[0]?.startDate).format('DD/MM/YYYY')} - ${moment(value[0]?.endDate).format(
                        'DD/MM/YYYY',
                      )}`
                    : ''
                }
                color="secondary"
                placeholder="Pilih Tanggal"
                autoComplete="off"
                onClick={(e) => setAnchorEl({ ...anchorEl, create: e.currentTarget })}
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
                    setDate(false);
                    handleChange('createdAt', [null, null]);
                  }}>
                  <RemoveCircleOutline color="primary" />
                </IconButton>
              )}
            </Stack>

            <Popover
              id={id}
              open={openCreated}
              anchorEl={anchorEl}
              onClose={() => setAnchorEl({ ...anchorEl, create: null })}
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
                  setDate(true);
                }}
                dragSelectionEnabled={false}
                moveRangeOnFirstSelection={false}
                editableDateInputs={true}
                ranges={value}
                direction="horizontal"
              />
            </Popover>
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
                value="FEMALE"
                control={<Checkbox defaultChecked={false} checked={filter.gender.includes('FEMALE')} color="secondary" />}
              />
              <FormControlLabel
                label={'Laki-laki'}
                value="MALE"
                control={<Checkbox defaultChecked={false} checked={filter.gender.includes('MALE')} color="secondary" />}
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
                control={<Radio defaultChecked={false} checked={filter.age === '< 14'} color="secondary" />}
              />
              <FormControlLabel
                label={'15 - 28'}
                value="15 - 28"
                control={<Radio defaultChecked={false} checked={filter.age === '15 - 28'} color="secondary" />}
              />
              <FormControlLabel
                label={'29 - 43'}
                value="29 - 43"
                control={<Radio defaultChecked={false} checked={filter.age === '29 - 43'} color="secondary" />}
              />
              <FormControlLabel
                label={'> 44'}
                value="> 44"
                control={<Radio defaultChecked={false} checked={filter.age === '> 44'} color="secondary" />}
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
                label={'Basic'}
                value="BASIC"
                control={<Checkbox defaultChecked={false} checked={filter.type.includes('BASIC')} color="secondary" />}
              />
              <FormControlLabel
                label={'Premium'}
                value="PREMIUM"
                control={<Checkbox defaultChecked={false} checked={filter.type.includes('PREMIUM')} color="secondary" />}
              />
            </FormGroup>
          </AccordionDetails>
          <Divider style={{ marginTop: 16 }} />
        </Accordion>

        <Accordion elevation={0} disableGutters>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ padding: '0px' }}>
            <Typography style={{ fontSize: '13px' }}>Lokasi</Typography>
          </AccordionSummary>
          <AccordionDetails style={{ padding: 0 }}>
            {loadingArea ? (
              <Typography>Loading data...</Typography>
            ) : (
              <FormGroup onChange={(e) => handleChange('area', e.target.value)}>
                {areas?.map((item, key) => (
                  <FormControlLabel
                    key={key}
                    label={item?.stateName || '-'}
                    value={JSON.stringify({ _id: item?._id, name: item?.stateName })}
                    control={
                      <Checkbox
                        defaultChecked={false}
                        color="secondary"
                        checked={filter.area?.map((item) => item?.name).includes(item?.stateName)}
                      />
                    }
                  />
                ))}
              </FormGroup>
            )}
          </AccordionDetails>
          <Divider style={{ marginTop: 16 }} />
        </Accordion>

        <Accordion elevation={0} defaultExpanded disableGutters>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ padding: '0px' }}>
            <Typography style={{ fontSize: '13px' }}>Terakhir Aktif</Typography>
          </AccordionSummary>
          <AccordionDetails style={{ padding: 0 }}>
            <RadioGroup
              onChange={(e) => {
                handleChange('lastOnline', e.target.name);
                handleChange('rangeOnline', JSON.parse(e.target.value));
                setDateOnline([
                  {
                    startDate: new Date(),
                    endDate: new Date(),
                    key: 'selection',
                  },
                ]);
                setOnline(false);
              }}>
              <FormControlLabel
                name="1 jam lalu"
                label={'1 Jam lalu'}
                value={JSON.stringify([
                  moment().subtract(1, 'hour').format('YYYY-MM-DD HH:mm:ss'),
                  moment().format('YYYY-MM-DD HH:mm:ss'),
                ])}
                control={<Radio defaultChecked={false} checked={filter.lastOnline === '1 jam lalu'} color="secondary" />}
              />
              <FormControlLabel
                name="1 hari lalu"
                label={'1 Hari lalu'}
                value={JSON.stringify([
                  moment().subtract(1, 'day').format('YYYY-MM-DD HH:mm:ss'),
                  moment().format('YYYY-MM-DD HH:mm:ss'),
                ])}
                control={<Radio defaultChecked={false} checked={filter.lastOnline === '1 hari lalu'} color="secondary" />}
              />
              <FormControlLabel
                name="1 minggu lalu"
                label={'1 minggu lalu'}
                value={JSON.stringify([
                  moment().subtract(1, 'week').format('YYYY-MM-DD HH:mm:ss'),
                  moment().format('YYYY-MM-DD HH:mm:ss'),
                ])}
                control={<Radio defaultChecked={false} checked={filter.lastOnline === '1 minggu lalu'} color="secondary" />}
              />
              <FormControlLabel
                name="1 bulan lalu"
                label={'1 Bulan lalu'}
                value={JSON.stringify([
                  moment().subtract(1, 'month').format('YYYY-MM-DD HH:mm:ss'),
                  moment().format('YYYY-MM-DD HH:mm:ss'),
                ])}
                control={<Radio defaultChecked={false} checked={filter.lastOnline === '1 bulan lalu'} color="secondary" />}
              />
            </RadioGroup>
            <Stack direction="row" alignItems="center" spacing={1} mt={1}>
              <TextField
                value={
                  isOnline
                    ? `${moment(dateOnline[0]?.startDate).format('DD/MM/YYYY')} - ${moment(dateOnline[0]?.endDate).format(
                        'DD/MM/YYYY',
                      )}`
                    : ''
                }
                color="secondary"
                placeholder="Pilih Tanggal"
                autoComplete="off"
                onClick={(e) => setAnchorEl({ ...anchorEl, online: e.currentTarget })}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <DateRange />
                    </InputAdornment>
                  ),
                }}
              />
            </Stack>

            <Popover
              id={id}
              open={openOnline}
              anchorEl={anchorEl}
              onClose={() => setAnchorEl({ ...anchorEl, online: null })}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}>
              <DateRangePicker
                onChange={(item) => {
                  setDateOnline([item.selection]);
                  handleChange('rangeOnline', [
                    moment(item.selection.startDate).format('YYYY-MM-DD'),
                    item.selection.endDate ? moment(item.selection.endDate).format('YYYY-MM-DD') : '',
                  ]);
                  setOnline(true);
                  handleChange('lastOnline', 'range');
                }}
                dragSelectionEnabled={false}
                moveRangeOnFirstSelection={false}
                editableDateInputs={true}
                ranges={dateOnline}
                direction="horizontal"
              />
            </Popover>
          </AccordionDetails>
        </Accordion>
      </Box>
    </>
  );
};

export default SearchSection;
