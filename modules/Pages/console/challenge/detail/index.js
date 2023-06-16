import React from 'react';
import Breadcrumbs from 'modules/Pages/console/help-center/bantuan-pengguna/BreadCrumb';
import { Button, Stack } from '@mui/material';
import { ChevronLeft } from '@material-ui/icons';
import { Typography } from '@material-ui/core';
import Router from 'next/router';

const DetailChallenge = ({ detailId }) => {
  const breadcrumbs = [
    { label: 'Challenge', link: '/challenge' },
    { label: 'Detail Challenge', isActive: true },
  ];

  return (
    <Stack direction="column" gap={3}>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <Stack direction="row" justifyContent="space-between" alignItems="center" mt="-6px">
        <Stack
          direction="row"
          alignItems="center"
          gap={1}
          onClick={() => Router.replace('/challenge')}
          sx={{
            width: 'fit-content',
            '&:hover': {
              cursor: 'pointer',
            },
          }}>
          <ChevronLeft style={{ fontSize: 28 }} />
          <Typography style={{ fontWeight: 'bold', fontSize: 18 }}>Kembali</Typography>
        </Stack>
        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            color="secondary"
            style={{ borderRadius: 6, padding: '10px 20px' }}
            onClick={() => Router.push(`/challenge/edit/${detailId}`)}>
            <Typography style={{ textTransform: 'capitalize', fontWeight: 'bold', fontSize: 14 }}>Edit Challenge</Typography>
          </Button>
          <Button variant="contained" color="error" style={{ borderRadius: 6, padding: '10px 20px' }}>
            <Typography style={{ textTransform: 'capitalize', fontWeight: 'bold', fontSize: 14 }}>
              Hapus Challenge
            </Typography>
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default DetailChallenge;
