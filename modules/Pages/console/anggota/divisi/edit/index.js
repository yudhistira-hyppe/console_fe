import React, { useEffect, useState } from 'react';
import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';
import { TextField, Typography } from '@material-ui/core';
import { Box, Button, Stack } from '@mui/material';
import { useGetSingleDivisiQuery, useUpdateDivisiMutation } from 'api/console/divisi';
import { useRouter } from 'next/router';
import BackIconNav from '@material-ui/icons/ArrowBackIos';
import Breadcrumbs from '../../../help-center/bantuan-pengguna/BreadCrumb';
import Head from 'next/head';

const addDivisi = () => {
  const router = useRouter();
  const access = sessionStorage.getItem('access') ? JSON.parse(sessionStorage.getItem('access')) : [];

  const breadcrumbs = [
    { label: 'Divisi', link: '/anggota?tab=divisi' },
    { label: 'Edit Divisi', isActive: true },
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
      <Head>
        <title key="title">Hyppe-Console :: Edit Divisi</title>
      </Head>
      <Stack direction={'column'} spacing={2} mb={3}>
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        <Stack
          direction={'row'}
          mt={1}
          mb={3}
          onClick={() => router.push('/anggota?tab=divisi')}
          gap="5px"
          style={{ width: 'fit-content', cursor: 'pointer' }}>
          <Stack direction={'column'} justifyContent={'center'}>
            <BackIconNav fontSize="small" style={{ color: 'black', fontSize: '12px', fontWeight: 'bold' }} />
          </Stack>
          <Typography variant="h1" style={{ fontSize: 20, color: 'black' }}>
            Kembali
          </Typography>
        </Stack>
      </Stack>

      <Box sx={{ width: 500 }} mt={1}>
        <TextField
          InputLabelProps={{
            shrink: true,
          }}
          id="outlined-basic"
          fullWidth
          label="Nama Divisi"
          variant="outlined"
          value={nameDivisi}
          onChange={(e) => setNameDivisi(e.target.value)}
          disabled={!access.find((item) => item?.nameModule === 'member_divistion')?.acces?.updateAcces}
        />
        <TextField
          style={{ marginTop: '20px' }}
          InputLabelProps={{
            shrink: true,
          }}
          id="outlined-basic"
          fullWidth
          label="Deskripsi"
          variant="outlined"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          disabled={!access.find((item) => item?.nameModule === 'member_divistion')?.acces?.updateAcces}
        />
        <Box sx={{ width: 100 }} mt={3}>
          <Button
            onClick={handleUpdateDivisi}
            disabled={!nameDivisi || !access.find((item) => item?.nameModule === 'member_divistion')?.acces?.updateAcces}
            variant="contained"
            color="secondary">
            Ubah
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default addDivisi;
