import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { Button, MenuItem, Select, Stack, TextField } from '@mui/material';
import BackIconNav from '@material-ui/icons/ArrowBackIos';
import Breadcrumbs from '../../../help-center/bantuan-pengguna/BreadCrumb';
import { Typography } from '@material-ui/core';
import router from 'next/router';
import { useGetGroupQuery } from 'api/console/group';
import { useGetProfileByUserEmailQuery } from 'api/user/user';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';
import { useUpdateGroupUserMutation } from 'api/console/getUserHyppe';

const breadcrumbs = [
  { label: 'Anggota', link: '/anggota?tab=pengguna' },
  { label: 'Ubah Anggota', isActive: true },
];

const AddMember = () => {
  const [inputValue, setInputValue] = useState({
    username: '',
    fullname: '',
    position: '',
    email: '',
  });
  const access = localStorage.getItem('access') ? JSON.parse(localStorage.getItem('access')) : [];

  const { data: profileUser, isFetching } = useGetProfileByUserEmailQuery(router.query.id);
  const { data: dataJabatan } = useGetGroupQuery({ skip: 0, limit: 10, search: '' });
  const [updateUser] = useUpdateGroupUserMutation();

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
      email: profileUser?.data[0]?.email || '',
    });
  }, [isFetching]);

  const handleUpdate = () => {
    const data = {
      email: inputValue?.email,
      groupId: JSON.parse(inputValue?.position)?._id,
    };

    updateUser(data).then(() => router.replace('/anggota?tab=pengguna'));
  };

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
          <TextField
            name="username"
            placeholder="Nama Pengguna"
            color="secondary"
            style={{ width: '100%', maxWidth: 400 }}
            onChange={handleChange}
            value={inputValue.username}
            disabled
          />
          <TextField
            name="fullname"
            placeholder="Nama Lengkap"
            color="secondary"
            style={{ width: '100%', maxWidth: 400 }}
            onChange={handleChange}
            value={inputValue.fullname}
            disabled
          />
          <TextField
            name="email"
            placeholder="Email"
            type="email"
            color="secondary"
            style={{ width: '100%', maxWidth: 400 }}
            onChange={handleChange}
            value={inputValue.email}
            disabled
          />
          <Stack direction="row" gap="25px" alignItems="center">
            <Select
              value={inputValue.position}
              color="secondary"
              style={{ width: '100%', maxWidth: 400 }}
              name="position"
              onChange={handleChange}
              displayEmpty
              disabled={!access.find((item) => item?.nameModule === 'member_users')?.acces?.updateAcces}>
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
            <Button
              variant="contained"
              color="secondary"
              style={{ maxWidth: 120, height: 40 }}
              onClick={handleUpdate}
              disabled={!access.find((item) => item?.nameModule === 'member_users')?.acces?.updateAcces}>
              Ubah
            </Button>
          </Stack>
        </Stack>
      )}
    </>
  );
};

export default AddMember;
