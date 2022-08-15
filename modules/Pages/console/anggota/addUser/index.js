import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';
import { Box, Button, Dialog, DialogContent, TextField, Typography } from '@material-ui/core';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Grid, Slide, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const Add = () => {
  const [form, setForm] = useState({
    namaPengguna: '',
    namaLengkap: '',
    jabatan: '',
    email: '',
  });
  const [allFilled, setAllFilled] = useState(false);

  // dialog
  const [openDialog, setOpenDialog] = React.useState(false);
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const router = useRouter();
  const breadcrumbs = [
    { label: 'Anggota', link: '/console/anggota' },
    { label: 'Tambah Anggota', isActive: true },
  ];
  const inputs = [
    {
      placeholder: 'Nama Pengguna',
      example: 'contoh: Bayu_Permana',
      name: 'namaPengguna',
      item: 'input',
    },
    {
      placeholder: 'Nama Lengkap',
      example: 'contoh: Bayu Permana',
      name: 'namaLengkap',
      item: 'input',
    },
    {
      placeholder: 'Jabatan',
      example: 'Pilih jabatan yang sesuai',
      name: 'jabatan',
      item: 'select',
    },
    {
      placeholder: 'Email',
      example: 'contoh: bayu_permana@gmail.com',
      name: 'email',
      item: 'input',
    },
  ];

  const handleInput = (e) => {
    const target = e.target;
    //  const value = target.type === 'checkbox' ? target.checked : target.value;
    const value = target.value;
    const name = target.name;

    setForm((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  useEffect(() => {
    // check if all inputs are has been filled
    const checked = Object.values(form);
    if (checked.every((val) => val !== '')) {
      setAllFilled(true);
    } else {
      setAllFilled(false);
    }
  }, [form]);

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
                          value={form.jabatan}
                          label="Jabatan"
                          name={input.name}
                          onChange={handleInput}>
                          <MenuItem value="direktur">Direktur</MenuItem>
                          <MenuItem value="it">IT</MenuItem>
                          <MenuItem value="project manager">Project Manager</MenuItem>
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
                        name={input.name}
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
                style={allFilled ? { background: '#AB22AF', color: '#FFFFFF' } : null}
                disabled={!allFilled}
                onClick={() => setOpenDialog(true)}>
                Tambah
              </Button>
              {openDialog && (
                <Dialog
                  open={openDialog}
                  TransitionComponent={Transition}
                  keepMounted
                  onClose={() => setOpenDialog(false)}
                  aria-describedby="alert-dialog-slide-description">
                  <DialogContent>
                    <Box p={4}>
                      <center>
                        <Typography id="modal-modal-title" variant="h3" component="div">
                          Tambah Anggota
                        </Typography>
                      </center>
                      <Box mt={3} textAlign="center">
                        Kamu akan menambah Anggota untuk Hyppe Console
                      </Box>
                      <Stack
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        spacing={2}
                        style={{ marginTop: '15px' }}>
                        <Button
                          style={{
                            // background: 'rgb(170, 34, 175)',
                            color: 'rgba(0, 0, 0, 0.6)',
                            border: 'none',
                            padding: '5px 10px',
                            marginTop: '10px',
                            fontWeight: 'bold',
                          }}
                          onClick={() => setOpenDialog(false)}>
                          BATAL
                        </Button>
                        <Button
                          variant="outlined"
                          style={{
                            background: 'rgb(170, 34, 175)',
                            color: '#FFFFFF',
                            border: 'none',
                            padding: '5px 10px',
                            borderRadius: '5px',
                            marginTop: '10px',
                          }}>
                          KONFIRMASI
                        </Button>
                      </Stack>
                    </Box>
                  </DialogContent>
                </Dialog>
              )}
              {/* // this is only appear when openDialog true end */}
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

export default Add;
