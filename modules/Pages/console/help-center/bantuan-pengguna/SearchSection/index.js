import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Checkbox from '@mui/material/Checkbox';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from '@mui/material/TextField';
import useStyles from '../index.style';
import { Box, Typography, Chip, FormGroup, FormControlLabel } from '@material-ui/core';
import { Divider, Stack } from '@mui/material';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { debounce } from 'lodash';
import {
  useGetCategoryTicketsQuery,
  useGetLevelTicketsQuery,
  useGetSumberTicketsQuery,
} from 'api/console/helpCenter/bantuan-pengguna';
import moment from 'moment';
import DelayedTextField from 'modules/Components/CommonComponent/DelayedTextField';

const SearchSection = ({ filter, handleChange }) => {
  const classes = useStyles();
  const { data: listSumber, isLoading: loadingSumber } = useGetSumberTicketsQuery();
  const { data: listCategory, isLoading: loadingCategory } = useGetCategoryTicketsQuery();
  const { data: listLevel, isLoading: loadingLevel } = useGetLevelTicketsQuery();

  return (
    <>
      <Box className={classes.inBuildAppCard} p={5} pt={2} style={{ width: '100%', maxWidth: 270 }}>
        <Accordion elevation={0} defaultExpanded disableGutters>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ padding: '0px' }}>
            <Typography style={{ fontSize: '13px' }}>Pencarian Tiket</Typography>
          </AccordionSummary>
          <AccordionDetails style={{ padding: '0px' }}>
            <DelayedTextField
              fullWidth
              waitForInput={true}
              placeholder="Cari No. Tiket / Judul Permasalahan"
              name="search"
              filterValue={filter.search}
              onChange={(e) => handleChange(e.target.name, e.target.value)}
            />
          </AccordionDetails>
          <Divider style={{ marginTop: 16 }} />
        </Accordion>

        <Accordion elevation={0} defaultExpanded disableGutters>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ padding: '0px', minHeight: '0px' }}>
            <Typography style={{ fontSize: '13px' }}>Tanggal Masuk</Typography>
          </AccordionSummary>
          <AccordionDetails style={{ padding: '0px' }}>
            <Stack direction={'column'} spacing={1} mb={3}>
              <Chip
                label="7 Hari"
                clickable
                onClick={() => {
                  handleChange('createdAt', [moment().subtract(7, 'd').format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')]);
                }}
                size="small"
                style={{ width: 'fit-content', height: 35, padding: '0 8px' }}
                variant="outlined"
              />
              <Chip
                label="14 Hari"
                clickable
                onClick={() => {
                  handleChange('createdAt', [
                    moment().subtract(14, 'd').format('YYYY-MM-DD'),
                    moment().format('YYYY-MM-DD'),
                  ]);
                }}
                size="small"
                style={{ width: 'fit-content', height: 35, padding: '0 8px' }}
                variant="outlined"
              />
              <Chip
                label="1 Bulan"
                clickable
                onClick={() => {
                  handleChange('createdAt', [
                    moment().subtract(30, 'd').format('YYYY-MM-DD'),
                    moment().format('YYYY-MM-DD'),
                  ]);
                }}
                size="small"
                style={{ width: 'fit-content', height: 35, padding: '0 8px' }}
                variant="outlined"
              />
              <Chip
                label="3 Bulan"
                clickable
                onClick={() => {
                  handleChange('createdAt', [
                    moment().subtract(90, 'd').format('YYYY-MM-DD'),
                    moment().format('YYYY-MM-DD'),
                  ]);
                }}
                size="small"
                style={{ width: 'fit-content', height: 35, padding: '0 8px' }}
                variant="outlined"
              />
            </Stack>

            <LocalizationProvider dateAdapter={AdapterDayjs} localeText={{ start: 'Start Date', end: 'End Date' }}>
              <DateRangePicker
                value={filter.createdAt}
                onChange={(newValue) => {
                  handleChange('createdAt', [newValue[0]?.format('YYYY-MM-DD'), newValue[1]?.format('YYYY-MM-DD') || null]);
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
          <Divider style={{ marginTop: 16 }} />
        </Accordion>

        <Accordion elevation={0} defaultExpanded disableGutters>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ padding: '0px' }}>
            <Typography style={{ fontSize: '13px' }}>Sumber</Typography>
          </AccordionSummary>
          <AccordionDetails style={{ padding: 0 }}>
            <FormGroup>
              {loadingSumber ? (
                <Typography>loading...</Typography>
              ) : listSumber?.data ? (
                listSumber?.data?.map((item, key) => (
                  <FormControlLabel
                    key={key}
                    label={item?.sourceName}
                    control={
                      <Checkbox
                        defaultChecked={false}
                        color="secondary"
                        onClick={() => handleChange('sumber', JSON.stringify({ _id: item?._id, name: item?.sourceName }))}
                        checked={filter.sumber.map((i) => i?.name).includes(item?.sourceName)}
                      />
                    }
                  />
                ))
              ) : (
                <Typography>Tidak ada data.</Typography>
              )}
            </FormGroup>
          </AccordionDetails>
          <Divider style={{ marginTop: 16 }} />
        </Accordion>

        <Accordion elevation={0} defaultExpanded disableGutters>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ padding: '0px' }}>
            <Typography style={{ fontSize: '13px' }}>Kategori</Typography>
          </AccordionSummary>
          <AccordionDetails style={{ padding: 0 }}>
            <FormGroup>
              {loadingCategory ? (
                <Typography>loading...</Typography>
              ) : listCategory?.data ? (
                listCategory?.data?.map((item, key) => (
                  <FormControlLabel
                    key={key}
                    label={item?.nameCategory}
                    control={
                      <Checkbox
                        defaultChecked={false}
                        color="secondary"
                        onClick={() =>
                          handleChange('category', JSON.stringify({ _id: item?._id, name: item?.nameCategory }))
                        }
                        checked={filter.kategori.map((i) => i?.name).includes(item?.nameCategory)}
                      />
                    }
                  />
                ))
              ) : (
                <Typography>Tidak ada data.</Typography>
              )}
            </FormGroup>
          </AccordionDetails>
          <Divider style={{ marginTop: 16 }} />
        </Accordion>

        <Accordion elevation={0} defaultExpanded disableGutters>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ padding: '0px' }}>
            <Typography style={{ fontSize: '13px' }}>Level</Typography>
          </AccordionSummary>
          <AccordionDetails style={{ padding: 0 }}>
            <FormGroup>
              {loadingLevel ? (
                <Typography>loading...</Typography>
              ) : listLevel?.data ? (
                listLevel?.data?.map((item, key) => (
                  <FormControlLabel
                    key={key}
                    label={item?.descLevel}
                    control={
                      <Checkbox
                        defaultChecked={false}
                        color="secondary"
                        onClick={() => handleChange('level', JSON.stringify({ _id: item?._id, name: item?.descLevel }))}
                        checked={filter.level.map((i) => i?.name).includes(item?.descLevel)}
                      />
                    }
                  />
                ))
              ) : (
                <Typography>Tidak ada data.</Typography>
              )}
            </FormGroup>
          </AccordionDetails>
          <Divider style={{ marginTop: 16 }} />
        </Accordion>

        <Accordion elevation={0} defaultExpanded disableGutters>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ padding: '0px' }}>
            <Typography style={{ fontSize: '13px' }}>Status</Typography>
          </AccordionSummary>
          <AccordionDetails style={{ padding: 0 }}>
            <FormGroup>
              <FormControlLabel
                label={'Baru'}
                control={
                  <Checkbox
                    defaultChecked={false}
                    color="secondary"
                    onClick={() => handleChange('status', 'new')}
                    checked={filter.status.includes('new')}
                  />
                }
              />
              <FormControlLabel
                label={'Dalam Proses'}
                control={
                  <Checkbox
                    defaultChecked={false}
                    color="secondary"
                    onClick={() => handleChange('status', 'onprogress')}
                    checked={filter.status.includes('onprogress')}
                  />
                }
              />
              <FormControlLabel
                label={'Selesai'}
                control={
                  <Checkbox
                    defaultChecked={false}
                    color="secondary"
                    onClick={() => handleChange('status', 'close')}
                    checked={filter.status.includes('close')}
                  />
                }
              />
            </FormGroup>
          </AccordionDetails>
          <Divider style={{ marginTop: 16 }} />
        </Accordion>

        <Accordion elevation={0} defaultExpanded disableGutters>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ padding: '0px' }}>
            <Typography style={{ fontSize: '13px' }}>Penerima Tugas</Typography>
          </AccordionSummary>
          <AccordionDetails style={{ padding: '0px' }}>
            <DelayedTextField
              fullWidth
              waitForInput={true}
              placeholder="Cari Penerima Tugas"
              name="penerima"
              filterValue={filter.assignto}
              onChange={(e) => handleChange(e.target.name, e.target.value)}
            />
          </AccordionDetails>
        </Accordion>
      </Box>
    </>
  );
};

export default SearchSection;
