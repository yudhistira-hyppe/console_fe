import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { Button, MenuItem, Select, Stack, TextField } from '@mui/material';
import BackIconNav from '@material-ui/icons/ArrowBackIos';
import Breadcrumbs from '../../../help-center/bantuan-pengguna/BreadCrumb';
import { Typography } from '@material-ui/core';
import router from 'next/router';
import { useGetGroupQuery, useGetSingleGroupQuery } from 'api/console/group';
import { useGetDivisiQuery } from 'api/console/divisi';
import { useGetProfileByUserEmailQuery } from 'api/user/user';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';

const breadcrumbs = [
  { label: 'Anggota', link: '/anggota?tab=pengguna' },
  { label: 'Ubah Anggota', isActive: true },
];

const AddMember = () => {
  const [inputValue, setInputValue] = useState({
    username: '',
    fullname: '',
    position: '',
    division: '',
    email: '',
  });

  const { data: profileUser, isFetching } = useGetProfileByUserEmailQuery(router.query.id);
  const { data: dataDivisi } = useGetDivisiQuery({ skip: 0, limit: 100 });
  const { data: dataJabatan } = useGetSingleGroupQuery(
    (inputValue?.division && JSON.parse(inputValue?.division)?._id) || '',
  );

  const handleChange = (e) => {
    const { name, value } = e.target;

    setInputValue({ ...inputValue, [name]: value });
  };

  useEffect(() => {
    setInputValue({
      ...inputValue,
      username: profileUser?.data[0]?.username || '',
      fullname: profileUser?.data[0]?.fullName || '',
      position: '',
      division: '',
      email: profileUser?.data[0]?.email || '',
    });
  }, [isFetching]);

  console.log(inputValue);

  return (
    <>
      <Head>
        <title key="title">Hyppe-Console :: Edit Member</title>
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

      {isFetching ? (
        <PageLoader />
      ) : (
        <Stack direction="column" gap="14px">
          <Stack direction="row" gap="25px" alignItems="center">
            <TextField
              name="username"
              placeholder="Nama Pengguna"
              color="secondary"
              style={{ width: '100%', maxWidth: 400 }}
              onChange={handleChange}
              value={inputValue.username}
              autoComplete="off"
            />
            <Typography style={{ color: '#0000004D' }}>contoh: Bayu_Permana</Typography>
          </Stack>
          <Stack direction="row" gap="25px" alignItems="center">
            <TextField
              name="fullname"
              placeholder="Nama Lengkap"
              color="secondary"
              style={{ width: '100%', maxWidth: 400 }}
              onChange={handleChange}
              value={inputValue.fullname}
              autoComplete="off"
            />
            <Typography style={{ color: '#0000004D' }}>contoh: Bayu Permana</Typography>
          </Stack>
          <Stack direction="row" gap="25px" alignItems="center">
            <TextField
              name="email"
              placeholder="Email"
              type="email"
              color="secondary"
              style={{ width: '100%', maxWidth: 400 }}
              onChange={handleChange}
              value={inputValue.email}
              autoComplete="off"
            />
            <Typography style={{ color: '#0000004D' }}>contoh: Bayu.Permana@gmail.com</Typography>
          </Stack>
          <Stack direction="row" gap="25px" alignItems="center">
            <Select
              value={inputValue.division}
              color="secondary"
              style={{ width: '100%', maxWidth: 400 }}
              name="division"
              onChange={handleChange}
              displayEmpty>
              <MenuItem value="" disabled>
                Divisi
              </MenuItem>
              {dataDivisi?.data?.map((item, key) => (
                <MenuItem key={key} value={JSON.stringify(item)}>
                  {item?.nameDivision || '-'}
                </MenuItem>
              ))}
            </Select>
            <Typography style={{ color: '#0000004D' }}>Pilih divisi</Typography>
          </Stack>
          <Stack direction="row" gap="25px" alignItems="center">
            <Select
              value={inputValue.position}
              color="secondary"
              style={{ width: '100%', maxWidth: 400 }}
              name="position"
              onChange={handleChange}
              displayEmpty>
              <MenuItem value="" disabled>
                Jabatan
              </MenuItem>
              {dataJabatan?.data?.map((item, key) => (
                <MenuItem key={key} value={JSON.stringify(item)}>
                  {item?.nameGroup || '-'}
                </MenuItem>
              ))}
            </Select>
            <Typography style={{ color: '#0000004D' }}>Pilih jabatan yang sesuai</Typography>
          </Stack>
          <Stack mt={2}>
            <Button variant="contained" color="secondary" style={{ maxWidth: 120, height: 40 }}>
              Ubah
            </Button>
          </Stack>
        </Stack>
      )}
    </>
  );
};

export default AddMember;
