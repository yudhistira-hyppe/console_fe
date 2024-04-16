import React, { useEffect, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Checkbox from '@mui/material/Checkbox';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from '@mui/material/TextField';
import useStyles from '../../../../help-center/bantuan-pengguna/index.style';
import { Box, Typography, Chip, FormGroup, FormControlLabel } from '@material-ui/core';
import { Autocomplete, Divider, IconButton, InputAdornment, Popover, Radio, RadioGroup, Stack } from '@mui/material';
import DelayedTextField from 'modules/Components/CommonComponent/DelayedTextField';
import { DateRange as DateRangePicker } from 'react-date-range';
import { DateRange, RemoveCircleOutline } from '@material-ui/icons';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import moment from 'moment';
import { useGetInterestContentQuery } from 'api/console/database';

const SearchSection = ({ filter, handleChange }) => {
  const classes = useStyles();
  const [value, setValue] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isDate, setDate] = useState(false);
  const handleChangeDelay = (e) => handleChange(e.target.name, e.target.value);

  useEffect(() => {
    if (!filter.createdAt[0] && !null) {
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

  const { data: interests, isFetching: loadingInterest } = useGetInterestContentQuery();

  const handlePress = (e) => {
    console.log(e);
  };

  return (
    <>
      <Box className={classes.inBuildAppCard} p={5} pt={2} maxWidth={270}>
        <Accordion elevation={0} defaultExpanded disableGutters>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ padding: '0px' }}>
            <Typography style={{ fontSize: '13px' }}>Deskripsi Konten</Typography>
          </AccordionSummary>
          <AccordionDetails style={{ padding: 0 }}>
            <DelayedTextField
              fullWidth
              waitForInput={true}
              placeholder="Cari Konten"
              name="description"
              filterValue={filter.description}
              onChange={(e) => handleChangeDelay(e)}
              color="secondary"
            />
          </AccordionDetails>
          <Divider style={{ marginTop: 16 }} />
        </Accordion>

        <Accordion elevation={0} defaultExpanded disableGutters>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ padding: '0px' }}>
            <Typography style={{ fontSize: '13px' }}>Hashtag Konten</Typography>
          </AccordionSummary>
          <AccordionDetails style={{ padding: 0 }}>
            <Autocomplete
              multiple
              options={[]}
              value={filter.hashtag}
              onChange={(e) => {
                if (e.code === 'Enter') {
                  handleChangeDelay({ target: { name: 'hashtag', value: e.target.value } });
                } else if (e.type === 'click') {
                  handleChangeDelay({ target: { name: 'clearHashtag', value: [] } });
                } else {
                  return;
                }
              }}
              freeSolo
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    {...getTagProps({ index })}
                    variant="outlined"
                    label={option}
                    onDelete={() => {
                      if (value?.length <= 1) {
                        handleChangeDelay({ target: { name: 'clearHashtag', value: [] } });
                      } else {
                        handleChangeDelay({ target: { name: 'hashtag', value: option } });
                      }
                    }}
                  />
                ))
              }
              renderInput={(params) => (
                <DelayedTextField
                  {...params}
                  fullWidth
                  waitForInput={true}
                  filterValue={''}
                  placeholder="Cari Hashtag"
                  name="hashtag"
                  onChange={(e) => {}}
                  color="secondary"
                />
              )}
            />
          </AccordionDetails>
          <Divider style={{ marginTop: 16 }} />
        </Accordion>

        <Accordion elevation={0} defaultExpanded disableGutters>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ padding: '0px' }}>
            <Typography style={{ fontSize: '13px' }}>Pemilik Konten</Typography>
          </AccordionSummary>
          <AccordionDetails style={{ padding: 0 }}>
            <DelayedTextField
              fullWidth
              waitForInput={true}
              placeholder="Cari Username / Email"
              name="pemilik"
              filterValue={filter.pemilik}
              onChange={(e) => handleChangeDelay(e)}
              color="secondary"
            />
          </AccordionDetails>
          <Divider style={{ marginTop: 16 }} />
        </Accordion>

        <Accordion elevation={0} defaultExpanded disableGutters>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ padding: '0px' }}>
            <Typography style={{ fontSize: '13px' }}>Tanggal Post</Typography>
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
                    setDate(false);
                    handleChange('createdAt', [null, null]);
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
                  setDate(true);
                }}
                onRangeFocusChange={(date) => {
                  if (date?.[1] < 1) {
                    handleClose();
                  }
                }}
                dragSelectionEnabled={false}
                moveRangeOnFirstSelection={false}
                editableDateInputs={true}
                ranges={value}
                rangeColors={['#AA22AF']}
                direction="horizontal"
              />
            </Popover>
          </AccordionDetails>
          <Divider style={{ marginTop: 16 }} />
        </Accordion>

        <Accordion elevation={0} defaultExpanded disableGutters>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ padding: '0px' }}>
            <Typography style={{ fontSize: '13px' }}>Status Kepemilikan</Typography>
          </AccordionSummary>
          <AccordionDetails style={{ padding: 0 }}>
            <FormGroup onChange={(e) => handleChange('status', e.target.value)}>
              <FormControlLabel
                label={'Terdaftar'}
                value="terdaftar"
                control={<Checkbox defaultChecked={false} checked={filter.status.includes('terdaftar')} color="secondary" />}
              />
              <FormControlLabel
                label={'Tidak Terdaftar'}
                value="tidak terdaftar"
                control={
                  <Checkbox defaultChecked={false} checked={filter.status.includes('tidak terdaftar')} color="secondary" />
                }
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
                label={'HyppeStory'}
                value="HyppeStory"
                control={<Checkbox defaultChecked={false} checked={filter.type.includes('HyppeStory')} color="secondary" />}
              />
              <FormControlLabel
                label={'HyppeVid'}
                value="HyppeVid"
                control={<Checkbox defaultChecked={false} checked={filter.type.includes('HyppeVid')} color="secondary" />}
              />
              <FormControlLabel
                label={'HyppePic'}
                value="HyppePic"
                control={<Checkbox defaultChecked={false} checked={filter.type.includes('HyppePic')} color="secondary" />}
              />
            </FormGroup>
          </AccordionDetails>
          <Divider style={{ marginTop: 16 }} />
        </Accordion>

        <Accordion elevation={0} disableGutters>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ padding: '0px' }}>
            <Typography style={{ fontSize: '13px' }}>Kategori</Typography>
          </AccordionSummary>
          <AccordionDetails style={{ padding: 0 }}>
            {loadingInterest ? (
              <Typography>Loading data...</Typography>
            ) : (
              <FormGroup onChange={(e) => handleChange('category', e.target.value)}>
                {interests?.map((item, key) => (
                  <FormControlLabel
                    key={key}
                    label={item?.interestName || '-'}
                    value={JSON.stringify({ _id: item?._id, name: item?.interestName })}
                    control={
                      <Checkbox
                        defaultChecked={false}
                        color="secondary"
                        checked={filter.category?.map((item) => item?.name).includes(item?.interestName)}
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
            <Typography style={{ fontSize: '13px' }}>Status penjualan</Typography>
          </AccordionSummary>
          <AccordionDetails style={{ padding: 0 }}>
            <FormGroup onChange={(e) => handleChange('is_sell', e.target.value)}>
              <FormControlLabel
                label={'Dijual'}
                value="dijual"
                control={<Checkbox defaultChecked={false} checked={filter.is_sell.includes('dijual')} color="secondary" />}
              />
              <FormControlLabel
                label={'Tidak Dijual'}
                value="tidak dijual"
                control={
                  <Checkbox defaultChecked={false} checked={filter.is_sell.includes('tidak dijual')} color="secondary" />
                }
              />
            </FormGroup>
          </AccordionDetails>
          <Divider style={{ marginTop: 16 }} />
        </Accordion>

        <Accordion elevation={0} defaultExpanded disableGutters>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ padding: '0px' }}>
            <Typography style={{ fontSize: '13px' }}>Harga Jual</Typography>
          </AccordionSummary>
          <AccordionDetails style={{ padding: 0 }}>
            <Stack direction="column" gap="20px">
              <DelayedTextField
                fullWidth
                waitForInput={true}
                filterValue={filter.min_price}
                type="number"
                placeholder="Harga Minimum"
                onChange={(e) => handleChange('min_price', e.target.value)}
                autoComplete="off"
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
                filterValue={filter.max_price}
                type="number"
                placeholder="Harga Maksimum"
                onChange={(e) => handleChange('max_price', e.target.value)}
                autoComplete="off"
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
        </Accordion>

        {/* <Accordion elevation={0} defaultExpanded disableGutters>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ padding: '0px' }}>
            <Typography style={{ fontSize: '13px' }}>Tanggal Pendaftaran (Ownership)</Typography>
          </AccordionSummary>
          <AccordionDetails style={{ padding: 0 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs} localeText={{ start: 'Start Date', end: 'End Date' }}>
              <DateRangePicker
                value={filter.ownedAt}
                onChange={(newValue) => {
                  handleChange('ownedAt', [newValue[0]?.format('YYYY-MM-DD'), newValue[1]?.format('YYYY-MM-DD') || null]);
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
        </Accordion> */}
      </Box>
    </>
  );
};

export default SearchSection;
