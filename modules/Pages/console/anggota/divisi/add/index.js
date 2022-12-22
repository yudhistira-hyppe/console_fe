import React, { useEffect, useState } from 'react';
import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';
import { TextField, Typography } from '@material-ui/core';
import { Box, Button, Stack } from '@mui/material';
import { useCreateDivisiMutation } from 'api/console/divisi';
import { useRouter } from 'next/router';
import BackIconNav from '@material-ui/icons/ArrowBackIos';
import Breadcrumbs from '../../../help-center/bantuan-pengguna/BreadCrumb';
import Head from 'next/head';

const addDivisi = () => {
  const router = useRouter();
  const [data, setData] = useState({
    nameDivision: '',
    desc: '',
  });
  const [isBtnDisabled, setIsBtnDisabled] = useState(false);
  const access = sessionStorage.getItem('access') ? JSON.parse(sessionStorage.getItem('access')) : [];

  const breadcrumbs = [
    { label: 'Divisi', link: '/anggota?tab=divisi' },
    { label: 'Tambah Divisi', isActive: true },
  ];

  const [createDivisi, { isSuccess }] = useCreateDivisiMutation();

  const addDivisi = async () => {
    createDivisi(data);
  };

  useEffect(() => {
    if (isSuccess) {
      window.location.href = `/anggota?tab=divisi&created=${isSuccess}`;
    }
  }, [isSuccess]);

  useEffect(() => {
    if (!data.nameDivision) setIsBtnDisabled(true);
    else {
      setIsBtnDisabled(false);
    }
  }, [data.nameDivision]);

  return (
    <>
      <Head>
        <title key="title">Hyppe-Console :: Add Divisi</title>
      </Head>
      <Stack direction={'column'} spacing={2} mb={3}>
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        <Stack
          direction={'row'}
          mt={1}
          mb={3}
          onClick={() => router.push('/anggota?tab=pengguna')}
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
          id="outlined-basic"
          fullWidth
          label="Nama Divisi"
          variant="outlined"
          onChange={(e) =>
            setData((prev) => {
              return {
                ...prev,
                nameDivision: e.target.value,
              };
            })
          }
          disabled={!access.find((item) => item?.nameModule === 'member_divistion')?.acces?.createAcces}
        />
        <TextField
          style={{ marginTop: '20px' }}
          id="outlined-basic"
          fullWidth
          label="Deskripsi"
          variant="outlined"
          onChange={(e) =>
            setData((prev) => {
              return {
                ...prev,
                desc: e.target.value,
              };
            })
          }
          disabled={!access.find((item) => item?.nameModule === 'member_divistion')?.acces?.createAcces}
        />
        <Box sx={{ width: 100 }} mt={3}>
          <Button
            onClick={addDivisi}
            disabled={isBtnDisabled || !access.find((item) => item?.nameModule === 'member_divistion')?.acces?.createAcces}
            variant="contained"
            color="secondary">
            Tambah
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default addDivisi;
