import React, { useEffect, useState } from 'react';
import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';
import { TextField, Typography } from '@material-ui/core';
import { Box, Button, Stack } from '@mui/material';
import { useCreateDivisiMutation } from 'api/console/divisi';
import { useRouter } from 'next/router';

const addDivisi = () => {
  const router = useRouter();
  const [data, setData] = useState({
    nameDivision: '',
    desc: '',
  });
  console.log('data:', data);

  const breadcrumbs = [
    { label: 'Anggota', link: '/console/anggota' },
    { label: 'Bantuan Pengguna', isActive: true },
  ];

  const [createDivisi, { isSuccess }] = useCreateDivisiMutation();

  const addDivisi = async () => {
    createDivisi(data);
  };

  useEffect(() => {
    if (isSuccess) {
      window.location.href = '/console/anggota?tab=divisi';
    }
  }, [isSuccess]);

  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
        <Box display="flex" style={{ cursor: 'pointer' }} onClick={() => router.push('/console/anggota?tab=divisi')}>
          <img src="/images/icons/arrow-left.svg" />
          <Typography variant="h4" component="div">
            Kembali
          </Typography>
        </Box>
        <Box>
          <PageContainer breadcrumbs={breadcrumbs} />
        </Box>
      </Stack>

      <Typography variant="h3" component="div">
        Edit Divisi
      </Typography>
      <Box sx={{ width: 500 }} mt={2}>
        <TextField
          style={{ marginTop: '10px' }}
          id="outlined-basic"
          fullWidth
          label="Name Division"
          size="small"
          variant="outlined"
          onChange={(e) =>
            setData((prev) => {
              return {
                ...prev,
                nameDivision: e.target.value,
              };
            })
          }
        />
        <TextField
          style={{ marginTop: '10px' }}
          id="outlined-basic"
          fullWidth
          label="Description"
          size="small"
          variant="outlined"
          onChange={(e) =>
            setData((prev) => {
              return {
                ...prev,
                desc: e.target.value,
              };
            })
          }
        />
        <Box sx={{ width: 100 }} mt={3}>
          <Button
            onClick={addDivisi}
            variant="outlined"
            style={{
              background: '#AB22AF',
              padding: '3px 7px',
              color: '#FFFFFF',
              borderRadius: '2px',
              border: 'none',
              letterSpacing: '2px',
            }}>
            Tambah
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default addDivisi;
