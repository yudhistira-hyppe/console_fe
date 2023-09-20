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
import { DateRange as DateRangePicker } from 'react-date-range';
import { DateRange, RemoveCircleOutline } from '@material-ui/icons';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import moment from 'moment';
import DelayedTextField from 'modules/Components/CommonComponent/DelayedTextField';
import { useGetStickerCategoryQuery } from 'api/console/database';
import ScrollBar from 'react-perfect-scrollbar';

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

  const { data: category, isFetching: loadingCategory } = useGetStickerCategoryQuery({ tipesticker: 'STICKER' });

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
    <>
      <Box className={classes.inBuildAppCard} p={5} pt={2} maxWidth={270}>
        <Accordion elevation={0} defaultExpanded disableGutters>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ padding: '0px' }}>
            <Typography style={{ fontSize: '13px' }}>Nama Stiker</Typography>
          </AccordionSummary>
          <AccordionDetails style={{ padding: 0 }}>
            <DelayedTextField
              fullWidth
              waitForInput={true}
              placeholder="Cari stiker"
              name="sticker"
              filterValue={filter.sticker}
              onChange={(e) => handleChangeDelay(e)}
              color="secondary"
            />
          </AccordionDetails>
          <Divider style={{ marginTop: 16 }} />
        </Accordion>

        <Accordion elevation={0} defaultExpanded disableGutters>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ padding: '0px' }}>
            <Typography style={{ fontSize: '13px' }}>Tanggal Diunggah</Typography>
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
            <Typography style={{ fontSize: '13px' }}>Kategori</Typography>
          </AccordionSummary>
          <AccordionDetails style={{ padding: 0 }}>
            <ScrollBar style={{ height: 210 }}>
              <FormGroup onChange={(e) => handleChange('category', e.target.value)}>
                {loadingCategory ? (
                  <Typography>Loading data...</Typography>
                ) : category?.data?.length >= 1 ? (
                  category?.data?.map((item, key) => (
                    <FormControlLabel
                      key={key}
                      label={item?.name}
                      value={JSON.stringify(item)}
                      control={
                        <Checkbox checked={filter.category?.map((t) => t.name).includes(item?.name)} color="secondary" />
                      }
                    />
                  ))
                ) : (
                  <Typography>Tidak ada data.</Typography>
                )}
              </FormGroup>
            </ScrollBar>
          </AccordionDetails>
          <Divider style={{ marginTop: 16 }} />
        </Accordion>

        <Accordion elevation={0} defaultExpanded disableGutters>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ padding: '0px' }}>
            <Typography style={{ fontSize: '13px' }}>Jumlah Digunakan</Typography>
          </AccordionSummary>
          <AccordionDetails style={{ padding: 0 }}>
            <RadioGroup value={filter.labelPenggunaan} onChange={(e) => handleChange('rangePenggunaan', e.target.value)}>
              <FormControlLabel
                label={'<= 200'}
                value="<= 200"
                control={<Radio color="secondary" checked={filter.labelPenggunaan === '<= 200'} />}
              />
              <FormControlLabel
                label={'201 - 500'}
                value="201 - 500"
                control={<Radio color="secondary" checked={filter.labelPenggunaan === '201 - 500'} />}
              />
              <FormControlLabel
                label={'501 - 750'}
                value="501 - 750"
                control={<Radio color="secondary" checked={filter.labelPenggunaan === '501 - 750'} />}
              />
              <FormControlLabel
                label={'751 - 1000'}
                value="751 - 1000"
                control={<Radio color="secondary" checked={filter.labelPenggunaan === '751 - 1000'} />}
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
                control={<Checkbox checked={filter.status.includes('Aktif')} color="secondary" />}
              />
              <FormControlLabel
                label={'Tidak Aktif'}
                value="Tidak Aktif"
                control={<Checkbox checked={filter.status.includes('Tidak Aktif')} color="secondary" />}
              />
            </FormGroup>
          </AccordionDetails>
        </Accordion>
      </Box>
    </>
  );
};

export default SearchSection;
