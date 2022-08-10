import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';
import { Box, Button, TextField, Typography } from '@material-ui/core';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Grid, Stack } from '@mui/material';
import { useState } from 'react';
import { useRouter } from 'next/router';

const Add = () => {
  const [Jabatan, setJabatan] = useState('');
  const [form, setForm] = useState({
    nameUser: '',
    fullName: '',
    jabatan: '',
    email: '',
  });
  console.log('form:', form);
  const router = useRouter();
  const breadcrumbs = [
    { label: 'Anggota', link: '/console/anggota' },
    { label: 'Tambah Anggota', isActive: true },
  ];
  const inputs = [
    {
      placeholder: 'Nama Pengguna',
      example: 'contoh: Bayu_Permana',
      item: 'input',
    },
    {
      placeholder: 'Nama Lengkap',
      example: 'contoh: Bayu Permana',
      item: 'input',
    },
    {
      placeholder: 'Jabatan',
      example: 'Pilih jabatan yang sesuai',
      item: 'select',
    },
    {
      placeholder: 'Email',
      example: 'contoh: bayu_permana@gmail.com',
      item: 'input',
    },
  ];

  const handleChangeSelect = (event) => {
    setJabatan(event.target.value);
  };

  const handleInput = (e) => {
    console.log('e:', e);
    // setForm((prev) => {
    //   return {
    //     ...prev,
    //     jabatan: event.target.value,
    //   };
    // });
  };

  return (
    <>
      <Grid container style={{ marginTop: '10px' }}>
        <Grid item sx={12} md={12} sm={12}>
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
            <Box mt={2} display="flex" style={{ cursor: 'pointer' }} onClick={() => router.push('/console/anggota')}>
              <img src="/images/icons/arrow-left.svg" />
              <Typography variant="h4" component="div">
                Kembali
              </Typography>
            </Box>
            <Box>
              <Typography variant="h1">Tambah Anggota</Typography>
            </Box>
            <Box mt={2}>
              <PageContainer breadcrumbs={breadcrumbs} />
            </Box>
          </Stack>
        </Grid>

        <Grid item sx={12} md={12} sm={12}>
          <Stack direction="column" justifyContent="center" alignItems="center" spacing={2} style={{ marginTop: '10px' }}>
            {inputs.map((input) => {
              return (
                <>
                  {input.item === 'select' ? (
                    <Box sx={{ width: '100%' }}>
                      <FormControl fullWidth style={{ background: 'white' }} size="small">
                        <InputLabel id="demo-simple-select-label">Jabatan</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={Jabatan}
                          label="Jabatan"
                          onChange={handleChangeSelect}>
                          <MenuItem value={'direktur'}>Direktur</MenuItem>
                          <MenuItem value={'it'}>IT</MenuItem>
                          <MenuItem value={'project manager'}>Project Manager</MenuItem>
                        </Select>
                      </FormControl>
                      <div style={{ margin: '2px 0 0 10px', color: 'rgba(0, 0, 0, 0.3)' }}>{input.example}</div>
                    </Box>
                  ) : (
                    <Box sx={{ width: '100%' }}>
                      <TextField
                        fullWidth
                        autoComplete="off"
                        style={{ background: 'white' }}
                        size="small"
                        id="outlined-basic"
                        label={input.placeholder}
                        variant="outlined"
                        onChange={handleInput}
                      />
                      <div style={{ margin: '2px 0 0 10px', color: 'rgba(0, 0, 0, 0.3)' }}>{input.example}</div>
                    </Box>
                  )}
                </>
              );
            })}
          </Stack>

          <Stack direction="row" justifyContent="flex-end" alignItems="center">
            <Box mt={3}>
              <Button
                variant="outlined"
                style={{ background: 'rgba(0, 0, 0, 0.12)', color: 'rgba(0, 0, 0, 0.38),border:"none' }}>
                Tambah
              </Button>
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

export default Add;
