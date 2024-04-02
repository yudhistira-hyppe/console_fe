import React, { useEffect, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Typography } from '@material-ui/core';
import { Button, Card, Chip, Stack } from '@mui/material';
import DelayedTextField from 'modules/Components/CommonComponent/DelayedTextField';
import { Add, Edit } from '@material-ui/icons';
import Router from 'next/router';

const SearchSection = ({ filter, handleChange }) => {
  const access = localStorage.getItem('access') ? JSON.parse(localStorage.getItem('access')) : [];

  return (
    <Stack direction="column" gap={3} maxWidth={270}>
      {/* Search Bank */}
      <Card style={{ padding: '12px 24px 24px' }}>
        <Stack direction="column" gap={2}>
          <Accordion elevation={0} defaultExpanded disableGutters>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ padding: '0px' }}>
              <Typography style={{ fontSize: '13px' }}>Nama Bank</Typography>
            </AccordionSummary>
            <AccordionDetails style={{ padding: 0 }}>
              <DelayedTextField
                fullWidth
                waitForInput={true}
                placeholder="Cari bank"
                name="name"
                filterValue={filter.name}
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                color="secondary"
              />
            </AccordionDetails>
          </Accordion>

          <Button
            variant="contained"
            color="secondary"
            startIcon={<Add />}
            onClick={() => Router.replace('/utilitas?tab=bank&create=true')}
            sx={{ height: 40 }}
            disabled={!access?.find((item) => item?.nameModule === 'utilitas_bank')?.acces?.createAcces}>
            <Typography style={{ fontFamily: 'Lato', fontSize: 14, fontWeight: 'bold', textTransform: 'capitalize' }}>
              Tambah Bank
            </Typography>
          </Button>
        </Stack>
      </Card>

      {/* Presentase */}
      <Card style={{ padding: 24 }}>
        <Stack direction="column" gap={2} height={140}>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography style={{ fontSize: 12 }}>Presentase Kesamaan Nama</Typography>

            <Edit style={{ color: '#00000061', fontSize: 24, cursor: 'pointer' }} />
          </Stack>

          <Stack direction="column" alignItems="center" justifyContent="center" height="100%">
            <Typography style={{ fontSize: 24, fontWeight: 700 }}>{`> 51%`}</Typography>
            <Typography style={{ fontSize: 12 }}>Kesamaan Nama</Typography>
            <Typography style={{ fontSize: 12 }}>EKTP dengan rekening Bank</Typography>
          </Stack>
        </Stack>
      </Card>

      {/* Excuse */}
      <Card style={{ padding: 24 }}>
        <Stack direction="column" gap={2}>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography style={{ fontSize: 12 }}>Pengecualian Kata</Typography>

            <Button variant="outlined" color="secondary" style={{ height: 32, fontSize: 12 }}>
              Edit
            </Button>
          </Stack>

          <Stack direction="row" gap={1} flexWrap="wrap">
            {['Sdr', 'Sdri', 'Nyonya', 'Hj', 'Bpk', 'ibu'].map((item, key) => (
              <Chip label={<Typography style={{ fontSize: 12 }}>{item}</Typography>} />
            ))}
          </Stack>
        </Stack>
      </Card>
    </Stack>
  );
};

export default SearchSection;
