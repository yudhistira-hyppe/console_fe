import React, { useEffect, useState } from 'react';
import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';
import { TextField, Typography } from '@material-ui/core';
import { Box, Button, Stack } from '@mui/material';
import { useGetSingleDivisiQuery, useUpdateDivisiMutation } from 'api/console/divisi';
import { useRouter } from 'next/router';

const addDivisi = () => {
  const router = useRouter();

  const breadcrumbs = [
    { label: 'Anggota', link: '/console/anggota' },
    { label: 'Bantuan Pengguna', isActive: true },
  ];

  const { data: detailDivisi } = useGetSingleDivisiQuery(router.query.id);
  const [nameDivisi, setNameDivisi] = useState(detailDivisi?.nameDivision);
  const [desc, setDesc] = useState(detailDivisi?.desc);
  const [updateDivisi, { isSuccess }] = useUpdateDivisiMutation();

  useEffect(() => {
    setNameDivisi(detailDivisi?.nameDivision);
    setDesc(detailDivisi?.desc);
  }, detailDivisi);

  useEffect(() => {
    if (isSuccess) {
      window.location.href = `/anggota?tab=divisi&edited=${isSuccess}`;
    }
  }, [isSuccess]);

  const handleUpdateDivisi = () => {
    const payload = {
      _id: router.query.id,
      nameDivision: nameDivisi,
      desc: desc,
    };
    updateDivisi(payload);
  };
  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
        <Box display="flex" style={{ cursor: 'pointer' }} onClick={() => router.push('/anggota?tab=divisi')}>
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
          InputLabelProps={{
            shrink: true,
          }}
          style={{ marginTop: '10px' }}
          id="outlined-basic"
          fullWidth
          label="Name Division"
          size="small"
          variant="outlined"
          value={nameDivisi}
          onChange={(e) => setNameDivisi(e.target.value)}
        />
        <TextField
          style={{ marginTop: '10px' }}
          InputLabelProps={{
            shrink: true,
          }}
          id="outlined-basic"
          fullWidth
          label="Description"
          size="small"
          variant="outlined"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <Box sx={{ width: 100 }} mt={3}>
          <Button
            variant="outlined"
            style={{
              background: '#AB22AF',
              padding: '3px 7px',
              color: '#FFFFFF',
              borderRadius: '2px',
              border: 'none',
              letterSpacing: '2px',
            }}
            onClick={handleUpdateDivisi}>
            Tambah
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default addDivisi;
