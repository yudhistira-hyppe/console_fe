import React, { useEffect, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from '@mui/material/TextField';
import useStyles from '../../../../help-center/bantuan-pengguna/index.style';
import { Box, Typography } from '@material-ui/core';
import {
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  IconButton,
  InputAdornment,
  Popover,
  Radio,
  RadioGroup,
  Stack,
} from '@mui/material';
import { DateRange as DateRangePicker } from 'react-date-range';
import { DateRange, RemoveCircleOutline } from '@material-ui/icons';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import moment from 'moment';
import DelayedTextField from 'modules/Components/CommonComponent/DelayedTextField';
import { useGetGroupQuery } from 'api/console/group';
import ScrollBar from 'react-perfect-scrollbar';
import { useGetDivisiQuery } from 'api/console/divisi';

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

  const { data: listJabatan, isLoading: loadingJabatan } = useGetGroupQuery({ skip: 0, limit: 100 });
  const { data: listDivisi, isLoading: loadingDivisi } = useGetDivisiQuery({ skip: 0, limit: 100 });

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
    // handleChange('createdAt', [null, null]);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <Box className={classes.inBuildAppCard} p={5} pt={2} maxWidth={270}>
      <Accordion elevation={0} defaultExpanded disableGutters>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ padding: '0px' }}>
          <Typography style={{ fontSize: '13px' }}>Nama / Email</Typography>
        </AccordionSummary>
        <AccordionDetails style={{ padding: 0 }}>
          <DelayedTextField
            fullWidth
            waitForInput={true}
            placeholder="Cari berdasarkan nama atau email"
            name="search"
            filterValue={filter?.search}
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
                  ? `${moment(value[0]?.startDate).format('DD/MM/YYYY')} - ${moment(value[0]?.endDate).format('DD/MM/YYYY')}`
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
          <Typography style={{ fontSize: '13px' }}>Divisi</Typography>
        </AccordionSummary>
        <AccordionDetails style={{ padding: 0 }}>
          <ScrollBar style={{ maxHeight: 200 }}>
            <FormGroup onChange={(e) => handleChange('divisi', e.target.value)}>
              {loadingDivisi ? (
                <Typography>Loading data...</Typography>
              ) : (
                listDivisi?.data?.map((item, key) => (
                  <FormControlLabel
                    key={key}
                    label={item?.nameDivision}
                    value={item?.nameDivision}
                    control={<Checkbox color="secondary" checked={filter?.divisi?.includes(item?.nameDivision)} />}
                  />
                ))
              )}
            </FormGroup>
          </ScrollBar>
        </AccordionDetails>
        <Divider style={{ marginTop: 16 }} />
      </Accordion>

      <Accordion elevation={0} defaultExpanded disableGutters>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ padding: '0px' }}>
          <Typography style={{ fontSize: '13px' }}>Jabatan</Typography>
        </AccordionSummary>
        <AccordionDetails style={{ padding: 0 }}>
          <ScrollBar style={{ maxHeight: 200 }}>
            <FormGroup onChange={(e) => handleChange('jabatan', e.target.value)}>
              {loadingJabatan ? (
                <Typography>Loading data...</Typography>
              ) : (
                listJabatan?.data?.map((item, key) => (
                  <FormControlLabel
                    key={key}
                    label={item?.nameGroup}
                    value={item?.nameGroup}
                    control={<Checkbox color="secondary" checked={filter?.jabatan?.includes(item?.nameGroup)} />}
                  />
                ))
              )}
            </FormGroup>
          </ScrollBar>
        </AccordionDetails>
        <Divider style={{ marginTop: 16 }} />
      </Accordion>

      <Accordion elevation={0} defaultExpanded disableGutters>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ padding: '0px' }}>
          <Typography style={{ fontSize: '13px' }}>Status</Typography>
        </AccordionSummary>
        <AccordionDetails style={{ padding: 0 }}>
          <RadioGroup onChange={(e) => handleChange('status', e.target.value)}>
            <FormControlLabel
              label="Aktif"
              value="true"
              control={<Radio color="secondary" checked={filter?.status === 'true'} />}
            />
            <FormControlLabel
              label="Tidak Aktif"
              value="false"
              control={<Radio color="secondary" checked={filter?.status === 'false'} />}
            />
          </RadioGroup>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default SearchSection;
